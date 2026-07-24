import { useEffect, useRef, useState } from "react";
import { Link, useNavigate,useSearchParams,} from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";

import Button from "../common/Button";
import api from "../../services/api";

function OtpVerificationForm() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const email = searchParams.get("email");

  const maskedEmail = email
    ? email.replace(/(.{2}).+(@.+)/, "$1******$2")
    : "";

  const [otp, setOtp] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const [timer, setTimer] = useState(30);

  const [loading, setLoading] = useState(false);

  const inputRefs = useRef([]);

  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const updatedOtp = [...otp];

    updatedOtp[index] = value;

    setOtp(updatedOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (
      e.key === "Backspace" &&
      otp[index] === "" &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const paste = e.clipboardData
      .getData("text")
      .trim()
      .slice(0, 6);

    if (!/^\d+$/.test(paste)) return;

    const arr = paste.split("");

    while (arr.length < 6) {
      arr.push("");
    }

    setOtp(arr);

    inputRefs.current[
      Math.min(paste.length, 5)
    ]?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalOtp = otp.join("");

    if (finalOtp.length !== 6) {
      return toast.error("Please enter the complete OTP.");
    }
    const loadingToast = toast.loading(
    "Verifying OTP..."
  );

    try {
      setLoading(true);

      const res = await api.post(
        "/auth/verify-otp",
        {
          email,
          otp: finalOtp,
        }
      );

          toast.success(res.data.message, {
      id: loadingToast,
    });


      navigate("/login");

    } catch (err) {
      console.error(err);

     toast.error(
      err.response?.data?.message ||
        "OTP verification failed.",
      {
        id: loadingToast,
      }
    );

    } finally {
      setLoading(false);
    }
  };
   const resendOTP = async () => {
  const loadingToast = toast.loading(
    "Sending OTP..."
  );

  try {

    await api.post("/auth/resend-otp", {
      email,
    });

    toast.success(
      "OTP sent successfully.",
      {
        id: loadingToast,
      }
    );

    setOtp(["", "", "", "", "", ""]);

    setTimer(30);

    inputRefs.current[0]?.focus();

  } catch (err) {

    console.error(err);

    toast.error(
      err.response?.data?.message ||
        "Unable to resend OTP.",
      {
        id: loadingToast,
      }
    );

  }
};

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="text-center">

        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-blue-100">

          <ShieldCheck
            size={48}
            className="text-blue-600"
          />

        </div>

        <h2 className="text-3xl font-bold text-slate-800">
          Verify Your Email
        </h2>

        <p className="mt-3 text-slate-500">
          Enter the 6-digit verification code sent to
        </p>

        <p className="mt-2 font-semibold text-blue-600">
          {maskedEmail}
        </p>

      </div>

      {/* OTP Form */}

      <form
        onSubmit={handleSubmit}
        className="space-y-8"
      >

        {/* OTP Inputs */}

        <div className="flex justify-center gap-3">

          {otp.map((digit, index) => (

            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) =>
                handleChange(e.target.value, index)
              }
              onKeyDown={(e) =>
                handleKeyDown(e, index)
              }
              onPaste={handlePaste}
              className="
                h-16
                w-16
                rounded-2xl
                border-2
                border-slate-300
                bg-slate-50
                text-center
                text-2xl
                font-bold
                transition-all
                duration-300
                outline-none
                focus:border-blue-600
                focus:bg-white
                focus:ring-4
                focus:ring-blue-100
              "
            />

          ))}

        </div>

        {/* Verify Button */}

        <Button
  type="submit"
  disabled={loading || otp.join("").length !== 6}
  className="w-full rounded-2xl py-4 text-lg"
>
         {loading ? (
  <div className="flex items-center justify-center gap-2">
    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
    Verifying...
  </div>
) : (
  "Verify OTP"
)}
        </Button>

        {/* Timer */}

        <div className="rounded-2xl bg-slate-50 p-4 text-center">

          {timer > 0 ? (

            <p className="text-slate-500">
              Resend OTP in

              <span className="ml-2 font-bold text-blue-600">
                {timer}s
              </span>

            </p>

          ) : (

            <button
              type="button"
              onClick={resendOTP}
              className="font-semibold text-blue-600 hover:underline"
            >
              Resend OTP
            </button>

          )}

        </div>

        {/* Register Again */}

        <p className="text-center text-sm text-slate-500">

          Wrong email?

          <Link
            to="/register"
            className="ml-2 font-semibold text-blue-600 hover:underline"
          >
            Register Again
          </Link>

        </p>

      </form>

    </div>
  );
}

export default OtpVerificationForm;
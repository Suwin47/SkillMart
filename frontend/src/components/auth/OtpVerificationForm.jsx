import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import Button from "../common/Button";

function OtpVerificationForm() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);

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
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (
      e.key === "Backspace" &&
      otp[index] === "" &&
      index > 0
    ) {
      inputRefs.current[index - 1].focus();
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

    while (arr.length < 6) arr.push("");

    setOtp(arr);

    inputRefs.current[
      Math.min(paste.length, 5)
    ].focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalOtp = otp.join("");

    console.log(finalOtp);

    // API Integration Next
  };

  const resendOTP = () => {
    setTimer(30);

    console.log("Resend OTP");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8"
    >
      <div className="flex justify-center gap-3">

        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            value={digit}
            onPaste={handlePaste}
            onChange={(e) =>
              handleChange(e.target.value, index)
            }
            onKeyDown={(e) =>
              handleKeyDown(e, index)
            }
            maxLength={1}
            className="
              w-14
              h-14
              rounded-xl
              border
              border-slate-300
              text-center
              text-xl
              font-bold
              outline-none
              focus:border-blue-600
              focus:ring-2
              focus:ring-blue-200
            "
          />
        ))}

      </div>

      <Button type="submit">
        Verify OTP
      </Button>

      <div className="text-center">

        {timer > 0 ? (
          <p className="text-gray-500 text-sm">
            Resend OTP in {timer}s
          </p>
        ) : (
          <button
            type="button"
            onClick={resendOTP}
            className="text-blue-600 hover:underline"
          >
            Resend OTP
          </button>
        )}

      </div>

      <p className="text-center text-sm text-gray-600">

        Wrong email?{" "}

        <Link
          to="/register"
          className="text-blue-600 font-semibold hover:underline"
        >
          Register Again
        </Link>

      </p>
    </form>
  );
}

export default OtpVerificationForm;
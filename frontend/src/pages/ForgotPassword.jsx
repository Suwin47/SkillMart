import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Mail, ArrowLeft } from "lucide-react";

import api from "../services/api";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      return toast.error("Please enter your email.");
    }

    try {
      setLoading(true);

      const { data } = await api.post(
        "/auth/forgot-password",
        { email }
      );

      toast.success(data.message);

      navigate("/verify-reset-otp", {
        state: {
          email,
        },
      });

    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.message ||
          "Unable to send OTP."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-6">

      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">

        <div className="mb-8 text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">

            <Mail
              size={30}
              className="text-blue-600"
            />

          </div>

          <h1 className="mt-5 text-3xl font-bold">
            Forgot Password
          </h1>

          <p className="mt-2 text-slate-500">
            Enter your registered email.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <div>

            <label className="mb-2 block font-medium">
              Email Address
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="Enter email"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-xl py-3 font-semibold text-white transition ${
              loading
                ? "cursor-not-allowed bg-slate-400"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading
              ? "Sending OTP..."
              : "Send OTP"}
          </button>

        </form>

        <Link
          to="/login"
          className="mt-6 flex items-center justify-center gap-2 text-blue-600 hover:underline"
        >
          <ArrowLeft size={18} />
          Back to Login
        </Link>

      </div>

    </div>
  );
}

export default ForgotPassword;
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock } from "lucide-react";
import toast from "react-hot-toast";

import api from "../services/api";

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;
  const otp = location.state?.otp;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.password ||
      !formData.confirmPassword
    ) {
      return toast.error("Please fill all fields");
    }

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      return toast.error("Passwords do not match");
    }

    if (formData.password.length < 6) {
      return toast.error(
        "Password must be at least 6 characters."
      );
    }

    try {
      setLoading(true);

      const { data } = await api.post(
        "/auth/reset-password",
        {
          email,
          otp,
          password: formData.password,
        }
      );

      toast.success(data.message);

      navigate("/login");

    } catch (err) {

      console.error(err);

      toast.error(
        err.response?.data?.message ||
          "Unable to reset password."
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-6">

      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">

        <div className="text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">

            <Lock
              className="text-blue-600"
              size={30}
            />

          </div>

          <h1 className="mt-5 text-3xl font-bold">
            Reset Password
          </h1>

          <p className="mt-2 text-slate-500">
            Create a new password.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6"
        >

          <div>

            <label className="mb-2 block font-medium">
              New Password
            </label>

            <div className="relative">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-xl border px-4 py-3 pr-12 outline-none focus:border-blue-500"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>

            </div>

          </div>

          <div>

            <label className="mb-2 block font-medium">
              Confirm Password
            </label>

            <div className="relative">

              <input
                type={
                  showConfirm
                    ? "text"
                    : "password"
                }
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full rounded-xl border px-4 py-3 pr-12 outline-none focus:border-blue-500"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirm(!showConfirm)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                {showConfirm ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>

            </div>

          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-xl py-3 font-semibold text-white ${
              loading
                ? "cursor-not-allowed bg-slate-400"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading
              ? "Updating..."
              : "Reset Password"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default ResetPassword;
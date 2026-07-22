import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import AuthLayout from "./AuthLayout";

function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <AuthLayout
      title="Create Your Account 🚀"
      subtitle="Join SkillMart and start buying or selling digital products."
    >
      <form className="space-y-5">

        {/* Full Name */}

        <div>
          <label className="mb-2 block font-medium text-slate-700">
            Full Name
          </label>

          <input
            type="text"
            placeholder="Enter your full name"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        {/* Email */}

        <div>
          <label className="mb-2 block font-medium text-slate-700">
            Email Address
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        {/* Password */}

        <div>
          <label className="mb-2 block font-medium text-slate-700">
            Password
          </label>

          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>

          </div>
        </div>

        {/* Confirm Password */}

        <div>
          <label className="mb-2 block font-medium text-slate-700">
            Confirm Password
          </label>

          <div className="relative">

            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm your password"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            />

            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
            >
              {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>

          </div>
        </div>

        {/* Register As */}

        <div>
          <label className="mb-3 block font-medium text-slate-700">
            Register As
          </label>

          <div className="flex gap-8">

            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="role" defaultChecked />
              Buyer
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="role" />
              Seller
            </label>

          </div>

        </div>

        {/* Register Button */}

        <button
          type="submit"
          className="w-full rounded-xl bg-blue-600 py-3 text-lg font-semibold text-white transition hover:bg-blue-700"
        >
          Create Account
        </button>

        {/* Divider */}

        <div className="relative text-center">

          <hr />

          <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-slate-500">
            OR
          </span>

        </div>

        {/* Google */}

        <button
          type="button"
          className="w-full rounded-xl border border-slate-300 py-3 font-medium transition hover:bg-slate-50"
        >
          Continue with Google
        </button>

        {/* Login Link */}

        <p className="text-center text-slate-600">

          Already have an account?{" "}

          <Link
            to="/login"
            className="font-semibold text-blue-600"
          >
            Login
          </Link>

        </p>

      </form>
    </AuthLayout>
  );
}

export default RegisterForm;
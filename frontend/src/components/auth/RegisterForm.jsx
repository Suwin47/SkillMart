import { useState, useContext } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { signInWithPopup } from "firebase/auth";

import AuthLayout from "./AuthLayout";
import api from "../../services/api";
import { auth, googleProvider } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";

function RegisterForm() {
  const navigate = useNavigate();
const { login } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "buyer",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(
      auth,
      googleProvider
    );

    const idToken = await result.user.getIdToken();

    const res = await api.post("/auth/google-login", {
      idToken,
    });

    login(res.data.user);

    toast.success(res.data.message);

    switch (res.data.user.role) {
      case "admin":
        navigate("/admin");
        break;

      case "seller":
        navigate("/seller");
        break;

      default:
        navigate("/");
    }

  } catch (err) {
    console.error(err);

    toast.error(
      err.response?.data?.message ||
      err.message ||
      "Google Login Failed"
    );
  }
};
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      return toast.error("Please fill all fields.");
    }

    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match.");
    }

    if (formData.password.length < 6) {
      return toast.error("Password should be at least 6 characters.");
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/register", {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      toast.success(res.data.message);

      navigate(
        `/verify-otp?email=${encodeURIComponent(
          formData.email
        )}`
      );

    } catch (err) {
      console.error(err);

      toast.error(
  err.response?.data?.message ||
  "Registration failed."
);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create Your Account 🚀"
      subtitle="Join SkillMart and start buying or selling digital products."
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
              {/* Full Name */}
        <div>
          <label className="mb-2 block font-medium text-slate-700">
            Full Name
          </label>

          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
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
            name="email"
            value={formData.email}
            onChange={handleChange}
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
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
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
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            />

            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
            >
              {showConfirm ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>
        </div>

        {/* Register As */}
        <div>
          <label className="mb-3 block font-medium text-slate-700">
            Register As
          </label>

          <div className="flex gap-8">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                name="role"
                value="buyer"
                checked={formData.role === "buyer"}
                onChange={handleChange}
              />
              Buyer
            </label>

            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                name="role"
                value="seller"
                checked={formData.role === "seller"}
                onChange={handleChange}
              />
              Seller
            </label>
          </div>
        </div>

        {/* Register Button */}
        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center rounded-xl bg-blue-600 py-3 text-lg font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Creating Account...
            </>
          ) : (
            "Create Account"
          )}
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
  onClick={handleGoogleLogin}
  className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-300 py-3 font-medium transition hover:bg-slate-50"
>
  <img
    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
    alt="Google"
    className="h-5 w-5"
  />

  Continue with Google
</button>

        {/* Login */}
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
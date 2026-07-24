import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-hot-toast";
import { signInWithPopup,} from "firebase/auth";

import { auth, googleProvider,} from "../../firebase";
import AuthLayout from "./AuthLayout";
import api from "../../services/api";
import { AuthContext } from "../../context/AuthContext";

function LoginForm() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(
      auth,
      googleProvider
    );

    // Get Firebase ID Token
    const idToken = await result.user.getIdToken();

    // Send token to backend
    const res = await api.post("/auth/google-login", {
      idToken,
    });

    // Save user in AuthContext
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.email || !formData.password) {
    return toast.error("Please fill all fields");
  }

  try {
    setLoading(true);

    const res = await api.post("/auth/login", formData);

    login(res.data.user);

    toast.success(`Welcome back, ${res.data.user.fullName}! 👋`);

    // Redirect based on role
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
      "Login failed"
    );

  } finally {
    setLoading(false);
  }
};

  return (
    <AuthLayout
      title="Welcome Back 👋"
      subtitle="Login to continue your SkillMart journey."
    >
      <form
        className="space-y-6"
        onSubmit={handleSubmit}
      >
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
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
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

        {/* Remember & Forgot */}

        <div className="flex items-center justify-between text-sm">

          <label className="flex items-center gap-2 text-slate-600">

            <input
              type="checkbox"
              className="rounded border-slate-300"
            />

            Remember me

          </label>

          <Link
            to="/forgot-password"
            className="font-medium text-blue-600 transition hover:text-blue-700 hover:underline"
          >
            Forgot Password?
          </Link>

        </div>

        {/* Login */}

        <button
          type="submit"
          disabled={loading}
          className={`w-full rounded-xl py-3 text-lg font-semibold text-white transition ${
            loading
              ? "cursor-not-allowed bg-blue-400"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading
            ? "Logging in..."
            : "Login"}
        </button>

        {/* Divider */}

        <div className="relative text-center">

          <hr />

          <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-slate-500">

            OR

          </span>

        </div>

        {/* Google Login */}

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

        {/* Register */}

        <p className="text-center text-slate-600">

          Don't have an account?{" "}

          <Link
            to="/register"
            className="font-semibold text-blue-600 hover:underline"
          >
            Register
          </Link>

        </p>

      </form>
    </AuthLayout>
  );
}

export default LoginForm;
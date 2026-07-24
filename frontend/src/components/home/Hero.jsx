import { useContext, useState } from "react";
import { Search, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";

function Hero() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

const [search, setSearch] = useState("");

const handleSearch = () => {
  const value = search.trim();

  navigate(
    `/products?search=${encodeURIComponent(value)}`
  );
};

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 18
      ? "Good Afternoon"
      : "Good Evening";

  const message =
    hour < 12
      ? "🌅 Start your day by discovering amazing digital products."
      : hour < 18
      ? "🚀 Discover new templates, source code and AI tools."
      : "🌙 Relax and explore the latest digital products.";

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sky-50 via-white to-slate-100">

      {/* Background Blur */}

      <div className="absolute -top-40 -left-32 h-96 w-96 rounded-full bg-cyan-300/30 blur-3xl"></div>

      <div className="absolute top-20 -right-32 h-96 w-96 rounded-full bg-blue-300/20 blur-3xl"></div>

      <div className="mx-auto max-w-7xl px-6 py-24 lg:py-32">

        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* Left */}

          <div>

            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-sm font-medium text-cyan-700">

              <Sparkles size={16} />

              India's Digital Marketplace

            </div>

            {/* Personalized Greeting */}

            {user && (
              <div className="mt-8">

                <p className="text-lg font-semibold text-blue-600">
                  {greeting}, {user.fullName} 👋
                </p>

                <p className="mt-2 text-slate-500">
                  {message}
                </p>

              </div>
            )}

            <h1 className="mt-8 text-5xl font-extrabold leading-tight text-slate-900 lg:text-7xl">

              Buy & Sell

              <span className="block bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Digital Products
              </span>

            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-slate-600">

              Discover premium templates, UI kits, source code,
              React projects, AI tools, ebooks and more.

            </p>

            {/* Buttons */}

            <div className="mt-10 flex flex-wrap gap-4">

              <Link
                to="/products"
                className="rounded-xl bg-blue-600 px-7 py-4 font-semibold text-white transition hover:bg-blue-700"
              >
                Explore Products
              </Link>

              {!user ? (

                <Link
                  to="/register"
                  className="rounded-xl border border-slate-300 bg-white px-7 py-4 font-semibold text-slate-800 transition hover:bg-slate-100"
                >
                  Become Seller
                </Link>

              ) : user.role === "seller" ? (

                <Link
                  to="/seller"
                  className="rounded-xl border border-slate-300 bg-white px-7 py-4 font-semibold text-slate-800 transition hover:bg-slate-100"
                >
                  Seller Dashboard
                </Link>

              ) : user.role === "admin" ? (

                <Link
                  to="/admin"
                  className="rounded-xl border border-slate-300 bg-white px-7 py-4 font-semibold text-slate-800 transition hover:bg-slate-100"
                >
                  Admin Panel
                </Link>

              ) : (

                <Link
                  to="/seller-request"
                  className="rounded-xl border border-slate-300 bg-white px-7 py-4 font-semibold text-slate-800 transition hover:bg-slate-100"
                >
                  Become Seller
                </Link>

              )}

            </div>

          </div>

          {/* Right */}

          <div className="relative flex justify-center">

            <div className="relative w-full max-w-xl rounded-3xl bg-white p-6 shadow-2xl">

              <img
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900"
                alt="hero"
                className="h-[420px] w-full rounded-2xl object-cover"
              />

              <div className="mt-6 flex items-center justify-between">

                <div>

                  <h3 className="text-2xl font-bold text-slate-900">
                    React Admin Dashboard
                  </h3>

                  <p className="mt-1 text-slate-500">
                    by SkillMart
                  </p>

                </div>

                <div className="rounded-xl bg-blue-600 px-5 py-3 text-xl font-bold text-white">
                  ₹499
                </div>

              </div>

            </div>

            {/* Downloads */}

            <div className="absolute -left-8 top-12 rounded-2xl bg-white px-6 py-5 shadow-xl">

              <p className="text-sm text-slate-500">
                Downloads
              </p>

              <h2 className="mt-1 text-3xl font-bold text-slate-900">
                12.4K
              </h2>

            </div>

            {/* Rating */}

            <div className="absolute -right-8 top-24 rounded-2xl bg-white px-6 py-5 shadow-xl">

              <p className="text-sm text-slate-500">
                Rating
              </p>

              <div className="mt-2 flex items-center gap-2">

                <span className="text-2xl">⭐</span>

                <span className="text-3xl font-bold text-slate-900">
                  4.9
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;
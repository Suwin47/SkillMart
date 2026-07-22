import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import {
  FiSearch,
  FiShoppingCart,
  FiBell,
  FiUser,
  FiLogOut,
} from "react-icons/fi";

import { AuthContext } from "../../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  console.log("Logged in User:", user);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center gap-8 px-6">

        {/* Logo */}
        <Link
          to="/"
          className="flex shrink-0 items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-lg font-bold text-white">
            S
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              SkillMart
            </h1>

            <p className="text-xs text-slate-500">
              Digital Marketplace
            </p>
          </div>
        </Link>

        {/* Search */}
        <div className="relative hidden flex-1 md:block">
          <FiSearch
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search templates, UI Kits..."
            className="h-11 w-full rounded-xl border border-slate-300 bg-slate-50 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
          />
        </div>

        {/* Navigation */}
        <nav className="hidden items-center gap-6 lg:flex">

          <Link
            to="/products"
            className="font-medium text-slate-700 hover:text-blue-600"
          >
            Explore
          </Link>

          <Link
            to="/categories"
            className="font-medium text-slate-700 hover:text-blue-600"
          >
            Categories
          </Link>

          {/* Role Based Button */}

          {user && (
            <>
              {user.role === "admin" ? (
                <Link
                  to="/admin"
                  className="rounded-xl bg-red-600 px-5 py-2.5 font-medium text-white transition hover:bg-red-700"
                >
                  Admin Dashboard
                </Link>
              ) : user.role === "seller" ? (
                <Link
                  to="/seller/dashboard"
                  className="rounded-xl bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
                >
                  Seller Dashboard
                </Link>
              ) : (
                <Link
                  to="/seller-request"
                  className="rounded-xl bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
                >
                  Become Seller
                </Link>
              )}
            </>
          )}

        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3">

          {/* Cart */}
          <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-300 hover:bg-slate-100">
            <FiShoppingCart size={18} />
          </button>

          {/* Notifications */}
          <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-300 hover:bg-slate-100">
            <FiBell size={18} />
          </button>

          {/* User */}
          {!user ? (
            <Link
              to="/login"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-300 hover:bg-slate-100"
            >
              <FiUser size={18} />
            </Link>
          ) : (
            <div className="flex items-center gap-4">

              <img
                src={
                  user.profileImage ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user.fullName
                  )}`
                }
                alt={user.fullName}
                className="h-11 w-11 rounded-full border object-cover"
              />

              <div className="hidden lg:block">

                <p className="font-semibold text-slate-900">
                  {user.fullName}
                </p>

                <div className="mt-1 flex gap-4 text-sm">

                  <Link
                    to="/orders"
                    className="text-blue-600 hover:underline"
                  >
                    My Orders
                  </Link>

                  {user.role === "admin" && (
                    <Link
                      to="/admin"
                      className="text-red-600 hover:underline"
                    >
                      Admin
                    </Link>
                  )}

                  {user.role === "seller" && (
                    <Link
                      to="/seller/dashboard"
                      className="text-blue-600 hover:underline"
                    >
                      Dashboard
                    </Link>
                  )}

                </div>

              </div>

              <button
                onClick={handleLogout}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-300 transition hover:bg-red-50"
                title="Logout"
              >
                <FiLogOut size={18} />
              </button>

            </div>
          )}

        </div>

      </div>
    </header>
  );
}

export default Navbar;
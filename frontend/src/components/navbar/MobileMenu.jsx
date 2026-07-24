import { NavLink } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

function MobileMenu({
  mobileMenuOpen,
  setMobileMenuOpen,
  search,
  setSearch,
  handleSearch,
  user,
  handleLogout,
}) {
  if (!mobileMenuOpen) return null;

  return (
    <div className="border-t bg-white shadow-lg lg:hidden">

      <div className="space-y-5 p-5">

        {/* Search */}

        <div className="relative">

          <FiSearch
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
                setMobileMenuOpen(false);
              }
            }}
            className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none focus:border-blue-500"
          />

        </div>

        <NavLink
          to="/"
          onClick={() =>
            setMobileMenuOpen(false)
          }
          className="block rounded-xl px-3 py-3 hover:bg-slate-100"
        >
          🏠 Home
        </NavLink>

        <NavLink
          to="/products"
          onClick={() =>
            setMobileMenuOpen(false)
          }
          className="block rounded-xl px-3 py-3 hover:bg-slate-100"
        >
          📦 Explore Products
        </NavLink>

        <NavLink
          to="/categories"
          onClick={() =>
            setMobileMenuOpen(false)
          }
          className="block rounded-xl px-3 py-3 hover:bg-slate-100"
        >
          📂 Categories
        </NavLink>

        <NavLink
          to="/cart"
          onClick={() =>
            setMobileMenuOpen(false)
          }
          className="block rounded-xl px-3 py-3 hover:bg-slate-100"
        >
          🛒 Cart
        </NavLink>

        <NavLink
          to="/wishlist"
          onClick={() =>
            setMobileMenuOpen(false)
          }
          className="block rounded-xl px-3 py-3 hover:bg-slate-100"
        >
          ❤️ Wishlist
        </NavLink>

        <NavLink
          to="/notifications"
          onClick={() =>
            setMobileMenuOpen(false)
          }
          className="block rounded-xl px-3 py-3 hover:bg-slate-100"
        >
          🔔 Notifications
        </NavLink>

        {!user ? (

          <NavLink
            to="/login"
            onClick={() =>
              setMobileMenuOpen(false)
            }
            className="block rounded-xl bg-blue-600 py-3 text-center font-semibold text-white"
          >
            Login
          </NavLink>

        ) : (

          <>
            <NavLink
              to="/profile"
              onClick={() =>
                setMobileMenuOpen(false)
              }
              className="block rounded-xl px-3 py-3 hover:bg-slate-100"
            >
              👤 My Profile
            </NavLink>

            {user.role === "buyer" && (
              <NavLink
                to="/orders"
                onClick={() =>
                  setMobileMenuOpen(false)
                }
                className="block rounded-xl px-3 py-3 hover:bg-slate-100"
              >
                📦 My Orders
              </NavLink>
            )}

            {user.role === "seller" && (
              <NavLink
                to="/seller/dashboard"
                onClick={() =>
                  setMobileMenuOpen(false)
                }
                className="block rounded-xl px-3 py-3 hover:bg-slate-100"
              >
                💼 Seller Dashboard
              </NavLink>
            )}

            {user.role === "admin" && (
              <NavLink
                to="/admin/dashboard"
                onClick={() =>
                  setMobileMenuOpen(false)
                }
                className="block rounded-xl px-3 py-3 hover:bg-slate-100"
              >
                ⚙️ Admin Dashboard
              </NavLink>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleLogout();
              }}
              className="w-full rounded-xl bg-red-600 py-3 font-semibold text-white hover:bg-red-700"
            >
              Logout
            </button>
          </>

        )}

      </div>

    </div>
  );
}

export default MobileMenu;
import { NavLink } from "react-router-dom";
import {
  FiUser,
  FiPackage,
  FiHeart,
  FiShoppingCart,
  FiGrid,
  FiLogOut,
} from "react-icons/fi";

function ProfileDropdown({
  user,
  handleLogout,
  setOpenProfile,
}) {
  return (
    <div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">

      {/* Header */}

      <div className="border-b bg-slate-50 p-5">

        <h3 className="font-bold">
          {user.fullName}
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          {user.email}
        </p>

      </div>

      {/* Menu */}

      <div className="py-2">

        <NavLink
          to="/profile"
          onClick={() => setOpenProfile(false)}
          className="flex items-center gap-3 px-5 py-3 transition hover:bg-slate-100"
        >
          <FiUser />
          My Profile
        </NavLink>

        {user.role === "buyer" && (
          <>
            <NavLink
              to="/orders"
              onClick={() => setOpenProfile(false)}
              className="flex items-center gap-3 px-5 py-3 transition hover:bg-slate-100"
            >
              <FiPackage />
              My Orders
            </NavLink>

            <NavLink
              to="/wishlist"
              onClick={() => setOpenProfile(false)}
              className="flex items-center gap-3 px-5 py-3 transition hover:bg-slate-100"
            >
              <FiHeart />
              Wishlist
            </NavLink>

            <NavLink
              to="/cart"
              onClick={() => setOpenProfile(false)}
              className="flex items-center gap-3 px-5 py-3 transition hover:bg-slate-100"
            >
              <FiShoppingCart />
              Cart
            </NavLink>
          </>
        )}

        {user.role === "seller" && (
          <NavLink
            to="/seller/dashboard"
            onClick={() => setOpenProfile(false)}
            className="flex items-center gap-3 px-5 py-3 transition hover:bg-slate-100"
          >
            <FiGrid />
            Seller Dashboard
          </NavLink>
        )}

        {user.role === "admin" && (
          <NavLink
            to="/admin/dashboard"
            onClick={() => setOpenProfile(false)}
            className="flex items-center gap-3 px-5 py-3 transition hover:bg-slate-100"
          >
            <FiGrid />
            Admin Dashboard
          </NavLink>
        )}

      </div>

      {/* Logout */}

      <div className="border-t p-3">

        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
        >
          <FiLogOut />
          Logout
        </button>

      </div>

    </div>
  );
}

export default ProfileDropdown;
import { NavLink } from "react-router-dom";

function DesktopNav({ user }) {
  return (
    <nav className="hidden items-center gap-4 xl:gap-6 lg:flex">

      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "font-semibold text-blue-600"
            : "font-medium text-slate-700 transition hover:text-blue-600"
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/products"
        className={({ isActive }) =>
          isActive
            ? "font-semibold text-blue-600"
            : "font-medium text-slate-700 transition hover:text-blue-600"
        }
      >
        Explore
      </NavLink>

      <NavLink
        to="/categories"
        className={({ isActive }) =>
          isActive
            ? "font-semibold text-blue-600"
            : "font-medium text-slate-700 transition hover:text-blue-600"
        }
      >
        Categories
      </NavLink>

      {user?.role === "buyer" && (
        <NavLink
          to="/seller-request"
          className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          Become Seller
        </NavLink>
      )}

      {user?.role === "seller" && (
        <NavLink
          to="/seller/dashboard"
          className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          Seller Dashboard
        </NavLink>
      )}

      {user?.role === "admin" && (
        <NavLink
          to="/admin/dashboard"
          className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
        >
          Admin Dashboard
        </NavLink>
      )}

    </nav>
  );
}

export default DesktopNav;
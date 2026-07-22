import { Link, Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import {
  FiGrid,
  FiPackage,
  FiPlusCircle,
  FiShoppingBag,
  FiBarChart2,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

import { AuthContext } from "../context/AuthContext";

function SellerLayout() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-slate-100">

      {/* Sidebar */}
      <aside className="w-72 bg-white shadow-lg">

        <div className="border-b p-6">

          <h1 className="text-2xl font-bold text-blue-600">
            SkillMart
          </h1>

          <p className="mt-2 text-slate-500">
            Seller Panel
          </p>

        </div>

        <div className="flex flex-col gap-2 p-5">

          <Link
            to="/seller-dashboard"
            className="flex items-center gap-3 rounded-lg p-3 hover:bg-blue-50"
          >
            <FiGrid />
            Dashboard
          </Link>

          <Link
            to="/seller/products"
            className="flex items-center gap-3 rounded-lg p-3 hover:bg-blue-50"
          >
            <FiPackage />
            Products
          </Link>

          <Link
            to="/seller/add-product"
            className="flex items-center gap-3 rounded-lg p-3 hover:bg-blue-50"
          >
            <FiPlusCircle />
            Add Product
          </Link>

          <Link
            to="/seller/orders"
            className="flex items-center gap-3 rounded-lg p-3 hover:bg-blue-50"
          >
            <FiShoppingBag />
            Orders
          </Link>

          <Link
            to="/seller/analytics"
            className="flex items-center gap-3 rounded-lg p-3 hover:bg-blue-50"
          >
            <FiBarChart2 />
            Analytics
          </Link>

          <Link
            to="/seller/settings"
            className="flex items-center gap-3 rounded-lg p-3 hover:bg-blue-50"
          >
            <FiSettings />
            Settings
          </Link>

        </div>

        <div className="mt-auto border-t p-5">

          <div className="mb-4">

            <p className="font-semibold">
              {user?.fullName}
            </p>

            <p className="text-sm text-slate-500">
              {user?.email}
            </p>

          </div>

          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-500 py-3 text-white hover:bg-red-600"
          >
            <FiLogOut />
            Logout
          </button>

        </div>

      </aside>

      {/* Content */}

      <main className="flex-1 p-8">
        <Outlet />
      </main>

    </div>
  );
}

export default SellerLayout;

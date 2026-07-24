import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import {
  FiHome,
  FiGrid,
  FiUsers,
  FiPackage,
  FiShoppingBag,
  FiUserCheck,
  FiBarChart2,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";

import { AuthContext } from "../context/AuthContext";

function AdminLayout() {
  const { user, logout } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    {
      label: "Home",
      path: "/",
      icon: <FiHome />,
    },
    {
      label: "Dashboard",
      path: "/admin/dashboard",
      icon: <FiGrid />,
    },
    {
      label: "Users",
      path: "/admin/users",
      icon: <FiUsers />,
    },
    {
      label: "Products",
      path: "/admin/products",
      icon: <FiPackage />,
    },
    {
      label: "Orders",
      path: "/admin/orders",
      icon: <FiShoppingBag />,
    },
    {
      label: "Seller Requests",
      path: "/admin/seller-requests",
      icon: <FiUserCheck />,
    },
    {
      label: "Analytics",
      path: "/admin/analytics",
      icon: <FiBarChart2 />,
    },
    {
      label: "Settings",
      path: "/admin/settings",
      icon: <FiSettings />,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Mobile Header */}

      <header className="sticky top-0 z-40 flex items-center justify-between border-b bg-white px-4 py-4 shadow lg:hidden">

        <button
          onClick={() => setSidebarOpen(true)}
          className="rounded-lg border p-2"
        >
          <FiMenu size={22} />
        </button>

        <h1 className="text-xl font-bold text-blue-600">
          SkillMart
        </h1>

        <div className="w-10" />

      </header>

      {/* Overlay */}

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      {/* Sidebar */}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col bg-white shadow-xl transition-transform duration-300
        ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }
        lg:translate-x-0`}
      >

        <div className="flex items-center justify-between border-b p-6">

          <div>

            <h1 className="text-3xl font-bold text-blue-600">
              SkillMart
            </h1>

            <p className="mt-2 text-slate-500">
              Admin Panel
            </p>

          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg border p-2 lg:hidden"
          >
            <FiX />
          </button>

        </div>

        <div className="flex flex-1 flex-col gap-2 p-5">

          {menuItems.map((item) => (

            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 rounded-xl p-3 transition
              ${
                location.pathname === item.path
                  ? "bg-blue-600 text-white"
                  : "hover:bg-blue-50"
              }`}
            >
              {item.icon}

              {item.label}

            </Link>

          ))}
                  </div>

        {/* User */}

        <div className="border-t p-5">

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
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 py-3 text-white transition hover:bg-red-600"
          >
            <FiLogOut />

            Logout

          </button>

        </div>

      </aside>

      {/* Main Content */}

      <main className="p-5 lg:ml-72 lg:p-8">

        <Outlet />

      </main>

    </div>
  );
}

export default AdminLayout;
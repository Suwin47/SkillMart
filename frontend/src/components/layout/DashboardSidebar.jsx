import { X } from "lucide-react";
import { NavLink } from "react-router-dom";

function DashboardSidebar({
  open,
  setOpen,
  menuItems,
}) {
  return (
    <>
      {/* Overlay */}

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      {/* Sidebar */}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          w-72 bg-white border-r shadow-xl
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >

        {/* Header */}

        <div className="flex items-center justify-between border-b p-6">

          <div>

            <h1 className="text-4xl font-bold text-blue-600">
              SkillMart
            </h1>

            <p className="mt-1 text-slate-500">
              Admin Panel
            </p>

          </div>

          <button
            onClick={() => setOpen(false)}
            className="rounded-lg border p-2 hover:bg-slate-100 lg:hidden"
          >
            <X size={20} />
          </button>

        </div>

        {/* Menu */}

        <nav className="mt-6 flex flex-col gap-2 px-4">

          {menuItems.map((item) => (

            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                  isActive
                    ? "bg-blue-600 text-white shadow"
                    : "text-slate-700 hover:bg-slate-100"
                }`
              }
            >
              <item.icon size={20} />

              <span className="font-medium">
                {item.label}
              </span>

            </NavLink>

          ))}

        </nav>

      </aside>
    </>
  );
}

export default DashboardSidebar;
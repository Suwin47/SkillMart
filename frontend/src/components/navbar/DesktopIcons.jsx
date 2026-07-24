import { NavLink } from "react-router-dom";
import {
  FiShoppingCart,
  FiHeart,
  FiBell,
  FiUser,
  FiChevronDown,
} from "react-icons/fi";

import ProfileDropdown from "./ProfileDropdown";

function DesktopIcons({
  user,
  unreadCount,
  openProfile,
  setOpenProfile,
  profileRef,
  handleLogout,
}) {
  return (
    <div className="hidden items-center gap-2 lg:flex">

      {/* Cart */}

      <NavLink
        to="/cart"
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-300 transition hover:bg-slate-100"
      >
        <FiShoppingCart size={18} />
      </NavLink>

      {/* Wishlist */}

      <NavLink
        to="/wishlist"
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-300 transition hover:bg-slate-100"
      >
        <FiHeart size={18} />
      </NavLink>

      {/* Notifications */}

      <NavLink
        to="/notifications"
        className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-slate-300 transition hover:bg-slate-100"
      >
        <FiBell size={18} />

        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-600 px-1 text-xs font-bold text-white">
            {unreadCount}
          </span>
        )}

      </NavLink>

      {/* Login */}

      {!user ? (

        <NavLink
          to="/login"
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-300 transition hover:bg-slate-100"
        >
          <FiUser size={18} />
        </NavLink>

      ) : (

        <div
          ref={profileRef}
          className="relative"
        >

          <button
            onClick={() =>
              setOpenProfile(!openProfile)
            }
            className="flex items-center gap-2 rounded-xl border border-slate-300 p-1.5 transition hover:bg-slate-100"
          >

            <img
              src={
                user.profileImage ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  user.fullName
                )}`
              }
              alt={user.fullName}
              className="h-10 w-10 rounded-full object-cover"
            />

            <FiChevronDown
              className={`transition ${
                openProfile
                  ? "rotate-180"
                  : ""
              }`}
            />

          </button>

          {openProfile && (

            <ProfileDropdown
              user={user}
              handleLogout={handleLogout}
              setOpenProfile={setOpenProfile}
            />

          )}

        </div>

      )}

    </div>
  );
}

export default DesktopIcons;
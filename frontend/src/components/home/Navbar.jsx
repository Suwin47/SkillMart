import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import toast from "react-hot-toast";

import { AuthContext } from "../../context/AuthContext";
import { NotificationContext } from "../../context/NotificationContext";

import DesktopSearch from "../navbar/DesktopSearch";
import DesktopNav from "../navbar/DesktopNav";
import DesktopIcons from "../navbar/DesktopIcons";
import MobileMenu from "../navbar/MobileMenu";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { unreadCount } = useContext(NotificationContext);

  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [openProfile, setOpenProfile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target)
      ) {
        setOpenProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully.");
    navigate("/login");
  };

  const handleSearch = () => {
    navigate(`/products?search=${encodeURIComponent(search)}`);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md">

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 md:px-6">

        {/* Logo */}

        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-lg font-bold text-white">
            S
          </div>

          <div className="hidden sm:block">
            <h1 className="text-2xl font-bold text-slate-900">
              SkillMart
            </h1>

            <p className="text-xs text-slate-500">
              Digital Marketplace
            </p>
          </div>
        </Link>

        <DesktopSearch
          search={search}
          setSearch={setSearch}
          handleSearch={handleSearch}
        />

        <DesktopNav user={user} />

        <button
          onClick={() =>
            setMobileMenuOpen(!mobileMenuOpen)
          }
          className="rounded-xl border p-2 lg:hidden"
        >
          {mobileMenuOpen ? (
            <FiX size={22} />
          ) : (
            <FiMenu size={22} />
          )}
        </button>

        <DesktopIcons
          user={user}
          unreadCount={unreadCount}
          profileRef={profileRef}
          openProfile={openProfile}
          setOpenProfile={setOpenProfile}
          handleLogout={handleLogout}
        />

      </div>

      <MobileMenu
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
        user={user}
        handleLogout={handleLogout}
      />

    </header>
  );
}

export default Navbar;
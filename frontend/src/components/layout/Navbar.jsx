import { Link } from "react-router-dom";
import { ShoppingBag, Menu } from "lucide-react";

function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2" >
            <ShoppingBag className="text-indigo-600" size={30}/>
            <span className="text-2xl font-bold">
              SkillMart
            </span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="hover:text-indigo-600 transition">
              Home
            </Link>

            <Link to="/services" className="hover:text-indigo-600 transition">
              Marketplace
            </Link>
            </nav>

          {/* Right */}
          <div className="hidden md:flex gap-3">
            <Link to="/login" className="px-5 py-2 rounded-xl border hover:bg-gray-100 transition">
              Login
            </Link>
            <Link to="/register"
              className="px-5 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition">
              Get Started
            </Link>
          </div>

          {/* Mobile */}
          <button className="md:hidden">
            <Menu />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
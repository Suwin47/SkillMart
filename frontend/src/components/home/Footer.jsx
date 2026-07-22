import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">

      <div className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Company */}

          <div>

            <div className="flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-xl font-bold text-white">
                S
              </div>

              <div>

                <h2 className="text-2xl font-bold text-white">
                  SkillMart
                </h2>

                <p className="text-sm text-slate-400">
                  Digital Marketplace
                </p>

              </div>

            </div>

            <p className="mt-6 leading-7 text-slate-400">
              Buy and sell premium digital products with confidence.
              Templates, UI Kits, Source Code, React Projects,
              AI Tools, E-books and much more.
            </p>

          </div>

          {/* Marketplace */}

          <div>

            <h3 className="text-lg font-semibold text-white">
              Marketplace
            </h3>

            <div className="mt-5 flex flex-col gap-3">

              <Link
                to="/products"
                className="hover:text-white transition"
              >
                Products
              </Link>

              <Link
                to="/categories"
                className="hover:text-white transition"
              >
                Categories
              </Link>

              <Link
                to="/seller-request"
                className="hover:text-white transition"
              >
                Become Seller
              </Link>

              <Link
                to="/login"
                className="hover:text-white transition"
              >
                Login
              </Link>

            </div>

          </div>

          {/* Support */}

          <div>

            <h3 className="text-lg font-semibold text-white">
              Support
            </h3>

            <div className="mt-5 flex flex-col gap-3">

              <Link
                to="/faq"
                className="hover:text-white transition"
              >
                FAQ
              </Link>

              <Link
                to="/privacy"
                className="hover:text-white transition"
              >
                Privacy Policy
              </Link>

              <Link
                to="/terms"
                className="hover:text-white transition"
              >
                Terms & Conditions
              </Link>

              <Link
                to="/contact"
                className="hover:text-white transition"
              >
                Contact Us
              </Link>

            </div>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-lg font-semibold text-white">
              Contact
            </h3>

            <div className="mt-5 space-y-4">

              <div className="flex items-center gap-3">

                <Mail size={18} />

                <span>support@skillmart.com</span>

              </div>

              <div className="flex items-center gap-3">

                <Phone size={18} />

                <span>+91 98765 43210</span>

              </div>

              <div className="flex items-center gap-3">

                <MapPin size={18} />

                <span>Kerala, India</span>

              </div>

            </div>

            {/* Social Icons */}

            <div className="mt-8 flex gap-4">

              <a
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-800 text-white transition hover:bg-blue-600"
              >
                <FaFacebookF size={18} />
              </a>

              <a
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-800 text-white transition hover:bg-pink-600"
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-800 text-white transition hover:bg-sky-600"
              >
                <FaLinkedinIn size={18} />
              </a>

              <a
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-800 text-white transition hover:bg-gray-700"
              >
                <FaGithub size={18} />
              </a>

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div className="mt-16 border-t border-slate-800 pt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} SkillMart. All rights reserved.
          </p>

          <p className="text-sm text-slate-500">
            Built with ❤️ using React, Node.js & MongoDB
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;
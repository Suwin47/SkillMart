import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-cyan-100 flex items-center justify-center p-6">

      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2">

        {/* LEFT SIDE */}

        <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-500 text-white p-14">

          <Link to="/" className="flex items-center gap-3">

            <div className="h-14 w-14 rounded-2xl bg-white/20 flex items-center justify-center">

              <ShoppingBag size={28} />

            </div>

            <div>

              <h1 className="text-3xl font-bold">
                SkillMart
              </h1>

              <p className="text-blue-100">
                Digital Marketplace
              </p>

            </div>

          </Link>

          <h2 className="mt-16 text-5xl font-bold leading-tight">
            Buy & Sell
            <br />
            Digital Products
          </h2>

          <p className="mt-8 text-lg text-blue-100 leading-8">
            Join thousands of creators and buyers on India's premium digital marketplace.
          </p>

          <div className="mt-12 space-y-5">

            <div className="flex items-center gap-3">
              ✅ Premium Products
            </div>

            <div className="flex items-center gap-3">
              ✅ Secure Payments
            </div>

            <div className="flex items-center gap-3">
              ✅ Instant Downloads
            </div>

            <div className="flex items-center gap-3">
              ✅ Verified Sellers
            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="p-10 lg:p-14">

          <h2 className="text-4xl font-bold text-slate-900">
            {title}
          </h2>

          <p className="mt-3 text-slate-500">
            {subtitle}
          </p>

          <div className="mt-10">
            {children}
          </div>

        </div>

      </div>

    </div>
  );
}

export default AuthLayout;
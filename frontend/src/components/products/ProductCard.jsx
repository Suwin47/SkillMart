import { Link } from "react-router-dom";
import {
  Heart,
  Star,
  Download,
  ShoppingCart,
  BadgeCheck,
} from "lucide-react";

function ProductCard({ product }) {
  return (
    <div className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

      {/* Image */}

      <Link to={`/product/${product._id}`}>

        <div className="relative overflow-hidden">

          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-56 w-full object-cover transition duration-500 group-hover:scale-110"
          />

          {/* Wishlist */}

          <button
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition hover:bg-red-50 hover:text-red-500"
            onClick={(e) => e.preventDefault()}
          >
            <Heart size={18} />
          </button>

          {/* Badge */}

          <span className="absolute left-4 top-4 rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white">

            Best Seller

          </span>

        </div>

      </Link>

      {/* Content */}

      <div className="p-6">

        {/* Seller */}

        <div className="flex items-center gap-3">

          <img
            src={
              product.seller?.profileImage ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                product.seller?.fullName || "User"
              )}`
            }
            alt={product.seller?.fullName}
            className="h-10 w-10 rounded-full object-cover"
          />

          <div>

            <h4 className="flex items-center gap-1 font-semibold">

              {product.seller?.fullName}

              <BadgeCheck
                size={16}
                className="text-blue-600"
              />

            </h4>

            <p className="text-sm text-slate-500">

              Verified Seller

            </p>

          </div>

        </div>

        {/* Title */}

        <Link to={`/product/${product._id}`}>

          <h3 className="mt-5 text-xl font-bold text-slate-900 transition group-hover:text-blue-600">

            {product.title}

          </h3>

        </Link>

        {/* Rating & Downloads */}

        <div className="mt-4 flex items-center justify-between">

          <span className="flex items-center gap-1 text-yellow-500">

            <Star
              size={17}
              fill="currentColor"
            />

            {product.rating.toFixed(1)}

          </span>

          <span className="flex items-center gap-1 text-slate-500">

            <Download size={16} />

            {product.totalSales} Sales

          </span>

        </div>

        {/* Category */}

        <div className="mt-5">

          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">

            {product.category}

          </span>

        </div>

        {/* Price */}

        <div className="mt-6 flex items-center justify-between">

          <div>

            <p className="text-sm text-slate-400">

              Price

            </p>

            <h2 className="text-3xl font-bold text-indigo-600">

              ₹{product.price}

            </h2>

          </div>

          <Link to={`/product/${product._id}`}>

            <button className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-white transition hover:bg-indigo-700">

              <ShoppingCart size={18} />

              Buy

            </button>

          </Link>

        </div>

      </div>

    </div>
  );
}

export default ProductCard;
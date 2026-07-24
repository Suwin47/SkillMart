import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../services/api";

import {
  Heart,
  Star,
  Download,
  ShoppingCart,
  BadgeCheck,
} from "lucide-react";

function ProductCard({
  product,
  wishlistIds = [],
  setWishlistIds = () => {},
}) {
  const wishlisted = wishlistIds.includes(product._id);

  const toggleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const { data } = await api.post("/wishlist", {
        serviceId: product._id,
      });

      if (data.wishlisted) {
        setWishlistIds((prev) =>
          prev.includes(product._id)
            ? prev
            : [...prev, product._id]
        );
      } else {
        setWishlistIds((prev) =>
          prev.filter((id) => id !== product._id)
        );
      }

      toast.success(data.message);

    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.message ||
          "Unable to update wishlist."
      );
    }
  };

  return (
    <div className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

      <Link to={`/product/${product._id}`}>

        {/* Image */}

        <div className="relative overflow-hidden">

          <img
            src={
              product.thumbnail ||
              "https://via.placeholder.com/500x300?text=No+Image"
            }
            alt={product.title}
            className="h-56 w-full object-cover transition duration-500 group-hover:scale-110"
          />

          {/* Wishlist */}

          <button
            onClick={toggleWishlist}
            className={`absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full shadow-lg transition-all

            ${
              wishlisted
                ? "bg-red-500 text-white"
                : "bg-white text-slate-700 hover:bg-red-50 hover:text-red-500"
            }`}
          >
            <Heart
              size={20}
              fill={wishlisted ? "currentColor" : "none"}
            />
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
            className="h-11 w-11 rounded-full object-cover"
          />

          <div>

            <h4 className="flex items-center gap-1 font-semibold">

              {product.seller?.fullName || "Unknown Seller"}

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

          <h3 className="mt-5 line-clamp-2 text-xl font-bold text-slate-900 transition group-hover:text-blue-600">

            {product.title}

          </h3>

        </Link>

        {/* Rating */}

        <div className="mt-4 flex items-center justify-between">

          <span className="flex items-center gap-1 text-yellow-500">

            <Star
              size={17}
              fill="currentColor"
            />

            {Number(product.rating || 0).toFixed(1)}

          </span>

          <span className="flex items-center gap-1 text-slate-500">

            <Download size={16} />

            {product.totalSales || 0} Sales

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
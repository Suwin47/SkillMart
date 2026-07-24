import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Heart, Star, Download } from "lucide-react";

import api from "../../services/api";

function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchWishlist();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/services", {
        params: {
          page: 1,
          limit: 4,
          sort: "latest",
        },
      });

      setProducts(res.data.services);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchWishlist = async () => {
    try {
      const res = await api.get("/wishlist");

      setWishlistIds(
        res.data.wishlist.map(
          (item) => item.service._id
        )
      );
    } catch {
      setWishlistIds([]);
    }
  };

  const toggleWishlist = async (serviceId) => {
    try {
      const res = await api.post("/wishlist", {
        serviceId,
      });

      if (res.data.wishlisted) {
        setWishlistIds((prev) => [
          ...prev,
          serviceId,
        ]);
      } else {
        setWishlistIds((prev) =>
          prev.filter((id) => id !== serviceId)
        );
      }

      toast.success(res.data.message);
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Unable to update wishlist."
      );
    }
  };

  return (
    <section className="bg-white py-14 md:py-20 lg:py-24">

      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        {/* Heading */}

        <div className="text-center">

          <p className="font-semibold uppercase tracking-widest text-blue-600">
            Marketplace
          </p>

          <h2 className="mt-3 text-2xl font-bold text-slate-900 md:text-3xl lg:text-4xl">
            Featured Products
          </h2>

          <p className="mx-auto mt-4 max-w-2xl px-2 text-sm text-slate-500 md:text-base">
            Explore the latest digital products created by talented creators.
          </p>

        </div>

        {/* Products */}

        <div className="mt-10 grid grid-cols-2 gap-4 md:mt-14 md:grid-cols-2 md:gap-6 lg:mt-16 lg:grid-cols-4">

          {products.map((product) => (

            <div
              key={product._id}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl lg:rounded-3xl"
            >

              <Link to={`/product/${product._id}`}>

                {/* Image */}

                <div className="relative">

                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-32 w-full object-cover md:h-44 lg:h-52"
                  />

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleWishlist(product._id);
                    }}
                    className="absolute right-2 top-2 rounded-full bg-white p-2 shadow transition hover:bg-red-50 md:right-3 md:top-3"
                  >
                    <Heart
                      size={16}
                      className={
                        wishlistIds.includes(product._id)
                          ? "fill-red-500 text-red-500"
                          : "text-slate-700"
                      }
                    />
                  </button>

                </div>

                {/* Content */}

                <div className="p-3 md:p-5 lg:p-6">

                  <div className="flex items-center justify-between">

                    <span className="flex items-center gap-1 text-xs text-yellow-500 md:text-sm">

                      <Star
                        size={14}
                        fill="currentColor"
                      />

                      {Number(product.rating).toFixed(1)}

                    </span>

                    <span className="flex items-center gap-1 text-xs text-slate-500 md:text-sm">

                      <Download size={13} />

                      {product.totalSales}

                    </span>

                  </div>

                  <h3 className="mt-3 line-clamp-2 text-sm font-bold text-slate-900 md:text-lg lg:mt-4 lg:text-xl">
                    {product.title}
                  </h3>

                  <p className="mt-1 text-xs text-slate-500 md:text-sm">
                    by {product.seller?.fullName}
                  </p>

                  <div className="mt-4 flex items-center justify-between lg:mt-6">

                    <span className="text-lg font-bold text-blue-600 md:text-xl lg:text-2xl">
                      ₹{product.price}
                    </span>

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/product/${product._id}`;
                      }}
                      className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-blue-700 md:px-4 md:text-sm lg:rounded-xl"
                    >
                      View
                    </button>

                  </div>

                </div>

              </Link>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default FeaturedProducts;
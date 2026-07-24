import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Star,
  ShoppingCart,
  BadgeCheck,
  Download,
  Heart,
} from "lucide-react";
import toast from "react-hot-toast";

import api from "../../services/api";
import loadRazorpay from "../../utils/loadRazorpay";

function ProductInfo({ product }) {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [wishlisted, setWishlisted] = useState(false);
  const [purchased, setPurchased] = useState(false);

  const [cartLoading, setCartLoading] = useState(false);
  const [buyLoading, setBuyLoading] = useState(false);

  useEffect(() => {
    if (product?._id) {
      checkWishlist();
      checkPurchase();
    }
  }, [product]);

  // ===============================
  // Wishlist
  // ===============================

  const checkWishlist = async () => {
    try {
      const res = await api.get(`/wishlist/${product._id}`);
      setWishlisted(res.data.wishlisted);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleWishlist = async () => {
    try {
      const res = await api.post("/wishlist", {
        serviceId: product._id,
      });

      setWishlisted(res.data.wishlisted);

      toast.success(res.data.message);

    } catch (err) {
      toast.error(
        err.response?.data?.message ||
        "Unable to update wishlist."
      );
    }
  };

  // ===============================
  // Purchase Check
  // ===============================

  const checkPurchase = async () => {
    try {
      const res = await api.get(
        `/orders/check-purchase/${product._id}`
      );

      setPurchased(res.data.purchased);

    } catch (err) {
      console.error(err);
      setPurchased(false);
    }
  };

  // ===============================
  // Download
  // ===============================

  const downloadProduct = async () => {
    try {

      const res = await api.get(
        `/download/${product._id}`
      );

      window.open(
        res.data.downloadUrl,
        "_blank"
      );

      toast.success("Download Started");

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
        "Download failed."
      );

    }
  };

  // ===============================
  // Add To Cart
  // ===============================

  const handleAddToCart = async () => {

    if (purchased) {
      toast.error("You already own this product.");
      return;
    }

    try {

      setCartLoading(true);

      const res = await api.post("/cart", {
        serviceId: product._id,
      });

      toast.success(res.data.message);

      navigate("/cart");

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
        "Unable to add to cart."
      );

    } finally {

      setCartLoading(false);

    }
  };
    // ===============================
  // Buy Now
  // ===============================

  const handleBuyNow = async () => {
    try {
      setBuyLoading(true);

      // Load Razorpay SDK
      const loaded = await loadRazorpay();

      if (!loaded) {
        toast.error("Unable to load Razorpay SDK.");
        return;
      }

      // Create Order
      const orderRes = await api.post("/orders", {
        serviceId: product._id,
      });

      const order = orderRes.data.order;

      // Create Razorpay Order
      const razorpayRes = await api.post("/orders/razorpay", {
        orderId: order._id,
      });

      const { razorpayOrder, key } = razorpayRes.data;

      if (!window.Razorpay) {
        toast.error("Razorpay SDK not found.");
        return;
      }

      const options = {
        key: key,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        order_id: razorpayOrder.id,

        name: "SkillMart",
        description: product.title,
        image: product.thumbnail,

        prefill: {
          name: user?.fullName || "",
          email: user?.email || "",
          contact: user?.phone || "",
        },

        notes: {
          productId: product._id,
        },

        theme: {
          color: "#2563eb",
        },

        retry: {
          enabled: false,
        },

        modal: {
          ondismiss: () => {
            toast("Payment cancelled.");
          },
        },

        handler: async (response) => {
          try {
            await api.post("/orders/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            toast.success("Payment Successful 🎉");

            setPurchased(true);

            await checkPurchase();

            setTimeout(() => {
              navigate("/orders");
            }, 1500);

          } catch (err) {
            console.error("VERIFY ERROR", err);

            toast.error(
              err.response?.data?.message ||
              "Payment Verification Failed"
            );
          }
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", (response) => {
        console.error("Payment Failed", response.error);

        toast.error(
          response.error.description ||
          "Payment Failed"
        );
      });

      razorpay.open();

    } catch (err) {
      console.error("BUY NOW ERROR", err);

      toast.error(
        err.response?.data?.message ||
        err.message ||
        "Unable to start payment."
      );

    } finally {
      setBuyLoading(false);
    }
  };
  return (
  <div>

    {/* Category */}

    <span className="inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-600">
      {product.category}
    </span>

    {/* Title */}

    <h1 className="mt-4 text-2xl font-bold leading-tight text-slate-900 sm:text-3xl lg:text-5xl">
      {product.title}
    </h1>

    {/* Seller */}

    <div className="mt-6 flex items-center gap-4">

      <img
        src={
          product.seller?.profileImage ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            product.seller?.fullName || "User"
          )}`
        }
        alt={product.seller?.fullName}
        className="h-12 w-12 rounded-full object-cover sm:h-14 sm:w-14"
        onError={(e) => {
          e.target.src =
            "https://placehold.co/100x100?text=User";
        }}
      />

      <div>

        <div className="flex items-center gap-2">

          <h3 className="text-base font-semibold sm:text-lg">
            {product.seller?.fullName || "Unknown Seller"}
          </h3>

          <BadgeCheck
            size={18}
            className="text-blue-600"
          />

        </div>

        <p className="text-sm text-slate-500">
          Verified Seller
        </p>

      </div>

    </div>

    {/* Rating */}

    <div className="mt-6 flex flex-wrap items-center gap-6">

      <div className="flex items-center gap-2">

        <Star
          size={20}
          fill="gold"
          className="text-yellow-500"
        />

        <span className="font-semibold">
          {Number(product.rating || 0).toFixed(1)}
        </span>

      </div>

      <div className="flex items-center gap-2 text-slate-600">

        <Download size={18} />

        <span>
          {product.totalSales || 0} Sales
        </span>

      </div>

    </div>

    {/* Price */}

    <div className="mt-8">

      <p className="text-sm text-slate-500">
        Price
      </p>

      <h2 className="mt-1 text-4xl font-bold text-indigo-600 sm:text-5xl">
        ₹{product.price}
      </h2>

    </div>

    {/* Description */}

    <div className="mt-8">

      <h3 className="mb-3 text-xl font-semibold">
        Description
      </h3>

      <p className="leading-8 text-slate-600">
        {product.description}
      </p>

    </div>

    {/* Buttons */}

    <div className="mt-10 flex flex-col gap-4">
            {/* Add To Cart */}

      {!purchased && (
        <button
          onClick={handleAddToCart}
          disabled={cartLoading}
          className="flex items-center justify-center gap-3 rounded-2xl border-2 border-blue-600 bg-white px-6 py-4 text-lg font-semibold text-blue-600 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <ShoppingCart size={22} />

          {cartLoading ? (
            <>
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
              Adding...
            </>
          ) : (
            "Add to Cart"
          )}
        </button>
      )}

      {/* Buy / Download */}

      {purchased ? (
        <button
          onClick={downloadProduct}
          className="flex items-center justify-center gap-3 rounded-2xl bg-green-600 px-6 py-4 text-lg font-semibold text-white transition hover:bg-green-700"
        >
          <Download size={22} />
          Download Product
        </button>
      ) : (
        <button
          onClick={handleBuyNow}
          disabled={buyLoading}
          className="flex items-center justify-center gap-3 rounded-2xl bg-blue-600 px-6 py-4 text-lg font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <ShoppingCart size={22} />

          {buyLoading ? (
            <>
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              Processing...
            </>
          ) : (
            "Buy Now"
          )}
        </button>
      )}

      {/* Wishlist */}

      <button
        onClick={toggleWishlist}
        className={`flex items-center justify-center gap-3 rounded-2xl border px-6 py-4 text-lg font-semibold transition ${
          wishlisted
            ? "border-red-500 bg-red-50 text-red-500"
            : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
        }`}
      >
        <Heart
          size={24}
          fill={wishlisted ? "currentColor" : "none"}
        />

        {wishlisted
          ? "Remove from Wishlist"
          : "Add to Wishlist"}
      </button>

    </div>

  </div>
);

}

export default ProductInfo;
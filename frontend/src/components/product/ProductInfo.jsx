import { useEffect, useState } from "react";
import {
  Star,
  ShoppingCart,
  BadgeCheck,
  Download,
  Heart,
} from "lucide-react";
import api from "../../services/api";

function ProductInfo({ product }) {
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    if (product?._id) {
      checkWishlist();
    }
  }, [product]);

  const checkWishlist = async () => {
    try {
      const res = await api.get(`/wishlist/${product._id}`);
      setWishlisted(res.data.wishlisted);
    } catch (err) {
      console.log(err);
    }
  };

  const toggleWishlist = async () => {
    try {
      const res = await api.post("/wishlist", {
        serviceId: product._id,
      });

      setWishlisted(res.data.wishlisted);

      alert(res.data.message);
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Unable to update wishlist."
      );
    }
  };

  const handleBuyNow = async () => {
    try {
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

      const options = {
        key,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "SkillMart",
        description: product.title,
        image: product.thumbnail,
        order_id: razorpayOrder.id,

        handler: async function (response) {
          try {
            await api.post("/orders/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            alert("Payment Successful 🎉");

          } catch (err) {
            console.error(err);

            alert("Payment verification failed.");
          }
        },

        prefill: {
          name: product.seller?.fullName || "",
        },

        notes: {
          productId: product._id,
        },

        theme: {
          color: "#2563eb",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();

    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Unable to start payment."
      );
    }
  };

  return (
    <div>
      {/* Category */}

      <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-600">
        {product.category}
      </span>

      {/* Title */}

      <h1 className="mt-5 text-4xl font-bold text-slate-900">
        {product.title}
      </h1>

      {/* Seller */}

      <div className="mt-6 flex items-center gap-3">

        <img
          src={
            product.seller?.profileImage ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              product.seller?.fullName || "User"
            )}`
          }
          alt={product.seller?.fullName}
          className="h-14 w-14 rounded-full object-cover"
        />

        <div>

          <div className="flex items-center gap-2">

            <h3 className="text-lg font-semibold">
              {product.seller?.fullName}
            </h3>

            <BadgeCheck
              size={18}
              className="text-blue-600"
            />

          </div>

          <p className="text-slate-500">
            Verified Seller
          </p>

        </div>

      </div>

      {/* Rating */}

      <div className="mt-8 flex gap-8">

        <div className="flex items-center gap-2">

          <Star
            size={20}
            fill="gold"
            className="text-yellow-500"
          />

          <span className="font-semibold">
            {Number(product.rating).toFixed(1)}
          </span>

        </div>

        <div className="flex items-center gap-2">

          <Download size={18} />

          {product.totalSales} Sales

        </div>

      </div>

      {/* Price */}

      <h2 className="mt-8 text-5xl font-bold text-blue-600">
        ₹{product.price}
      </h2>

      {/* Description */}

      <p className="mt-8 leading-8 text-slate-600">
        {product.description}
      </p>

      {/* Buttons */}

      <div className="mt-10 flex gap-4">

        <button
          onClick={handleBuyNow}
          className="flex flex-1 items-center justify-center gap-3 rounded-2xl bg-blue-600 px-8 py-5 text-lg font-semibold text-white transition hover:bg-blue-700"
        >
          <ShoppingCart size={22} />
          Buy Now
        </button>

        <button
          onClick={toggleWishlist}
          className={`flex h-16 w-16 items-center justify-center rounded-2xl border transition ${
            wishlisted
              ? "border-red-500 bg-red-50 text-red-500"
              : "border-slate-300 bg-white text-slate-500 hover:bg-slate-100"
          }`}
        >
          <Heart
            size={28}
            fill={wishlisted ? "currentColor" : "none"}
          />
        </button>

      </div>
    </div>
  );
}

export default ProductInfo;
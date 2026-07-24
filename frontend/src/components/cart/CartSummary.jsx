import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../../services/api";
import loadRazorpay from "../../utils/loadRazorpay";
import { AuthContext } from "../../context/AuthContext";

function CartSummary({ subtotal, totalItems }) {
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (loading) return;

    if (totalItems === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    try {
      setLoading(true);

      // Load Razorpay SDK
      const razorpayLoaded = await loadRazorpay();

      if (!razorpayLoaded) {
        toast.error("Unable to load Razorpay.");
        return;
      }

      // Create Razorpay Order
      const { data } = await api.post("/cart/checkout");

      const options = {
        key: data.key,

        amount: data.razorpayOrder.amount,

        currency: data.razorpayOrder.currency,

        name: "SkillMart",

        description: "Cart Checkout",

        image: "/favicon.svg",

        order_id: data.razorpayOrder.id,

        prefill: {
          name: user?.fullName || "",
          email: user?.email || "",
          contact: user?.phone || "",
        },

        notes: {
          platform: "SkillMart",
        },

        theme: {
          color: "#2563eb",
        },

        retry: {
          enabled: false,
        },

        readonly: {
          email: true,
          contact: false,
        },

        modal: {
          ondismiss: () => {
            toast("Payment cancelled.");
          },
        },

        handler: async (response) => {
          try {
            await api.post("/cart/verify", response);

            toast.success("Payment Successful!");

            navigate("/orders");

          } catch (err) {
            console.error(err);

            toast.error(
              err.response?.data?.message ||
                "Payment verification failed."
            );
          }
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", (response) => {
        toast.error(
          response.error.description ||
            "Payment Failed"
        );
      });

      razorpay.open();

    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.message ||
          "Unable to checkout."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow">

      <h2 className="text-2xl font-bold">
        Order Summary
      </h2>

      <div className="mt-6 space-y-4">

        <div className="flex justify-between">
          <span>Total Items</span>
          <span>{totalItems}</span>
        </div>

        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>

        <div className="flex justify-between">
          <span>Platform Fee</span>
          <span>₹0</span>
        </div>

        <hr />

        <div className="flex justify-between text-xl font-bold">
          <span>Total</span>
          <span>₹{subtotal}</span>
        </div>

      </div>

      <button
        onClick={handleCheckout}
        disabled={loading || totalItems === 0}
        className={`mt-8 w-full rounded-xl py-3 font-semibold text-white transition ${
          loading || totalItems === 0
            ? "cursor-not-allowed bg-gray-400"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading
          ? "Processing..."
          : "Proceed to Checkout"}
      </button>

    </div>
  );
}

export default CartSummary;
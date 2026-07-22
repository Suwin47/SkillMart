const express = require("express");
const router = express.Router();

const protect = require("../auth/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {
  createOrder,
  getMyOrders,
  getSellerOrders,
  getSingleOrder,
  createRazorpayOrder,
  verifyPayment,
} = require("../controllers/orderController");

// Buyer Routes
router.post("/", protect, createOrder);

router.get("/", protect, getMyOrders);

// Seller Orders
router.get(
  "/seller",
  protect,
  authorize("seller", "admin"),
  getSellerOrders
);

// Razorpay
router.post("/razorpay", protect, createRazorpayOrder);

router.post("/verify", protect, verifyPayment);

// Single Order
router.get("/:id", protect, getSingleOrder);

module.exports = router;
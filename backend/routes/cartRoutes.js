const express = require("express");

const router = express.Router();

const protect = require("../auth/authMiddleware");

const {
  addToCart,
  getCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
  checkoutCart,
  verifyCartPayment,
} = require("../controllers/cartController");

// Add product to cart
router.post("/", protect, addToCart);

// Get logged-in user's cart
router.get("/", protect, getCart);

// Update quantity
router.put("/:id", protect, updateCartQuantity);

// Remove one item
router.delete("/:id", protect, removeFromCart);

// Clear entire cart
router.delete("/", protect, clearCart);

// Checkout cart
router.post("/checkout", protect, checkoutCart);

// Verify cart payment
router.post("/verify", protect, verifyCartPayment);

module.exports = router;
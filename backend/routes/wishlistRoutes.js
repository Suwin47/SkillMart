const express = require("express");
const router = express.Router();

const protect = require("../auth/authMiddleware");

const {
  toggleWishlist,
  getWishlist,
  checkWishlist,
} = require("../controllers/wishlistController");

// Add / Remove Wishlist
router.post("/", protect, toggleWishlist);

// Get My Wishlist
router.get("/", protect, getWishlist);

// Check if a product is wishlisted
router.get("/:serviceId", protect, checkWishlist);

module.exports = router;
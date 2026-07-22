const express = require("express");
const router = express.Router();

const protect = require("../auth/authMiddleware");

const {
  createReview,
  getReviews,
} = require("../controllers/reviewController");

// Create Review
router.post("/", protect, createReview);

// Get Reviews of a Product
router.get("/:serviceId", protect, getReviews);

module.exports = router;
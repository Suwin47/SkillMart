const express = require("express");

const router = express.Router();

const protect = require("../auth/authMiddleware");

const {
  addReview,
  getReviews,
} = require("../controllers/reviewController");

// Add Review
router.post("/", protect, addReview);

// Get Product Reviews
router.get("/:serviceId", getReviews);

module.exports = router;
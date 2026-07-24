const express = require("express");
const router = express.Router();

const protect = require("../auth/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {
  getSellerDashboard,
} = require("../controllers/sellerController");

const {
  createSellerRequest,
  getSellerRequest,
} = require("../controllers/sellerRequestController");

const {
  getTopSellers,
} = require("../controllers/userController");

// Public
router.get("/top-sellers", getTopSellers);

// Buyer
router.post(
  "/request",
  protect,
  createSellerRequest
);

router.get(
  "/request",
  protect,
  getSellerRequest
);

// Seller
router.get(
  "/dashboard",
  protect,
  authorize("seller"),
  getSellerDashboard
);

module.exports = router;
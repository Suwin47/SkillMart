const express = require("express");
const router = express.Router();

const protect = require("../auth/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {
  getSellerDashboard,
} = require("../controllers/sellerController");

router.get(
  "/dashboard",
  protect,
  authorize("seller"),
  getSellerDashboard
);

module.exports = router;
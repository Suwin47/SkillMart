const express = require("express");
const router = express.Router();

const protect = require("../auth/authMiddleware");
const isAdmin = require("../middleware/isAdmin");
const adminController = require("../auth/adminController");

router.get(
  "/seller-requests",
  protect,
  isAdmin,
  adminController.getSellerRequests
);

router.put(
  "/seller-requests/:id/approve",
  protect,
  isAdmin,
  adminController.approveSeller
);

router.put(
  "/seller-requests/:id/reject",
  protect,
  isAdmin,
  adminController.rejectSeller
);

module.exports = router;
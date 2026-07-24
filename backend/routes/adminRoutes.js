const express = require("express");
const router = express.Router();

const protect = require("../auth/authMiddleware");
const isAdmin = require("../middleware/isAdmin");

const adminController = require("../auth/adminController");
const { getAnalytics } = require("../controllers/adminAnalyticsController");
// ======================================
// Dashboard
// ======================================

router.get(
  "/dashboard",
  protect,
  isAdmin,
  adminController.getDashboard
);

router.get(
  "/analytics",
  protect,
  isAdmin,
  getAnalytics
);

// ======================================
// Seller Requests
// ======================================

router.get(
  "/seller-requests",
  protect,
  isAdmin,
  adminController.getSellerRequests
);

// ======================================
// Approve Seller
// ======================================

router.put(
  "/seller-requests/:id/approve",
  protect,
  isAdmin,
  adminController.approveSeller
);

// ======================================
// Reject Seller
// ======================================

router.put(
  "/seller-requests/:id/reject",
  protect,
  isAdmin,
  adminController.rejectSeller
);
  
// ======================================
// Get All Users
// ======================================

router.get(
  "/users",
  protect,
  isAdmin,
  adminController.getUsers
);

// ======================================
// Delete User
// ======================================

router.delete(
  "/users/:id",
  protect,
  isAdmin,
  adminController.deleteUser
);
// ======================================
// Products
// ======================================

router.get(
  "/products",
  protect,
  isAdmin,
  adminController.getProducts
);

router.delete(
  "/products/:id",
  protect,
  isAdmin,
  adminController.deleteProduct
);
// ======================================
// Orders
// ======================================

router.get(
  "/orders",
  protect,
  isAdmin,
  adminController.getOrders
);
// ======================================
// Users
// ======================================

router.get(
  "/users",
  protect,
  isAdmin,
  adminController.getUsers
);
router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Admin route works",
  });
});
module.exports = router;
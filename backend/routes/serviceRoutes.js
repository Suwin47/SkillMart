const express = require("express");
const router = express.Router();

const protect = require("../auth/authMiddleware");
const authorize = require("../middleware/roleMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  createService,
  getAllServices,
  getMyProducts,
  getSingleService,
  updateService,
  deleteService,
} = require("../controllers/serviceController");

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

// Get all products
router.get("/", getAllServices);

// Get logged-in seller's products
// IMPORTANT: Keep this above "/:id"
router.get(
  "/my-products",
  protect,
  authorize("seller", "admin"),
  getMyProducts
);

// Get single product
router.get("/:id", getSingleService);

/*
|--------------------------------------------------------------------------
| Seller/Admin Routes
|--------------------------------------------------------------------------
*/

// Create product
router.post(
  "/",
  protect,
  authorize("seller", "admin"),
  upload.single("thumbnail"),
  createService
);

// Update product
router.put(
  "/:id",
  protect,
  authorize("seller", "admin"),
  upload.single("thumbnail"),
  updateService
);

// Delete product
router.delete(
  "/:id",
  protect,
  authorize("seller", "admin"),
  deleteService
);

module.exports = router;
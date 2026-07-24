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
  getRelatedProducts,
  updateService,
  deleteService,
  getCategoryCounts,
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
router.get(
  "/category-counts",
  getCategoryCounts
);
router.get(
  "/related/:id",
  getRelatedProducts
);

// Get single product
router.get("/:id", getSingleService);

/*
|--------------------------------------------------------------------------
| Seller/Admin Routes
|--------------------------------------------------------------------------
*/

// Create Product
router.post(
  "/",
  protect,
  authorize("seller", "admin"),
  upload.fields([
    {
      name: "thumbnail",
      maxCount: 1,
    },
    {
      name: "productFile",
      maxCount: 1,
    },
  ]),
  createService
);

// Update Product
router.put(
  "/:id",
  protect,
  authorize("seller", "admin"),
  upload.fields([
    {
      name: "thumbnail",
      maxCount: 1,
    },
    {
      name: "productFile",
      maxCount: 1,
    },
  ]),
  updateService
);

// Delete Product
router.delete(
  "/:id",
  protect,
  authorize("seller", "admin"),
  deleteService
);

module.exports = router;
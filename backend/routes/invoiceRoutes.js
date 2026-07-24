const express = require("express");
const router = express.Router();

const protect = require("../auth/authMiddleware");

const {
  generateInvoice,
} = require("../controllers/invoiceController");

router.get("/:orderId", protect, generateInvoice);

module.exports = router;
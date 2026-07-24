const express = require("express");
const router = express.Router();

const protect = require("../auth/authMiddleware");

const {
  downloadProduct,
} = require("../controllers/downloadController");

router.get("/:serviceId", protect, downloadProduct);

module.exports = router;
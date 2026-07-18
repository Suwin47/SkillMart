const express = require("express");

const { registerUser } = require("./authController");

const router = express.Router();

router.post("/register", registerUser);

module.exports = router;
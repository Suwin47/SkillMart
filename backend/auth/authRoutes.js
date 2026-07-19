const express = require("express");

const { registerUser, verifyOTP,
     resendOTP, loginUser, 
     getProfile, googleLogin, } = require("./authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/verify-otp", verifyOTP);
router.post("/resend-otp", resendOTP);
router.post("/login", loginUser);
router.get("/profile", getProfile);
router.post("/google-login", googleLogin);
module.exports = router;
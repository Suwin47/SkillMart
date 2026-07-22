const express = require("express");
const router = express.Router();
const protect = require("./authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const { registerUser, verifyOTP,
     resendOTP, loginUser, 
     getProfile, googleLogin, 
     uploadProfileImage, logoutUser } = require("./authController");




router.post("/register", registerUser);
router.post("/verify-otp", verifyOTP);
router.post("/resend-otp", resendOTP);
router.post("/login", loginUser);
router.get("/profile", getProfile);
router.post("/google-login", googleLogin);
router.post("/logout", protect, logoutUser);
router.post("/upload-profile-image", protect, upload.single("profileImage"), uploadProfileImage);
module.exports = router;
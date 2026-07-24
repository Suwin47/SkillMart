const express = require("express");
const router = express.Router();

const protect = require("./authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  registerUser,
  verifyOTP,
  resendOTP,
  loginUser,
  getProfile,
  googleLogin,
  uploadProfileImage,
  logoutUser,

  // Forgot Password
  forgotPassword,
  verifyResetOTP,
  resetPassword,
     updateProfile,
     changePassword,

} = require("./authController");

// ==========================
// Authentication
// ==========================

router.post("/register", registerUser);

router.post("/verify-otp", verifyOTP);

router.post("/resend-otp", resendOTP);

router.post("/login", loginUser);

router.post("/google-login", googleLogin);

router.post("/logout", protect, logoutUser);

// ==========================
// Forgot Password
// ==========================

router.post(
  "/forgot-password",
  forgotPassword
);

router.post(
  "/verify-reset-otp",
  verifyResetOTP
);

router.post(
  "/reset-password",
  resetPassword
);

// ==========================
// Profile
// ==========================

router.get(
  "/profile",
  protect,
  getProfile
);

router.post(
  "/upload-profile-image",
  protect,
  upload.single("profileImage"),
  uploadProfileImage
);

router.put(
  "/update-profile",
  protect,
  updateProfile
);

router.put(
  "/change-password",
  protect,
  changePassword
);

module.exports = router;
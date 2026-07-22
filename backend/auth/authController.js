const User = require("../models/User");
const OTP = require("../models/OTP");
const bcrypt = require("bcrypt");
const generateOTP = require("../utils/generateOTP");
const generateToken = require("../utils/generateTokens");
const { sendOTPEmail } = require("../services/emailService");
const firebase = require("../config/firebase");
const cloudinary = require("../config/cloudinary");
const fs = require("fs-extra");


const registerUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Check required fields
    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    await OTP.deleteMany({ email });

    const otp = generateOTP();

    await OTP.create({
      email,
      otp,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
    });


    await sendOTPEmail(email, otp);


    res.status(201).json({
      success: true,
      message: "Registration successful. Please verify your email using the OTP sent.",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Verify OTP
const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    const otpRecord = await OTP.findOne({ email, otp });

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }
    if (otpRecord.expiresAt < new Date()) {
      await OTP.deleteMany({ email });
      return res.status(400).json({
        success: false,
        message: "OTP has expired",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.isVerified = true;
    await user.save();
    await OTP.deleteMany({ email });

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//Resend OTP
const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Email is already verified",
      });
    }

    await OTP.deleteMany({ email });
 
    const otp = generateOTP();
    await OTP.create({email, otp, expiresAt: new Date(Date.now() + 10 * 60 * 1000)});

    await sendOTPEmail(email, otp);
    res.status(200).json({
      success: true,
      message: "OTP resent successfully. Please check your email.",
    });
  }catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        message: "Email is not verified. Please verify your email first.",
      });
    }

    const bcrypt = require("bcrypt");
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = generateToken(user._id, user.role);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // Set to true in production with HTTPS
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
    } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

    //Get logged in user details
    const getProfile = async (req, res) => {
    try {

        const userId = req.user.userId;

        const user = await User.findById(userId).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            user,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

//Google login
const googleLogin = async (req, res) => {
  try {
  const { idToken } = req.body;

  if (!idToken) {
    return res.status(400).json({
      success: false,
      message: "ID Token is required",
    });
  }

  const decodedToken = await firebase.auth.verifyIdToken(idToken);

  
  let user = await User.findOne({
    email: decodedToken.email,
  });

  
  if (!user) {
    user = await User.create({
      fullName: decodedToken.name,
      email: decodedToken.email,
      password: null,
      googleId: decodedToken.uid,
      profileImage: decodedToken.picture,
      authProvider: "google",
      isVerified: true,
    });
  }

  
  const token = generateToken(user._id, user.role);

  res.cookie("token", token, {
    httpOnly: true,
    secure: false, // true after deployment (HTTPS)
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    success: true,
    message: "Google Login Successful",
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      profileImage: user.profileImage,
      role: user.role,
    },
  });

} catch (error) {
  console.error(error);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
}
};

// Upload Profile Image
const uploadProfileImage = async (req, res) => {
  try {
    // Check if file exists
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image",
      });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "SkillMart/ProfileImages",
    });

    // Delete local image
    await fs.remove(req.file.path);

    // Update user profile image
    const updatedUser = await User.findByIdAndUpdate(
      req.user.userId,
      {
        profileImage: result.secure_url,
      },
      {
        new: true,
      }
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "Profile image uploaded successfully",
      profileImage: result.secure_url,
      user: updatedUser,
    });

  } catch (error) {
    console.error(error);

    // Remove local file even if upload fails
    if (req.file) {
      await fs.remove(req.file.path).catch(() => {});
    }

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Logout User
const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};
module.exports = {
  registerUser,
  verifyOTP,
  resendOTP,
  loginUser,
  logoutUser,
  getProfile,
  googleLogin,
  uploadProfileImage,
};
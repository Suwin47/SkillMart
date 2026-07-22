const User = require("../models/User");
const SellerRequest = require("../models/SellerRequest");

// Get all seller requests
exports.getSellerRequests = async (req, res) => {
  try {
    const requests = await SellerRequest.find()
      .populate("user", "fullName email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      requests,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Approve seller
exports.approveSeller = async (req, res) => {
  try {
    const { id } = req.params;

    const request = await SellerRequest.findById(id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

    request.status = "Approved";
    await request.save();

    await User.findByIdAndUpdate(request.user, {
      role: "seller",
    });

    res.status(200).json({
      success: true,
      message: "Seller approved successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Reject seller
exports.rejectSeller = async (req, res) => {
  try {
    const { id } = req.params;

    const request = await SellerRequest.findById(id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

    request.status = "Rejected";

    await request.save();

    res.status(200).json({
      success: true,
      message: "Seller request rejected.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
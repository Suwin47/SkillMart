const SellerRequest = require("../models/SellerRequest");

// Create Seller Request
exports.createSellerRequest = async (req, res) => {
  try {
    const { businessName, about } = req.body;

    if (!businessName || !about) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingRequest = await SellerRequest.findOne({
      user: req.user.userId,
    });

    if (existingRequest) {
      return res.status(400).json({
        success: false,
        message: "You have already submitted a seller request.",
      });
    }

    const request = await SellerRequest.create({
      user: req.user.userId,
      businessName,
      about,
    });

    res.status(201).json({
      success: true,
      message: "Seller request submitted successfully.",
      request,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Get Current User Seller Request
exports.getSellerRequest = async (req, res) => {
  try {
    const request = await SellerRequest.findOne({
      user: req.user.userId,
    });

    res.status(200).json({
      success: true,
      request,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
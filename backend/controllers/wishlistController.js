const Wishlist = require("../models/Wishlist");

// Toggle Wishlist
const toggleWishlist = async (req, res) => {
  try {
    const { serviceId } = req.body;

    if (!serviceId) {
      return res.status(400).json({
        success: false,
        message: "Service ID is required",
      });
    }

    const existing = await Wishlist.findOne({
      buyer: req.user.userId,
      service: serviceId,
    });

    if (existing) {
      await existing.deleteOne();

      return res.status(200).json({
        success: true,
        wishlisted: false,
        message: "Removed from wishlist",
      });
    }

    await Wishlist.create({
      buyer: req.user.userId,
      service: serviceId,
    });

    res.status(201).json({
      success: true,
      wishlisted: true,
      message: "Added to wishlist",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Get My Wishlist
const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.find({
      buyer: req.user.userId,
    })
      .populate({
        path: "service",
        populate: {
          path: "seller",
          select: "fullName profileImage",
        },
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: wishlist.length,
      wishlist,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Check Wishlist Status
const checkWishlist = async (req, res) => {
  try {
    const { serviceId } = req.params;

    const exists = await Wishlist.findOne({
      buyer: req.user.userId,
      service: serviceId,
    });

    res.status(200).json({
      success: true,
      wishlisted: !!exists,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  toggleWishlist,
  getWishlist,
  checkWishlist,
};
const Review = require("../models/Review");
const Order = require("../models/Order");
const Service = require("../models/Service");

// ==========================
// Add Review
// ==========================
const addReview = async (req, res) => {
  try {
    const { serviceId, rating, comment } = req.body;

    if (!serviceId || !rating) {
      return res.status(400).json({
        success: false,
        message: "Service and rating are required.",
      });
    }

    // Check purchase
    const purchased = await Order.findOne({
      buyer: req.user.userId,
      service: serviceId,
      paymentStatus: "Paid",
    });

    if (!purchased) {
      return res.status(403).json({
        success: false,
        message:
          "Purchase this product before reviewing.",
      });
    }

    // Prevent duplicate review
    const existing = await Review.findOne({
      buyer: req.user.userId,
      service: serviceId,
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "You already reviewed this product.",
      });
    }

    await Review.create({
      buyer: req.user.userId,
      service: serviceId,
      rating,
      comment,
    });

    // Update average rating
    const reviews = await Review.find({
      service: serviceId,
    });

    const totalRating = reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );

    const averageRating =
      totalRating / reviews.length;

    await Service.findByIdAndUpdate(
      serviceId,
      {
        rating: averageRating,
        totalReviews: reviews.length,
      }
    );

    res.status(201).json({
      success: true,
      message: "Review submitted successfully.",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};

// ==========================
// Get Reviews
// ==========================
const getReviews = async (req, res) => {
  try {

    const reviews = await Review.find({
      service: req.params.serviceId,
    })
      .populate(
        "buyer",
        "fullName profileImage"
      )
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      total: reviews.length,
      reviews,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};

module.exports = {
  addReview,
  getReviews,
};
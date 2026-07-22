const Review = require("../models/Review");
const Service = require("../models/Service");

// Create Review
const createReview = async (req, res) => {
  try {
    const { serviceId, rating, comment } = req.body;

    if (!serviceId || !rating) {
      return res.status(400).json({
        success: false,
        message: "Service and rating are required.",
      });
    }

    // Check service exists
    const service = await Service.findById(serviceId);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found.",
      });
    }

    // Prevent duplicate review
    const alreadyReviewed = await Review.findOne({
      service: serviceId,
      buyer: req.user.userId,
    });

    if (alreadyReviewed) {
      return res.status(400).json({
        success: false,
        message: "You already reviewed this product.",
      });
    }

    // Create review
    await Review.create({
      service: serviceId,
      buyer: req.user.userId,
      rating,
      comment,
    });

    // Update rating
    const reviews = await Review.find({
      service: serviceId,
    });

    service.totalReviews = reviews.length;

    service.rating =
      reviews.reduce((sum, review) => sum + review.rating, 0) /
      reviews.length;

    await service.save();

    res.status(201).json({
      success: true,
      message: "Review added successfully.",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Get Reviews
const getReviews = async (req, res) => {
  try {

    const reviews = await Review.find({
      service: req.params.serviceId,
    })
      .populate("buyer", "fullName profileImage")
      .sort({ createdAt: -1 });

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
  createReview,
  getReviews,
};
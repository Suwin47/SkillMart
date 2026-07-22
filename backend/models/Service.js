const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "UI Kit",
        "React Component",
        "Template",
        "Source Code",
        "E-book",
        "Course",
        "Icons",
        "Design Asset",
        "Other",
      ],
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    thumbnail: {
      type: String,
      default: "",
    },

    downloadUrl: {
      type: String,
      required: true,
    },

    inStock: {
      type: Boolean,
      default: true,
    },

    rating: {
      type: Number,
      default: 0,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },

    totalSales: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Service", serviceSchema);
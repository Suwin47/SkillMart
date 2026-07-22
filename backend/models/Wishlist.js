const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema(
  {
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate wishlist entries
wishlistSchema.index(
  { buyer: 1, service: 1 },
  { unique: true }
);

module.exports = mongoose.model("Wishlist", wishlistSchema);
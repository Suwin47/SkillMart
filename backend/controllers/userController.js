const User = require("../models/User");
const Service = require("../models/Service");

exports.getTopSellers = async (req, res) => {
  try {
    const sellers = await User.find({
      role: "seller",
    }).select(
      "fullName profileImage bio isVerified"
    );

    const result = await Promise.all(
      sellers.map(async (seller) => {
        const products = await Service.countDocuments({
          seller: seller._id,
        });

        const services = await Service.find({
          seller: seller._id,
        });

        let totalRating = 0;

        services.forEach((service) => {
          totalRating += service.rating || 0;
        });

        const avgRating =
          services.length > 0
            ? (totalRating / services.length).toFixed(1)
            : 0;

        return {
          _id: seller._id,
          fullName: seller.fullName,
          profileImage: seller.profileImage,
          bio: seller.bio,
          isVerified: seller.isVerified,
          products,
          rating: Number(avgRating),
        };
      })
    );

    result.sort((a, b) => b.rating - a.rating);

    res.json(result.slice(0, 4));
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server Error",
    });
  }
};
const Service = require("../models/Service");
const Order = require("../models/Order");

const getSellerDashboard = async (req, res) => {
  try {
    const sellerId = req.user.userId;

    // Total Products
    const totalProducts = await Service.countDocuments({
      seller: sellerId,
    });

    // Total Orders
     const totalOrders = await Order.countDocuments({
  seller: sellerId,
});

    // Revenue
    const revenueData = await Order.aggregate([
      {
        $match: {
          seller: sellerId,
          paymentStatus: "Paid",
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$amount",
          },
        },
      },
    ]);

    const totalRevenue =
      revenueData.length > 0
        ? revenueData[0].totalRevenue
        : 0;

    // Average Order Value
    const averageOrderValue =
      totalOrders > 0
        ? Math.round(totalRevenue / totalOrders)
        : 0;

    // Paid Orders
    const paidOrders = await Order.countDocuments({
      seller: sellerId,
      paymentStatus: "Paid",
    });

    // Pending Orders
    const pendingOrders = await Order.countDocuments({
      seller: sellerId,
      paymentStatus: "Pending",
    });

    // Recent Orders
    const recentOrders = await Order.find({
      seller: sellerId,
    })
      .populate("buyer", "fullName email profileImage")
      .populate(
        "service",
        "title thumbnail category price"
      )
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,

      stats: {
  totalProducts,
  totalOrders,
  totalRevenue,
  averageOrderValue,

  paidOrders,
  pendingOrders,
},

      recentOrders,
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
  getSellerDashboard,
};
const User = require("../models/User");
const Service = require("../models/Service");
const Order = require("../models/Order");

const getAnalytics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Service.countDocuments();
    const totalOrders = await Order.countDocuments();

    const paidOrders = await Order.find({
      paymentStatus: "Paid",
    });

    const totalRevenue = paidOrders.reduce(
      (sum, order) => sum + order.amount,
      0
    );

    res.json({
      stats: {
        revenue: totalRevenue,
        orders: totalOrders,
        users: totalUsers,
        products: totalProducts,
      },
      monthlyRevenue: [],
      orderStatus: [],
      topProducts: [],
      topSellers: [],
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  getAnalytics,
};
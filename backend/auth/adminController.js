const User = require("../models/User");
const SellerRequest = require("../models/SellerRequest");
const Service = require("../models/Service");
const Order = require("../models/Order");

// ======================================
// Get All Seller Requests
// ======================================

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

// ======================================
// Approve Seller
// ======================================

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

// ======================================
// Reject Seller
// ======================================

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

// ======================================
// Admin Dashboard
// ======================================

exports.getDashboard = async (req, res) => {
  try {

    // Dashboard Stats

    const totalUsers = await User.countDocuments();

    const totalProducts = await Service.countDocuments();

    const totalOrders = await Order.countDocuments();

    const totalSellers = await User.countDocuments({
      role: "seller",
    });

    const totalBuyers = await User.countDocuments({
      role: "buyer",
    });

    // Revenue

    const revenue = await Order.aggregate([
      {
        $match: {
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
      revenue.length > 0
        ? revenue[0].totalRevenue
        : 0;

    // Recent Users

    const recentUsers = await User.find()
      .select(
        "fullName email role profileImage createdAt"
      )
      .sort({ createdAt: -1 })
      .limit(5);

    // Recent Orders

    const recentOrders = await Order.find()
      .populate(
        "buyer",
        "fullName profileImage"
      )
      .populate(
        "seller",
        "fullName profileImage"
      )
      .populate(
        "service",
        "title price thumbnail"
      )
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,

      stats: {
        totalUsers,
        totalProducts,
        totalOrders,
        totalRevenue,
        totalSellers,
        totalBuyers,
      },

      recentUsers,

      recentOrders,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};
// ======================================
// Get All Users
// ======================================

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: users.length,
      users,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};

// ======================================
// Delete User
// ======================================

exports.deleteUser = async (req, res) => {
  try {

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Prevent deleting another admin
    if (user.role === "admin") {
      return res.status(400).json({
        success: false,
        message: "Cannot delete an admin account.",
      });
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully.",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};
// ======================================
// Get All Products
// ======================================

exports.getProducts = async (req, res) => {
  try {

    const products = await Service.find()
      .populate("seller", "fullName email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: products.length,
      products,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};

// ======================================
// Delete Product
// ======================================

exports.deleteProduct = async (req, res) => {
  try {

    const product = await Service.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    await Service.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully.",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};
// ======================================
// Get All Orders
// ======================================

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("buyer", "fullName email profileImage")
      .populate("seller", "fullName email profileImage")
      .populate("service", "title thumbnail price category")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: orders.length,
      orders,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};

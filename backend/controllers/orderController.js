const Order = require("../models/Order");
const Service = require("../models/Service");
const Notification = require("../models/Notification");
const crypto = require("crypto");
const razorpay = require("../config/razorpay");

// Create Order
const createOrder = async (req, res) => {
  try {
    const { serviceId } = req.body;

    if (!serviceId) {
      return res.status(400).json({
        success: false,
        message: "Service ID is required.",
      });
    }

    // Check service
    const service = await Service.findById(serviceId);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found.",
      });
    }

    // Prevent buying own product
    if (service.seller.toString() === req.user.userId) {
      return res.status(400).json({
        success: false,
        message: "You cannot purchase your own product.",
      });
    }
// Check if user already purchased
const existingOrder = await Order.findOne({
  buyer: req.user.userId,
  service: service._id,
  paymentStatus: "Paid",
});

if (existingOrder) {
  return res.status(400).json({
    success: false,
    message: "You already purchased this product.",
  });
}

// Check if there's already a pending order
const existingPending = await Order.findOne({
  buyer: req.user.userId,
  service: service._id,
  paymentStatus: "Pending",
});

if (existingPending) {
  return res.status(200).json({
    success: true,
    order: existingPending,
  });
}
    const order = await Order.create({
      buyer: req.user.userId,
      seller: service.seller,
      service: service._id,
      amount: service.price,
    });

    res.status(201).json({
      success: true,
      message: "Order created successfully.",
      order,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Get My Orders
const getMyOrders = async (req, res) => {
  try {

    const orders = await Order.find({
      buyer: req.user.userId,
    })
      .populate("service")
      .populate("seller", "fullName profileImage");

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

// Get Seller Orders
const getSellerOrders = async (req, res) => {
  try {
    console.log("Logged-in Seller:", req.user.userId);
    const orders = await Order.find({
      seller: req.user.userId,
    })
      .populate("buyer", "fullName email profileImage")
      .populate("service", "title thumbnail category price")
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

// Get Single Order
const getSingleOrder = async (req, res) => {
  try {

    const order = await Order.findById(req.params.id)
      .populate("buyer", "fullName email")
      .populate("seller", "fullName email")
      .populate("service");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};

//Razorpay Order Creation
const createRazorpayOrder = async (req, res) => {
  try {

    const { orderId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const options = {
      amount: order.amount * 100, // paise
      currency: "INR",
      receipt: order._id.toString(),
    };

    const razorpayOrder = await razorpay.orders.create(options);

    order.razorpayOrderId = razorpayOrder.id;
    await order.save();

    res.status(200).json({
      success: true,
      razorpayOrder,
      key: process.env.RAZORPAY_KEY_ID,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Verify Razorpay Payment
const verifyPayment = async (req, res) => {
  console.log("Payment verification started");
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const body =
      razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    const order = await Order.findOne({
      razorpayOrderId: razorpay_order_id,
    });
    

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
if (order.paymentStatus !== "Paid") {
    order.paymentStatus = "Paid";
    order.orderStatus = "Completed";
    order.razorpayPaymentId = razorpay_payment_id;
    order.razorpaySignature = razorpay_signature;

    await order.save();
  
    // Increase total sales
    await Service.findByIdAndUpdate(order.service, {
      $inc: { totalSales: 1 },
    });
    }
  

    // Seller Notification
    await Notification.create({
      user: order.seller,
      title: "New Order Received",
      message: `You received a payment of ₹${order.amount}.`,
      type: "order",
    });
    

    // Buyer Notification
    await Notification.create({
      user: order.buyer,
      title: "Payment Successful",
      message: "Your payment was successful. Your product is now available.",
      type: "payment",
    });
    

    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//Check Purchase
const checkPurchase = async (req, res) => {
  try {
    const { serviceId } = req.params;

    const order = await Order.findOne({
      buyer: req.user.userId,
      service: serviceId,
      paymentStatus: "Paid",
    });

    res.json({
      success: true,
      purchased: !!order,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      purchased: false,
    });
  }
};
module.exports = {
  createOrder,
  getMyOrders,
  getSellerOrders,
  getSingleOrder,
  checkPurchase,
  createRazorpayOrder,
  verifyPayment,
};
const Cart = require("../models/Cart");
const Service = require("../models/Service");
const Order = require("../models/Order");
const Notification = require("../models/Notification");
const razorpay = require("../config/razorpay");
const crypto = require("crypto");

// ======================
// Add To Cart
// ======================
const addToCart = async (req, res) => {
  try {
    const { serviceId } = req.body;

    if (!serviceId) {
      return res.status(400).json({
        success: false,
        message: "Service ID is required.",
      });
    }

    const service = await Service.findById(serviceId);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found.",
      });
    }

    const existingItem = await Cart.findOne({
      user: req.user.userId,
      service: serviceId,
    });

    if (existingItem) {
      existingItem.quantity += 1;

      await existingItem.save();

      return res.status(200).json({
        success: true,
        message: "Cart quantity updated.",
        cart: existingItem,
      });
    }

    const cartItem = await Cart.create({
      user: req.user.userId,
      service: serviceId,
      quantity: 1,
    });

    res.status(201).json({
      success: true,
      message: "Added to cart.",
      cart: cartItem,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};

// ======================
// Get Cart
// ======================
const getCart = async (req, res) => {
  try {

    const cart = await Cart.find({
      user: req.user.userId,
    })
      .populate("service")
      .sort({ createdAt: -1 });

    const subtotal = cart.reduce(
      (total, item) =>
        total +
        item.service.price * item.quantity,
      0
    );

    res.status(200).json({
      success: true,
      totalItems: cart.length,
      subtotal,
      cart,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};

// ======================
// Update Quantity
// ======================
const updateCartQuantity = async (
  req,
  res
) => {
  try {

    const { quantity } = req.body;

    if (quantity < 1) {
      return res.status(400).json({
        success: false,
        message:
          "Quantity must be at least 1.",
      });
    }

    const cartItem =
      await Cart.findOneAndUpdate(
        {
          _id: req.params.id,
          user: req.user.userId,
        },
        {
          quantity,
        },
        {
          new: true,
        }
      ).populate("service");

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Quantity updated.",
      cart: cartItem,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};

// ======================
// Remove Item
// ======================
const removeFromCart = async (
  req,
  res
) => {
  try {

    const deleted =
      await Cart.findOneAndDelete({
        _id: req.params.id,
        user: req.user.userId,
      });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Item removed from cart.",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};

// ======================
// Clear Cart
// ======================
const clearCart = async (req, res) => {
  try {

    await Cart.deleteMany({
      user: req.user.userId,
    });

    res.status(200).json({
      success: true,
      message: "Cart cleared.",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};
//Checkout Cart
const checkoutCart = async (req, res) => {
  try {
    const cart = await Cart.find({
      user: req.user.userId,
    }).populate("service");

    if (!cart.length) {
      return res.status(400).json({
        success: false,
        message: "Your cart is empty.",
      });
    }

    const total = cart.reduce(
      (sum, item) => sum + item.service.price * item.quantity,
      0
    );

    console.log("========== CHECKOUT ==========");
    console.log("Total:", total);
    console.log("Key:", process.env.RAZORPAY_KEY_ID);
    console.log(
      "Secret Exists:",
      !!process.env.RAZORPAY_KEY_SECRET
    );

    const razorpayOrder = await razorpay.orders.create({
      amount: total * 100,
      currency: "INR",
      receipt: `cart_${Date.now()}`,
    });

    console.log("Order Created Successfully");
    console.log(razorpayOrder);

    res.status(200).json({
      success: true,
      total,
      razorpayOrder,
      key: process.env.RAZORPAY_KEY_ID,
    });

  } catch (error) {
    console.log("RAZORPAY ERROR");
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Unable to start checkout.",
    });
  }
};

//Verify Cart Payment
const verifyCartPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    // Verify Signature
    const body =
      razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET
      )
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed.",
      });
    }

    // Load Cart
    const cart = await Cart.find({
      user: req.user.userId,
    }).populate("service");

    if (!cart.length) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty.",
      });
    }

    // Create Orders
    for (const item of cart) {
      await Order.create({
        buyer: req.user.userId,
        seller: item.service.seller,
        service: item.service._id,
        amount: item.service.price * item.quantity,
        paymentStatus: "Paid",
        orderStatus: "Completed",
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
      });

      // Increase Sales
      await Service.findByIdAndUpdate(
        item.service._id,
        {
          $inc: {
            totalSales: item.quantity,
          },
        }
      );

      // Seller Notification
      await Notification.create({
        user: item.service.seller,
        title: "New Order Received",
        message: `You received an order for "${item.service.title}".`,
        type: "order",
      });
    }

    // Buyer Notification
    await Notification.create({
      user: req.user.userId,
      title: "Payment Successful",
      message:
        "Your payment was successful. Your products are now available.",
      type: "payment",
    });

    // Clear Cart
    await Cart.deleteMany({
      user: req.user.userId,
    });

    res.status(200).json({
      success: true,
      message: "Payment verified successfully.",
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
  addToCart,
  getCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
  checkoutCart,
  verifyCartPayment,
};
const Order = require("../models/Order");
const Service = require("../models/Service");

const downloadProduct = async (req, res) => {
  try {
    const { serviceId } = req.params;

    const order = await Order.findOne({
      buyer: req.user.userId,
      service: serviceId,
      paymentStatus: "Paid",
    }).populate("service");

    if (!order) {
      return res.status(403).json({
        success: false,
        message: "You haven't purchased this product.",
      });
    }

    if (!order.service) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    if (!order.service.downloadUrl) {
      return res.status(404).json({
        success: false,
        message: "Download file not available.",
      });
    }

    // Increase download count
    await Service.findByIdAndUpdate(serviceId, {
      $inc: {
        totalDownloads: 1,
      },
    });

    res.status(200).json({
      success: true,
      downloadUrl: order.service.downloadUrl,
      message: "Download started.",
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
  downloadProduct,
};
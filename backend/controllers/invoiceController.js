const PDFDocument = require("pdfkit");
const Order = require("../models/Order");

const generateInvoice = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId)
      .populate("buyer", "fullName email")
      .populate("seller", "fullName email")
      .populate("service", "title category");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (order.buyer._id.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const doc = new PDFDocument({
      margin: 50,
      size: "A4",
    });

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=SkillMart-Invoice-${order._id}.pdf`
    );

    doc.pipe(res);

    // ==========================
    // Header
    // ==========================

    doc
      .fillColor("#2563eb")
      .fontSize(30)
      .text("SkillMart", {
        align: "center",
      });

    doc
      .fillColor("black")
      .fontSize(18)
      .text("Digital Product Invoice", {
        align: "center",
      });

    doc.moveDown(2);

    // ==========================
    // Invoice Details
    // ==========================

    doc
      .fontSize(12)
      .font("Helvetica-Bold")
      .text("Invoice Details");

    doc.moveDown(0.5);

    doc
      .font("Helvetica")
      .text(`Invoice ID : ${order._id}`);

    doc.text(
      `Date : ${new Date(
        order.createdAt
      ).toLocaleString()}`
    );

    doc.text(
      `Payment Status : ${order.paymentStatus}`
    );

    doc.text(
      `Order Status : ${order.orderStatus}`
    );

    doc.moveDown();

    // ==========================
    // Buyer
    // ==========================

    doc
      .font("Helvetica-Bold")
      .text("Buyer");

    doc.font("Helvetica");

    doc.text(order.buyer.fullName);

    doc.text(order.buyer.email);

    doc.moveDown();

    // ==========================
    // Seller
    // ==========================

    doc
      .font("Helvetica-Bold")
      .text("Seller");

    doc.font("Helvetica");

    doc.text(order.seller.fullName);

    if (order.seller.email) {
      doc.text(order.seller.email);
    }

    doc.moveDown();

    // ==========================
    // Product
    // ==========================

    doc
      .font("Helvetica-Bold")
      .text("Product");

    doc.font("Helvetica");

    doc.text(
      `Title : ${order.service.title}`
    );

    doc.text(
      `Category : ${order.service.category}`
    );

    doc.moveDown();

    // ==========================
    // Amount Box
    // ==========================

    doc
      .roundedRect(
        50,
        doc.y,
        500,
        70,
        8
      )
      .stroke();

    doc.moveDown();

    doc
      .fontSize(15)
      .font("Helvetica-Bold")
      .text(
        `Amount Paid : ₹${order.amount}`,
        {
          align: "center",
        }
      );

    doc.moveDown(2);

    // ==========================
    // Footer
    // ==========================

    doc
      .fontSize(11)
      .fillColor("gray")
      .text(
        "Thank you for purchasing from SkillMart.",
        {
          align: "center",
        }
      );

    doc.text(
      "This invoice was generated automatically.",
      {
        align: "center",
      }
    );

    doc.moveDown();

    doc.text(
      "For support contact support@skillmart.com",
      {
        align: "center",
      }
    );

    doc.end();

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};

module.exports = {
  generateInvoice,
};
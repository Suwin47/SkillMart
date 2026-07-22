const Service = require("../models/Service");
const cloudinary = require("../config/cloudinary");
const fs = require("fs-extra");

const createService = async (req, res) => {
   
  try {
    const {
      title,
      description,
      category,
      price,
      downloadUrl,
    } = req.body;

    // Validate required fields
    if (!title || !description || !category || !price || !downloadUrl) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Thumbnail image is required.",
      });
    }

    // Upload thumbnail to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "SkillMart/Services",
    });

    // Delete local temp file
    await fs.remove(req.file.path);

    // Create service
    const service = await Service.create({
      seller: req.user.userId,
      title,
      description,
      category,
      price,
      thumbnail: result.secure_url,
      downloadUrl,
    });

    res.status(201).json({
      success: true,
      message: "Service created successfully",
      service,
    });

  } catch (error) {

    if (req.file) {
      await fs.remove(req.file.path).catch(() => {});
    }

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


// Get All Services
const getAllServices = async (req, res) => {
  try {
    const services = await Service.find()
      .populate("seller", "fullName profileImage")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: services.length,
      services,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Get Logged-in Seller Products
const getMyProducts = async (req, res) => {
  try {
    const products = await Service.find({
      seller: req.user.userId,
    }).sort({ createdAt: -1 });

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


// Get Single Service
const getSingleService = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findById(id)
      .populate("seller", "fullName profileImage");

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.status(200).json({
      success: true,
      service,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Update Service
const updateService = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findById(id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    // Only the owner can update
    if (service.seller.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this service.",
      });
    }

    // Update thumbnail if a new one is uploaded
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "SkillMart/Services",
      });

      await fs.remove(req.file.path);

      service.thumbnail = result.secure_url;
    }

    // Update other fields
    service.title = req.body.title || service.title;
    service.description = req.body.description || service.description;
    service.category = req.body.category || service.category;
    service.price = req.body.price || service.price;
    service.downloadUrl = req.body.downloadUrl || service.downloadUrl;

    // Boolean field needs special handling
    if (req.body.inStock !== undefined) {
      service.inStock = req.body.inStock;
    }

    await service.save();

    res.status(200).json({
      success: true,
      message: "Service updated successfully",
      service,
    });

  } catch (error) {
    if (req.file) {
      await fs.remove(req.file.path).catch(() => {});
    }

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Delete Service
const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findById(id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    // Check ownership
    if (service.seller.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this service.",
      });
    }

    // Delete thumbnail from Cloudinary
    try {
      const imageUrl = service.thumbnail;

      const publicId = imageUrl
        .split("/")
        .slice(-2)
        .join("/")
        .split(".")[0];

      await cloudinary.uploader.destroy(publicId);
    } catch (err) {
      console.log("Cloudinary image delete skipped.");
    }

    await service.deleteOne();

    res.status(200).json({
      success: true,
      message: "Service deleted successfully",
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
  createService,
  getAllServices,
  getMyProducts,
  getSingleService,
  updateService,
  deleteService,
};
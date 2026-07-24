const Service = require("../models/Service");
const cloudinary = require("../config/cloudinary");
const fs = require("fs-extra");

// ================= CREATE SERVICE =================
const createService = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      price,
    } = req.body;

    if (
      !title ||
      !description ||
      !category ||
      !price
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    if (!req.files?.thumbnail?.[0]) {
      return res.status(400).json({
        success: false,
        message: "Thumbnail is required.",
      });
    }

    if (!req.files?.productFile?.[0]) {
      return res.status(400).json({
        success: false,
        message: "Product file is required.",
      });
    }

    // Upload thumbnail to Cloudinary
    const thumbnailUpload = await cloudinary.uploader.upload(
      req.files.thumbnail[0].path,
      {
        folder: "SkillMart/Services",
      }
    );

    // Remove temporary thumbnail
    await fs.remove(req.files.thumbnail[0].path);

    // Product file stored locally
    const productFile = req.files.productFile[0];

    const downloadUrl =
      `${req.protocol}://${req.get("host")}/uploads/products/${productFile.filename}`;

    const service = await Service.create({
      seller: req.user.userId,

      title,
      description,
      category,
      price,

      thumbnail: thumbnailUpload.secure_url,

      downloadUrl,

      fileName: productFile.originalname,

      fileSize: productFile.size,
    });

    res.status(201).json({
      success: true,
      message: "Service created successfully.",
      service,
    });

  } catch (error) {

    if (req.files?.thumbnail?.[0]) {
      await fs.remove(req.files.thumbnail[0].path).catch(() => {});
    }

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ================= GET ALL SERVICES =================
const getAllServices = async (req, res) => {
  try {
    const {
      search = "",
      category,
      minPrice,
      maxPrice,
      sort = "latest",
      page = 1,
      limit = 9,
    } = req.query;

    const query = {};

    if (search) {
      query.title = {
        $regex: search,
        $options: "i",
      };
    }

    if (category && category !== "All") {
      query.category = category;
    }

    if (minPrice || maxPrice) {
      query.price = {};

      if (minPrice) query.price.$gte = Number(minPrice);

      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    let sortOption = { createdAt: -1 };

    if (sort === "priceLow")
      sortOption = { price: 1 };

    if (sort === "priceHigh")
      sortOption = { price: -1 };

    if (sort === "rating")
      sortOption = { rating: -1 };

    const total = await Service.countDocuments(query);

    const services = await Service.find(query)
      .populate(
        "seller",
        "fullName profileImage"
      )
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      services,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
      total,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};

// ================= GET MY PRODUCTS =================
const getMyProducts = async (req, res) => {
  try {
    const products = await Service.find({
      seller: req.user.userId,
    }).sort({
      createdAt: -1,
    });

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

// ================= GET SINGLE SERVICE =================
const getSingleService = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findById(id)
      .populate(
        "seller",
        "fullName profileImage"
      );

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

// ================= GET RELATED SERVICES =================
const getRelatedProducts = async (req, res) => {
  try {
    const { id } = req.params;

    // Current product
    const currentProduct = await Service.findById(id);

    if (!currentProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Same category, excluding current product
    const relatedProducts = await Service.find({
      category: currentProduct.category,
      _id: { $ne: id },
    })
      .populate("seller", "fullName profileImage")
      .limit(4);

    res.status(200).json({
      success: true,
      products: relatedProducts,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ================= UPDATE SERVICE =================
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

    if (
      service.seller.toString() !==
      req.user.userId
    ) {
      return res.status(403).json({
        success: false,
        message:
          "You are not authorized to update this service.",
      });
    }

    if (req.file) {
      const result =
        await cloudinary.uploader.upload(
          req.file.path,
          {
            folder: "SkillMart/Services",
          }
        );

      await fs.remove(req.file.path);

      service.thumbnail =
        result.secure_url;
    }

    service.title =
      req.body.title || service.title;

    service.description =
      req.body.description ||
      service.description;

    service.category =
      req.body.category ||
      service.category;

    service.price =
      req.body.price || service.price;

    service.downloadUrl =
      req.body.downloadUrl ||
      service.downloadUrl;

    if (
      req.body.inStock !== undefined
    ) {
      service.inStock =
        req.body.inStock;
    }

    await service.save();

    res.status(200).json({
      success: true,
      message:
        "Service updated successfully",
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

// ================= DELETE SERVICE =================
const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    const service =
      await Service.findById(id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    if (
      service.seller.toString() !==
      req.user.userId
    ) {
      return res.status(403).json({
        success: false,
        message:
          "You are not authorized to delete this service.",
      });
    }

    try {
      const imageUrl =
        service.thumbnail;

      const publicId = imageUrl
        .split("/")
        .slice(-2)
        .join("/")
        .split(".")[0];

      await cloudinary.uploader.destroy(
        publicId
      );

    } catch (err) {
      console.log(
        "Cloudinary image delete skipped."
      );
    }

    await service.deleteOne();

    res.status(200).json({
      success: true,
      message:
        "Service deleted successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ================= CATEGORY COUNTS =================

const getCategoryCounts = async (req, res) => {
  try {
    const counts = await Service.aggregate([
      {
        $group: {
          _id: "$category",
          total: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      counts,
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
  getRelatedProducts,
  getCategoryCounts,
  updateService,
  deleteService,
};
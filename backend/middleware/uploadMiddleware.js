const multer = require("multer");
const path = require("path");
const fs = require("fs");

// ============================
// Create Upload Folders
// ============================

const thumbnailDir = "uploads/thumbnails";
const productDir = "uploads/products";
const profileDir = "uploads/profile";

if (!fs.existsSync(thumbnailDir)) {
  fs.mkdirSync(thumbnailDir, { recursive: true });
}

if (!fs.existsSync(productDir)) {
  fs.mkdirSync(productDir, { recursive: true });
}

if (!fs.existsSync(profileDir)) {
  fs.mkdirSync(profileDir, { recursive: true });
}

// ============================
// Storage
// ============================

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "thumbnail") {
      cb(null, thumbnailDir);

    } else if (file.fieldname === "profileImage") {
      cb(null, profileDir);

    } else if (file.fieldname === "productFile") {
      cb(null, productDir);

    } else {
      cb(new Error("Invalid upload field"));
    }
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

// ============================
// File Filter
// ============================

const fileFilter = (req, file, cb) => {

  // Thumbnail & Profile Image
  if (
    file.fieldname === "thumbnail" ||
    file.fieldname === "profileImage"
  ) {
    const allowedImages = [
      ".jpg",
      ".jpeg",
      ".png",
      ".webp",
    ];

    const ext = path
      .extname(file.originalname)
      .toLowerCase();

    if (
      file.mimetype.startsWith("image/") &&
      allowedImages.includes(ext)
    ) {
      return cb(null, true);
    }

    return cb(
      new Error(
        "Only JPG, JPEG, PNG and WEBP images are allowed."
      )
    );
  }

  // Product File
  if (file.fieldname === "productFile") {

    const allowedFiles = [
      ".zip",
      ".rar",
      ".pdf",
      ".fig",
      ".apk",
      ".sql",
      ".docx",
      ".pptx",
      ".xlsx",
    ];

    const ext = path
      .extname(file.originalname)
      .toLowerCase();

    if (allowedFiles.includes(ext)) {
      return cb(null, true);
    }

    return cb(
      new Error(
        "Only ZIP, RAR, PDF, FIG, APK, SQL, DOCX, PPTX and XLSX files are allowed."
      )
    );
  }

  cb(new Error("Invalid upload field"));
};

// ============================
// Multer
// ============================

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 200 * 1024 * 1024, // 200MB
  },
});

module.exports = upload;
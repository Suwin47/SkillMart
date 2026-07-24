const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    const exists = await User.findOne({
      email: "admin@skillmart.com",
    });

    if (exists) {
      console.log("Admin already exists.");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash(
      "Admin@123",
      10
    );

    await User.create({
      fullName: "SkillMart Admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "admin",
      isVerified: true,
      isActive: true,
    });

    console.log("Admin account created successfully.");
    process.exit();
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());


app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "SkillMart Backend is running..."
    });
});

module.exports = app;
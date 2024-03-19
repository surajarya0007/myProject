const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin");
const Photo = require("../models/Photo");
const SECRET_KEY = "XYZ";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY); // Replace with your actual secret key
    req.user = decodedToken; // Attach the decoded token payload to req.user
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

// Define the '/admin/signup' route for admin registration
router.post("/admin/signup", async (req, res) => {
  try {
    const { email, password, side, username } = req.body;
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ message: "Admin with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      username,
      email,
      password: hashedPassword,
      side,
    });

    console.log(newAdmin);
    await newAdmin.save();

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    console.error("Admin Signup error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password, side } = req.body;

    let user;

    user = await Admin.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(402).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ email: user.email, side: user.side }, SECRET_KEY, {
      expiresIn: "24h",
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/like/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    let photo = await Photo.findOne({ driveFileId: id });

    if (!photo) {
      photo = new Photo({
        driveFileId: id,
        user: [userId],
      });
    } else {
      const index = photo.user.indexOf(userId);
      if (index !== -1) {
        photo.user.splice(index, 1);
      } else {
        photo.user.push(userId);
      }
    }
    await photo.save();

    res.status(200).send("Liked photo successfully");
  } catch (error) {
    console.error("Error liking photo:", error);
    res.status(500).send("Error liking photo");
  }
});

router.get("/totalLikes/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const photo = await Photo.findOne({ driveFileId: id });

    if (!photo) {
      return res.status(200).json({ userExists: false, userSize: 0 });
    }

    const { userId } = req.query;
    const userExists = photo.user.includes(userId);
    const userSize = photo.user.length;

    res.status(200).json({ userExists, userSize });
  } catch (error) {
    console.error("Error finding photo:", error);
    res.status(500).send("Error finding photo");
  }
});

module.exports = router;

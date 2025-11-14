// routes/userRoutes.js
const express = require("express");
const User = require("../models/User");

const router = express.Router();

// Create User API - POST /api/users
router.post("/", async (req, res) => {
  try {
    const { name, email, age } = req.body;

    // Check required fields
    if (!name || !email) {
      return res.status(400).json({ message: "Name and Email are required" });
    }

    // Create user
    const newUser = new User({ name, email, age });

    await newUser.save();

    res.status(201).json(newUser); // Success Response
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate Email Error
      return res.status(400).json({ message: "Email already exists" });
    }

    res.status(500).json({ message: "Server Error", error });
  }
});

module.exports = router;

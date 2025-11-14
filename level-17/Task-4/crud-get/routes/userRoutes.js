const express = require("express");
const User = require("../models/User");

const router = express.Router();

// GET All Users with filter and pagination
router.get("/", async (req, res) => {
  try {
    const { name, email, page = 1, limit = 5 } = req.query;

    const query = {};
    if (name) query.name = { $regex: name, $options: "i" };
    if (email) query.email = { $regex: email, $options: "i" };

    const users = await User.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// GET User by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: "Invalid User ID" });
  }
});

module.exports = router;

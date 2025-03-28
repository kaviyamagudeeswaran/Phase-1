const express = require("express");
const router = express.Router();

// Route to handle dynamic user ID
router.get("/:id", (req, res) => {
  const userId = req.params.id; // Extract user ID from URL
  res.send(`User ID: ${userId}`);
});

module.exports = router;

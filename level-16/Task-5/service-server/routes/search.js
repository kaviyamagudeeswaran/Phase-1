const express = require("express");
const router = express.Router();

// Route to handle search query parameters
router.get("/", (req, res) => {
  const query = req.query.q || "Nothing"; 
  const limit = req.query.limit || 5; 
  res.send(`Search for: ${query}, Limit: ${limit}`);
});

module.exports = router;

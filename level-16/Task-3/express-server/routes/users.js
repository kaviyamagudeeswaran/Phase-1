const express = require("express");
const router = express.Router();

// Sample user data
const users = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com" },
  { id: 2, name: "Bob Smith", email: "bob@example.com" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
];

// Route to get users
router.get("/", (req, res) => {
  res.json(users);
});

module.exports = router;

const express = require("express");
const app = express();
const PORT = 3000;

// Define the /search route with query parameters
app.get("/search", (req, res) => {
  const { q, limit } = req.query;

  // If 'q' is missing, return an error message
  if (!q) {
    return res.status(400).send("Error: 'q' query parameter is required");
  }

  // Set a default value for 'limit' if not provided
  const limitValue = limit ? limit : 5;

  res.send(`Search for: ${q}, Limit: ${limitValue}`);
});

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the Express Server");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

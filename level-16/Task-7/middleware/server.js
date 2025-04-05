const express = require("express");
const app = express();
const PORT = 3000;

// Custom Middleware for Logging
const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.url;

  console.log(`[${timestamp}] ${method} ${url}`);

  next(); // Move to next
};

// Apply Middleware
app.use(requestLogger);

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to Home Page");
});

app.get("/about", (req, res) => {
  res.send("About Page");
});

app.get("/contact", (req, res) => {
  res.send("Contact Page");
});

// Server Listen
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

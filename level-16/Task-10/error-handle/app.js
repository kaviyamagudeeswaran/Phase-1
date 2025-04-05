const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

// Middleware to serve static files
app.use(express.static("public"));

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to Error Handling Example!");
});

// Route that throws manual error
app.get("/error", (req, res, next) => {
  const err = new Error("Manual Error Triggered!");
  err.status = 500;
  next(err);
});

// Route that accesses non-existent resource
app.get("/product/:id", (req, res, next) => {
  const product = null; // Assuming product not found
  if (!product) {
    const err = new Error("Product Not Found!");
    err.status = 404;
    next(err);
  }
  res.send(product);
});

// 404 Error Middleware
app.use((req, res, next) => {
  res.status(404);
  // Check for API or HTML request
  if (req.originalUrl.startsWith("/api")) {
    res.json({ error: "API Route Not Found" });
  } else {
    res.sendFile(path.join(__dirname, "public", "error.html"));
  }
});

// Global Error Handler Middleware
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode);

  // For API Routes
  if (req.originalUrl.startsWith("/api")) {
    res.json({
      message: err.message,
      stack: process.env.NODE_ENV === "development" ? err.stack : {},
    });
  }
  // For HTML Routes
  else {
    res.send(`
      <h1>Error: ${err.message}</h1>
      ${process.env.NODE_ENV === "development" ? `<pre>${err.stack}</pre>` : ""}
    `);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

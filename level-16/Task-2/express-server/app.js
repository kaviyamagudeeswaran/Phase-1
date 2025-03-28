const express = require("express");
const path = require("path");

const app = express();

// Serve static files (CSS)
app.use(express.static(path.join(__dirname, "public")));

// Import routes
const homeRoutes = require("./routes/home");
const aboutRoutes = require("./routes/about");
const contactRoutes = require("./routes/contact");
const servicesRoutes = require("./routes/services");

// Use routes
app.use("/", homeRoutes);
app.use("/about", aboutRoutes);
app.use("/contact", contactRoutes);
app.use("/services", servicesRoutes);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

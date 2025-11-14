// Importing required modules
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

// Create an Express app
const app = express();

// Define Port
const PORT = 3000;

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((error) => {
    console.error("MongoDB Connection Failed:", error);
  });
app.get("/", (req, res) => {
  res.send("Connected to MongoDB!");
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

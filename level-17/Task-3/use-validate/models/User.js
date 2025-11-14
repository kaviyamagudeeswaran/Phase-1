// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // validation
  },
  email: {
    type: String,
    required: true,
    unique: true, // avoid duplicate emails
  },
  age: {
    type: Number,
    min: 18, // validation
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);

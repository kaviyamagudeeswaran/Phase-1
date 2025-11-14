const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  authors: [String],
  thumbnail: String,
});

module.exports = mongoose.model("Book", BookSchema);

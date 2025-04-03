const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
  title: String,
  link: String,
  description: String,
  pubDate: Date,
  source: String,
  read: { type: Boolean, default: false },
});

module.exports = mongoose.model("Article", ArticleSchema);

const mongoose = require("mongoose");

const JournalSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  tags: [String],
});

module.exports = mongoose.model("Journal", JournalSchema);

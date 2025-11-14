const mongoose = require("mongoose");

const CollectionSchema = new mongoose.Schema({
  sessionId: { type: String, required: true },
  book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
});

module.exports = mongoose.model("Collection", CollectionSchema);

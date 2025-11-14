const express = require("express");
const {
  addBook,
  getBooks,
  addToCollection,
  getCollection,
} = require("../controllers/bookController");
const router = express.Router();

router.post("/add", addBook); // Add a book
router.get("/", getBooks); // Get all books
router.post("/add-to-collection", addToCollection); // Add book to collection
router.get("/collection", getCollection); // Get user's collection

module.exports = router;

const Book = require("../models/Book");
const Collection = require("../models/Collection");

// Add a book to the database
exports.addBook = async (req, res) => {
  try {
    const { title, authors, thumbnail } = req.body;
    const book = new Book({ title, authors, thumbnail });
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all books
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a book to a user's collection (based on sessionId)
exports.addToCollection = async (req, res) => {
  try {
    const { bookId, sessionId } = req.body;

    if (!bookId || !sessionId) {
      return res
        .status(400)
        .json({ message: "bookId and sessionId are required" });
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const newCollection = new Collection({ sessionId, book: bookId });
    await newCollection.save();

    res
      .status(201)
      .json({ message: "Book added to collection", collection: newCollection });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all books from a user's collection
exports.getCollection = async (req, res) => {
  try {
    const { sessionId } = req.query;

    if (!sessionId) {
      return res.status(400).json({ message: "sessionId is required" });
    }

    const collection = await Collection.find({ sessionId }).populate("book");
    res.json(collection);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const express = require("express");
const Journal = require("../models/Journal");
const router = express.Router();

// 📌 Add a new journal entry
router.post("/", async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }

    const newJournal = new Journal({ title, content, tags });
    await newJournal.save();
    res.status(201).json(newJournal);
  } catch (err) {
    res.status(500).json({ message: "Server error: " + err.message });
  }
});

// 📌 Get all journal entries
router.get("/", async (req, res) => {
  try {
    const { search } = req.query;
    const query = search
      ? { $or: [{ title: new RegExp(search, "i") }, { tags: search }] }
      : {};
    const journals = await Journal.find(query);
    res.json(journals);
  } catch (err) {
    res.status(500).json({ message: "Server error: " + err.message });
  }
});

// 📌 Update a journal entry
router.put("/:id", async (req, res) => {
  try {
    const updatedJournal = await Journal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedJournal);
  } catch (err) {
    res.status(500).json({ message: "Server error: " + err.message });
  }
});

// 📌 Delete a journal entry
router.delete("/:id", async (req, res) => {
  try {
    await Journal.findByIdAndDelete(req.params.id);
    res.json({ message: "Journal deleted successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Server error: " + err.message });
  }
});

module.exports = router;

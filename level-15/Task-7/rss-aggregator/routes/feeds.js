const express = require("express");
const router = express.Router();
const Article = require("../models/Article");
const { fetchRSSFeed } = require("../services/rssService");

// Add a new RSS Feed URL and fetch articles
router.post("/fetch", async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "RSS Feed URL required" });

  try {
    const articles = await fetchRSSFeed(url);
    await Article.insertMany(articles, { ordered: false }).catch(() => {});
    res.json({ message: "✅ Articles fetched and saved!" });
  } catch (error) {
    res.status(500).json({ error: "❌ Failed to fetch feed" });
  }
});

// Get all articles
router.get("/articles", async (req, res) => {
  const articles = await Article.find();
  res.json(articles);
});

// Get unread articles
router.get("/articles/unread", async (req, res) => {
  const articles = await Article.find({ read: false });
  res.json(articles);
});

// Mark article as read
router.put("/articles/read/:id", async (req, res) => {
  await Article.findByIdAndUpdate(req.params.id, { read: true });
  res.json({ message: "✅ Article marked as read" });
});

module.exports = router;

const Post = require("../models/Post");
const User = require("../models/User");

// Create Post
exports.createPost = async (req, res) => {
  const { title, content, author } = req.body;
  try {
    const user = await User.findById(author);
    if (!user) return res.status(404).json({ message: "Author not found" });

    const post = await Post.create({ title, content, author });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Posts with Populate
exports.getPosts = async (req, res) => {
  const { author } = req.query;
  let filter = {};
  if (author) filter.author = author;

  try {
    const posts = await Post.find(filter).populate("author");
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Posts by User
exports.getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.params.id }).populate("author");
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

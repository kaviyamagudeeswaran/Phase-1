const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router.post("/", postController.createPost);
router.get("/", postController.getPosts);
router.get("/user/:id", postController.getUserPosts);

module.exports = router;

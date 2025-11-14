import type express from 'express';
import logger from '../utils/logger';
import { Comment } from '../models/comment';
import { Post } from '../models/post';

const getAllComments = (): express.RequestHandler => {
  const handler: express.RequestHandler = async (req, res, next) => {
    try {
      const postId = req.params.post_id;

      // Check if post exists
      const post = await Post.findById(postId);
      if (!post) {
        res.status(404).json({ error: 'Post not found' });
        return;
      }

      // Retrieve all comments for the post, ordered by created_at ascending
      const comments = await Comment.findByPostId(postId);

      // Sort comments by created_at in ascending order (oldest first)
      comments.sort((a, b) => a.created_at - b.created_at);

      // Map to response format
      const response = {
        comments: comments.map(comment => ({
          id: comment.id,
          post_id: comment.post_id,
          user_id: comment.user_id,
          content: comment.content,
          created_at: comment.created_at
        }))
      };

      res.status(200).json(response);
      return;
    } catch (e) {
      next(e);
    }
  };
  return handler;
};

export default getAllComments;

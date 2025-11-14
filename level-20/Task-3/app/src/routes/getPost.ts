import type express from 'express';
import logger from '../utils/logger';
import { Post } from '../models/post';

interface GetPostResponse {
  id: string;
  user_id: string;
  content: string;
  created_at: number;
  likes_count: number;
}

const getPost = (): express.RequestHandler => {
  const handler: express.RequestHandler = async (req, res, next) => {
    try {
      const postId = req.params.post_id;

      // Validate post_id parameter
      if (!postId) {
        res.status(400).json({ error: 'Post ID is required' });
        return;
      }

      // Retrieve the post from the database
      const post = await Post.findById(postId);

      // Check if post exists
      if (!post) {
        res.status(404).json({ error: 'Post not found' });
        return;
      }

      // Map to response format
      const response: GetPostResponse = {
        id: post.id,
        user_id: post.user_id,
        content: post.content,
        created_at: post.created_at,
        likes_count: post.likes_count,
      };

      res.status(200).json(response);
      return;
    } catch (e) {
      logger.error(`Error retrieving post: ${e}`);
      next(e);
    }
  };
  return handler;
};

export default getPost;

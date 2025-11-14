import type express from 'express';
import logger from '../utils/logger';
import { database } from '../utils/database';
import { Like } from '../models/like';
import { Post } from '../models/post';

interface UnlikePostResponse {
  success: boolean;
}

const unlikePost = (): express.RequestHandler => {
  const handler: express.RequestHandler = async (req, res, next) => {
    try {
      const postId = req.params.post_id;
      const userId = req.user?.id;

      // Validate post_id parameter
      if (!postId) {
        res.status(400).json({ error: 'Post ID is required' });
        return;
      }

      // Validate user authentication
      if (!userId) {
        res.status(401).json({ error: 'User not authenticated' });
        return;
      }

      // Check if the post exists
      const post = await Post.findById(postId);
      if (!post) {
        res.status(404).json({ error: 'Post not found' });
        return;
      }

      // Check if the like exists
      const like = await Like.findByPostIdAndUserId(postId, userId);
      if (!like) {
        res.status(400).json({ error: 'User has not liked this post' });
        return;
      }

      // Delete the like
      const deleted = await Like.deleteByPostIdAndUserId(postId, userId);
      if (!deleted) {
        res.status(400).json({ error: 'Failed to unlike post' });
        return;
      }

      // Decrement the likes_count on the post
      const newLikesCount = Math.max(0, post.likes_count - 1);
      const updatedPost = await Post.update(postId, {
        likes_count: newLikesCount
      });

      if (!updatedPost) {
        logger.warn(`Failed to decrement likes_count for post ${postId} after unlike`);
      }

      logger.info(`User ${userId} unliked post ${postId}`);

      const response: UnlikePostResponse = {
        success: true
      };

      res.status(200).json(response);
      return;
    } catch (e) {
      next(e);
    }
  };
  return handler;
};

export default unlikePost;

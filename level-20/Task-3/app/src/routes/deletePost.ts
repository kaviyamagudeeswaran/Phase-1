import type express from 'express';
import logger from '../utils/logger';
import { Post } from '../models/post';
import { database } from '../utils/database';

const deletePost = (): express.RequestHandler => {
  const handler: express.RequestHandler = async (req, res, next) => {
    try {
      const postId = req.params.post_id;
      const userId = req.user?.id;

      // Validate that user is authenticated
      if (!userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      // Validate post_id parameter
      if (!postId) {
        res.status(400).json({ error: 'Post ID is required' });
        return;
      }

      // Check if post exists
      const post = await Post.findById(postId);
      if (!post) {
        res.status(404).json({ error: 'Post not found' });
        return;
      }

      // Check if user is the owner or an admin
      const db = await database.getDb();
      const usersCollection = db.collection('users');
      const user = await usersCollection.findOne({ id: userId });

      if (!user) {
        res.status(401).json({ error: 'User not found' });
        return;
      }

      const isAdmin = user.is_admin === true;
      const isOwner = post.user_id === userId;

      if (!isOwner && !isAdmin) {
        res.status(403).json({ error: 'Forbidden: You do not have permission to delete this post' });
        return;
      }

      // Delete the post
      const deleted = await Post.delete(postId);

      if (!deleted) {
        res.status(500).json({ error: 'Failed to delete post' });
        return;
      }

      logger.info(`Post ${postId} deleted by user ${userId}`);

      res.status(200).json({ success: true });
      return;
    } catch (e) {
      next(e);
    }
  };
  return handler;
};

export default deletePost;

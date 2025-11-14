import type express from 'express';
import logger from '../utils/logger';
import { database } from '../utils/database';
import { Post } from '../models/post';
import { Like } from '../models/like';
import { randomUUID } from 'crypto';

interface LikePostResponse {
  id: string;
  post_id: string;
  user_id: string;
}

const likePost = (): express.RequestHandler => {
  const handler: express.RequestHandler = async (req, res, next) => {
    try {
      const postId = req.params.post_id;
      const userId = req.user?.id;

      // Validate user authentication
      if (!userId) {
        res.status(401).json({ error: 'User not authenticated' });
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

      // Check if user has already liked the post
      const existingLike = await Like.findByPostIdAndUserId(postId, userId);
      if (existingLike) {
        res.status(400).json({ error: 'User has already liked this post' });
        return;
      }

      // Generate a new like ID
      const likeId = randomUUID();

      // Create the new like
      const newLike = new Like(likeId, postId, userId);
      const createdLike = await Like.create(newLike);

      if (!createdLike) {
        throw new Error('Failed to create like');
      }

      // Increment the likes_count on the post
      const db = await database.getDb();
      await db.collection('posts').updateOne(
        { id: postId },
        { $inc: { likes_count: 1 } }
      );

      // Fetch the created like from the database to return
      const savedLike = await Like.findById(likeId);
      
      if (!savedLike) {
        throw new Error('Failed to retrieve created like');
      }

      const response: LikePostResponse = {
        id: savedLike.id,
        post_id: savedLike.post_id,
        user_id: savedLike.user_id,
      };

      res.status(201).json(response);
      return;
    } catch (e) {
      next(e);
    }
  };
  return handler;
};

export default likePost;

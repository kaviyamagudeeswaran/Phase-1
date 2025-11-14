import type express from 'express';
import logger from '../utils/logger';
import { Post } from '../models/post';
import { randomUUID } from 'crypto';

interface CreatePostRequest {
  content: string;
}

interface CreatePostResponse {
  id: string;
  user_id: string;
  content: string;
  created_at: number;
  likes_count: number;
}

const createPost = (): express.RequestHandler => {
  const handler: express.RequestHandler = async (req, res, next) => {
    try {
      const userId = req.user?.id;

      // Validate user authentication
      if (!userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const { content } = req.body as CreatePostRequest;

      // Validate content exists
      if (content === undefined || content === null) {
        res.status(400).json({ error: 'Content is required' });
        return;
      }

      // Validate content is a string
      if (typeof content !== 'string') {
        res.status(400).json({ error: 'Content must be a string' });
        return;
      }

      // Validate content is not empty
      if (content.trim().length === 0) {
        res.status(400).json({ error: 'Content cannot be empty' });
        return;
      }

      // Generate unique ID for the post
      const postId = randomUUID();

      // Get current timestamp in seconds (Unix epoch)
      const createdAt = Math.floor(Date.now() / 1000);

      // Initialize likes_count to zero
      const likesCount = 0;

      // Create post data
      const postData = {
        id: postId,
        user_id: userId,
        content: content,
        created_at: createdAt,
        likes_count: likesCount,
      };

      // Insert post into database
      const createdPost = await Post.create(postData);

      if (!createdPost) {
        throw new Error('Failed to create post');
      }

      // Fetch the post back from the database to ensure we return what was saved
      const savedPost = await Post.findById(postId);

      if (!savedPost) {
        throw new Error('Failed to retrieve created post');
      }

      // Return the created post with 201 status
      const response: CreatePostResponse = {
        id: savedPost.id,
        user_id: savedPost.user_id,
        content: savedPost.content,
        created_at: savedPost.created_at,
        likes_count: savedPost.likes_count,
      };

      res.status(201).json(response);
      return;
    } catch (e) {
      next(e);
    }
  };
  return handler;
};

export default createPost;

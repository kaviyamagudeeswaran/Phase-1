import type express from 'express';
import logger from '../utils/logger';
import { Post } from '../models/post';

interface UpdatePostRequest {
  content: string;
}

interface UpdatePostResponse {
  id: string;
  user_id: string;
  content: string;
  created_at: number;
  likes_count: number;
}

const updatePost = (): express.RequestHandler => {
  const handler: express.RequestHandler = async (req, res, next) => {
    try {
      const postId = req.params.post_id;
      const userId = req.user?.id;
      const { content } = req.body as UpdatePostRequest;

      // Validate user authentication
      if (!userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      // Validate post_id
      if (!postId) {
        res.status(400).json({ error: 'Post ID is required' });
        return;
      }

      // Validate content
      if (content === undefined || content === null) {
        res.status(400).json({ error: 'Content is required' });
        return;
      }

      if (typeof content !== 'string') {
        res.status(400).json({ error: 'Content must be a string' });
        return;
      }

      if (content.trim().length === 0) {
        res.status(400).json({ error: 'Content cannot be empty' });
        return;
      }

      // Check if post exists
      const existingPost = await Post.findById(postId);
      if (!existingPost) {
        res.status(404).json({ error: 'Post not found' });
        return;
      }

      // Check if user is the owner of the post
      if (existingPost.user_id !== userId) {
        res.status(403).json({ error: 'Forbidden: You are not the owner of this post' });
        return;
      }

      // Update the post
      const updatedPost = await Post.update(postId, { content });

      if (!updatedPost) {
        res.status(404).json({ error: 'Post not found' });
        return;
      }

      // Fetch the updated post from the database
      const fetchedPost = await Post.findById(postId);

      if (!fetchedPost) {
        res.status(404).json({ error: 'Post not found' });
        return;
      }

      const response: UpdatePostResponse = {
        id: fetchedPost.id,
        user_id: fetchedPost.user_id,
        content: fetchedPost.content,
        created_at: fetchedPost.created_at,
        likes_count: fetchedPost.likes_count,
      };

      res.status(200).json(response);
      return;
    } catch (e) {
      next(e);
    }
  };
  return handler;
};

export default updatePost;

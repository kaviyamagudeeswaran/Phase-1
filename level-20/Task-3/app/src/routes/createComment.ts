import type express from 'express';
import logger from '../utils/logger';
import { Comment } from '../models/comment';
import { Post } from '../models/post';

interface CreateCommentRequest {
  content: string;
}

interface CreateCommentResponse {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: number;
}

const createComment = (): express.RequestHandler => {
  const handler: express.RequestHandler = async (req, res, next) => {
    try {
      const post_id = req.params.post_id;
      const user_id = req.user?.id;
      const { content } = req.body as CreateCommentRequest;

      // Validate user authentication
      if (!user_id) {
        res.status(401).json({ error: 'User not authenticated' });
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
      const post = await Post.findById(post_id);
      if (!post) {
        res.status(404).json({ error: 'Post not found' });
        return;
      }

      // Create the comment
      const newComment = await Comment.create(post_id, user_id, content);

      // Fetch the created comment from the database to ensure we return what was saved
      const savedComment = await Comment.findById(newComment.id);
      
      if (!savedComment) {
        throw new Error('Failed to retrieve created comment');
      }

      const response: CreateCommentResponse = {
        id: savedComment.id,
        post_id: savedComment.post_id,
        user_id: savedComment.user_id,
        content: savedComment.content,
        created_at: savedComment.created_at,
      };

      res.status(201).json(response);
      return;
    } catch (e) {
      next(e);
    }
  };
  return handler;
};

export default createComment;

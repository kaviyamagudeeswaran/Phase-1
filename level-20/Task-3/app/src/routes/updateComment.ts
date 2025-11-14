import type express from 'express';
import logger from '../utils/logger';
import { Comment } from '../models/comment';

interface UpdateCommentRequest {
  content: string;
}

interface UpdateCommentResponse {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: number;
}

const updateComment = (): express.RequestHandler => {
  const handler: express.RequestHandler = async (req, res, next) => {
    try {
      const commentId = req.params.comment_id;
      const userId = req.user?.id;
      const { content } = req.body as UpdateCommentRequest;

      // Validate user authentication
      if (!userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      // Validate comment_id parameter
      if (!commentId) {
        res.status(400).json({ error: 'Comment ID is required' });
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

      // Check if comment exists
      const existingComment = await Comment.findById(commentId);
      
      if (!existingComment) {
        res.status(404).json({ error: 'Comment not found' });
        return;
      }

      // Check if the user is the owner of the comment
      if (existingComment.user_id !== userId) {
        res.status(403).json({ error: 'Forbidden: You are not the owner of this comment' });
        return;
      }

      // Update the comment
      const updatedComment = await Comment.update(commentId, { content });

      if (!updatedComment) {
        res.status(404).json({ error: 'Comment not found' });
        return;
      }

      // Fetch the updated comment from the database to ensure we return the latest data
      const finalComment = await Comment.findById(commentId);

      if (!finalComment) {
        res.status(404).json({ error: 'Comment not found after update' });
        return;
      }

      const response: UpdateCommentResponse = {
        id: finalComment.id,
        post_id: finalComment.post_id,
        user_id: finalComment.user_id,
        content: finalComment.content,
        created_at: finalComment.created_at,
      };

      res.status(200).json(response);
      return;
    } catch (e) {
      logger.error(`Error updating comment: ${e}`);
      next(e);
    }
  };
  return handler;
};

export default updateComment;

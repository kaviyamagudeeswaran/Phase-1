import type express from 'express';
import logger from '../utils/logger';
import { Comment } from '../models/comment';
import { database } from '../utils/database';

interface DeleteCommentResponse {
  success: boolean;
}

const deleteComment = (): express.RequestHandler => {
  const handler: express.RequestHandler = async (req, res, next) => {
    try {
      const commentId = req.params.comment_id;
      const userId = req.user?.id;

      // Validate that user is authenticated
      if (!userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      // Validate comment_id parameter
      if (!commentId) {
        res.status(400).json({ error: 'Comment ID is required' });
        return;
      }

      // Check if comment exists
      const comment = await Comment.findById(commentId);
      if (!comment) {
        res.status(404).json({ error: 'Comment not found' });
        return;
      }

      // Check if user is admin
      const db = await database.getDb();
      const userDoc = await db.collection('users').findOne({ id: userId });
      const isAdmin = userDoc?.is_admin === true;

      // Check authorization: user must be the owner or an admin
      if (comment.user_id !== userId && !isAdmin) {
        res.status(403).json({ error: 'Forbidden: You do not have permission to delete this comment' });
        return;
      }

      // Delete the comment
      const deleted = await Comment.delete(commentId);
      
      if (!deleted) {
        res.status(404).json({ error: 'Comment not found' });
        return;
      }

      logger.info(`Comment ${commentId} deleted by user ${userId}`);

      const response: DeleteCommentResponse = {
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

export default deleteComment;

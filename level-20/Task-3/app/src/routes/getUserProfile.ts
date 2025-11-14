import type express from 'express';
import logger from '../utils/logger';
import { User } from '../models/user';

const getUserProfile = (): express.RequestHandler => {
  const handler: express.RequestHandler = async (req, res, next) => {
    try {
      const userId = req.params.user_id;

      // Validate user_id parameter
      if (!userId) {
        res.status(400).json({ error: 'User ID is required' });
        return;
      }

      // Find user by ID
      const user = await User.findById(userId);

      // Check if user exists
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      // Map to response format
      const response = {
        id: user.id,
        username: user.username,
        bio: user.bio,
        skills: user.skills,
        profile_picture_url: user.profile_picture_url,
      };

      res.status(200).json(response);
      return;
    } catch (e) {
      logger.error('Error retrieving user profile:', e);
      next(e);
    }
  };
  return handler;
};

export default getUserProfile;

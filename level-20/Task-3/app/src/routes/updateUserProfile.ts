import type express from 'express';
import logger from '../utils/logger';
import { User } from '../models/user';

interface UpdateUserProfileRequest {
  username: string;
  bio: string;
  skills: string[];
  profile_picture_url: string;
}

interface UpdateUserProfileResponse {
  id: string;
  username: string;
  bio: string;
  skills: string[];
  profile_picture_url: string;
}

const updateUserProfile = (): express.RequestHandler => {
  const handler: express.RequestHandler = async (req, res, next) => {
    try {
      // Get user ID from JWT token
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      // Parse request body
      const { username, bio, skills, profile_picture_url } = req.body as UpdateUserProfileRequest;

      // Validate username
      if (username === undefined || username === null) {
        res.status(400).json({ error: 'Username is required' });
        return;
      }
      if (typeof username !== 'string') {
        res.status(400).json({ error: 'Username must be a string' });
        return;
      }
      if (username.trim().length === 0) {
        res.status(400).json({ error: 'Username cannot be empty' });
        return;
      }

      // Validate bio
      if (bio === undefined || bio === null) {
        res.status(400).json({ error: 'Bio is required' });
        return;
      }
      if (typeof bio !== 'string') {
        res.status(400).json({ error: 'Bio must be a string' });
        return;
      }

      // Validate skills
      if (skills === undefined || skills === null) {
        res.status(400).json({ error: 'Skills is required' });
        return;
      }
      if (!Array.isArray(skills)) {
        res.status(400).json({ error: 'Skills must be an array' });
        return;
      }
      for (const skill of skills) {
        if (typeof skill !== 'string') {
          res.status(400).json({ error: 'All skills must be strings' });
          return;
        }
      }

      // Validate profile_picture_url
      if (profile_picture_url === undefined || profile_picture_url === null) {
        res.status(400).json({ error: 'Profile picture URL is required' });
        return;
      }
      if (typeof profile_picture_url !== 'string') {
        res.status(400).json({ error: 'Profile picture URL must be a string' });
        return;
      }

      // Check if user exists
      const existingUser = await User.findById(userId);
      if (!existingUser) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      // Check if username is already taken by another user
      if (username !== existingUser.username) {
        const userWithSameUsername = await User.findByUsername(username);
        if (userWithSameUsername && userWithSameUsername.id !== userId) {
          res.status(400).json({ error: 'Username is already taken' });
          return;
        }
      }

      // Update user profile
      const updatedUser = await User.update(userId, {
        username,
        bio,
        skills,
        profile_picture_url,
      });

      if (!updatedUser) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      // Fetch the updated user from database
      const fetchedUser = await User.findById(userId);
      if (!fetchedUser) {
        res.status(404).json({ error: 'User not found after update' });
        return;
      }

      // Prepare response
      const response: UpdateUserProfileResponse = {
        id: fetchedUser.id,
        username: fetchedUser.username,
        bio: fetchedUser.bio,
        skills: fetchedUser.skills,
        profile_picture_url: fetchedUser.profile_picture_url,
      };

      logger.info(`User profile updated successfully for user ID: ${userId}`);
      res.status(200).json(response);
      return;
    } catch (e) {
      logger.error('Error updating user profile:', e);
      next(e);
    }
  };
  return handler;
};

export default updateUserProfile;

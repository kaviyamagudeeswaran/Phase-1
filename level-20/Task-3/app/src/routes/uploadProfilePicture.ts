import type express from 'express';
import logger from '../utils/logger';
import { database } from '../utils/database';
import { uploadFileToCdn, deleteFileFromCdn } from '../utils/utils';
import { User } from '../models/user';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

// Configure multer for file upload
const upload = multer({
  dest: '/tmp/uploads/',
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});

const uploadProfilePicture = (): express.RequestHandler => {
  const handler: express.RequestHandler = async (req, res, next) => {
    // Use multer middleware to handle file upload
    upload.single('profile_picture')(req, res, async (err) => {
      try {
        // Handle multer errors
        if (err instanceof multer.MulterError) {
          logger.error('Multer error during file upload', { error: err.message });
          res.status(400).json({ error: 'File upload error: ' + err.message });
          return;
        } else if (err) {
          logger.error('Unknown error during file upload', { error: err });
          next(err);
          return;
        }

        // Get user ID from JWT token
        const userId = req.user?.id;
        if (!userId) {
          res.status(401).json({ error: 'User not authenticated' });
          return;
        }

        // Check if file was uploaded
        if (!req.file) {
          res.status(400).json({ error: 'No file uploaded. Please attach a file with key name "profile_picture"' });
          return;
        }

        const file = req.file;

        // Validate file type (JPEG, PNG)
        const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        const allowedExtensions = ['.jpg', '.jpeg', '.png'];
        const fileExtension = path.extname(file.originalname).toLowerCase();

        if (!allowedMimeTypes.includes(file.mimetype) && !allowedExtensions.includes(fileExtension)) {
          // Clean up uploaded file
          fs.unlinkSync(file.path);
          res.status(400).json({ error: 'Invalid file format. Only JPEG and PNG images are supported' });
          return;
        }

        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
          // Clean up uploaded file
          fs.unlinkSync(file.path);
          res.status(404).json({ error: 'User not found' });
          return;
        }

        // Generate unique filename for CDN storage
        const fileExt = fileExtension || '.jpg';
        const destinationBlobName = `profile-pictures/${userId}-${uuidv4()}${fileExt}`;

        let newProfilePictureUrl: string;
        try {
          // Upload file to CDN
          newProfilePictureUrl = await uploadFileToCdn(file.path, destinationBlobName);
        } catch (uploadError) {
          logger.error('Error uploading file to CDN', { error: uploadError, userId });
          // Clean up uploaded file
          fs.unlinkSync(file.path);
          next(uploadError);
          return;
        }

        // Clean up temporary file
        try {
          fs.unlinkSync(file.path);
        } catch (cleanupError) {
          logger.warn('Failed to clean up temporary file', { path: file.path, error: cleanupError });
        }

        // Delete old profile picture from CDN if it exists
        if (user.profile_picture_url) {
          try {
            await deleteFileFromCdn(user.profile_picture_url);
          } catch (deleteError) {
            logger.warn('Failed to delete old profile picture from CDN', { 
              url: user.profile_picture_url, 
              error: deleteError 
            });
            // Continue even if deletion fails
          }
        }

        // Update user's profile_picture_url in database
        const updatedUser = await User.update(userId, {
          profile_picture_url: newProfilePictureUrl,
        });

        if (!updatedUser) {
          // If update failed, try to clean up the newly uploaded file
          try {
            await deleteFileFromCdn(newProfilePictureUrl);
          } catch (cleanupError) {
            logger.error('Failed to clean up CDN file after database update failure', { 
              url: newProfilePictureUrl, 
              error: cleanupError 
            });
          }
          res.status(404).json({ error: 'Failed to update user profile picture' });
          return;
        }

        logger.info('Profile picture uploaded successfully', { 
          userId, 
          profilePictureUrl: newProfilePictureUrl 
        });

        res.status(200).json({
          profile_picture_url: updatedUser.profile_picture_url,
        });
        return;
      } catch (e) {
        // Clean up file if it exists
        if (req.file?.path) {
          try {
            fs.unlinkSync(req.file.path);
          } catch (cleanupError) {
            logger.warn('Failed to clean up temporary file in error handler', { 
              path: req.file.path, 
              error: cleanupError 
            });
          }
        }
        next(e);
      }
    });
  };
  return handler;
};

export default uploadProfilePicture;

import type express from 'express';
import logger from '../utils/logger';
import { database } from '../utils/database';
import { Post } from '../models/post';

interface GetAllPostsResponse {
  posts: {
    id: string;
    user_id: string;
    content: string;
    created_at: number;
    likes_count: number;
  }[];
}

const getAllPosts = (): express.RequestHandler => {
  const handler: express.RequestHandler = async (req, res, next) => {
    try {
      // Get database connection
      const db = await database.getDb();

      // Query all posts ordered by created_at descending (newest first)
      const postDocs = await db
        .collection<Post>('posts')
        .find({})
        .sort({ created_at: -1 })
        .toArray();

      // Map documents to Post model instances
      const posts = postDocs
        .map((doc) => Post.fromDocument(doc))
        .filter((post): post is Post => post !== null)
        .map((post) => ({
          id: post.id,
          user_id: post.user_id,
          content: post.content,
          created_at: post.created_at,
          likes_count: post.likes_count,
        }));

      const response: GetAllPostsResponse = {
        posts: posts,
      };

      res.status(200).json(response);
      return;
    } catch (e) {
      logger.error(`Error retrieving all posts: ${e}`);
      next(e);
    }
  };
  return handler;
};

export default getAllPosts;

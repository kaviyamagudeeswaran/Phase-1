import { ObjectId } from 'mongodb';
import { database } from '../utils/database';
import logger from '../utils/logger';

export class Like {
  public id: string;
  public post_id: string;
  public user_id: string;

  constructor(id: string, post_id: string, user_id: string) {
    this.id = id;
    this.post_id = post_id;
    this.user_id = user_id;
  }

  /**
   * Creates a Like instance from a MongoDB document.
   * @param doc The MongoDB document.
   * @returns A new Like instance, or null if the document is null/undefined.
   */
  static fromDocument(doc: any): Like | null {
    if (!doc) {
      return null;
    }
    return new Like(
      doc.id,
      doc.post_id,
      doc.user_id
    );
  }

  /**
   * Converts the Like instance to a MongoDB document.
   * @returns An object suitable for insertion into MongoDB.
   */
  toDocument(): any {
    return {
      id: this.id,
      post_id: this.post_id,
      user_id: this.user_id,
    };
  }

  /**
   * Creates a new like in the database.
   * @param like The Like object to create.
   * @returns The created Like object, or null if creation failed.
   */
  static async create(like: Like): Promise<Like | null> {
    try {
      const db = await database.getDb();
      const result = await db.collection('likes').insertOne(like.toDocument());
      if (result.acknowledged) {
        return like;
      }
      return null;
    } catch (error) {
      logger.error(`Error creating like: ${error}`);
      return null;
    }
  }

  /**
   * Finds a like by its unique identifier.
   * @param id The unique identifier of the like.
   * @returns The Like object if found, otherwise null.
   */
  static async findById(id: string): Promise<Like | null> {
    try {
      const db = await database.getDb();
      const doc = await db.collection('likes').findOne({ id: id });
      return Like.fromDocument(doc);
    } catch (error) {
      logger.error(`Error finding like by id ${id}: ${error}`);
      return null;
    }
  }

  /**
   * Finds a like by post_id and user_id.
   * @param post_id The ID of the post.
   * @param user_id The ID of the user.
   * @returns The Like object if found, otherwise null.
   */
  static async findByPostIdAndUserId(post_id: string, user_id: string): Promise<Like | null> {
    try {
      const db = await database.getDb();
      const doc = await db.collection('likes').findOne({ post_id: post_id, user_id: user_id });
      return Like.fromDocument(doc);
    } catch (error) {
      logger.error(`Error finding like by post_id ${post_id} and user_id ${user_id}: ${error}`);
      return null;
    }
  }

  /**
   * Deletes a like by its unique identifier.
   * @param id The unique identifier of the like to delete.
   * @returns True if the like was deleted, false otherwise.
   */
  static async deleteById(id: string): Promise<boolean> {
    try {
      const db = await database.getDb();
      const result = await db.collection('likes').deleteOne({ id: id });
      return result.deletedCount === 1;
    } catch (error) {
      logger.error(`Error deleting like by id ${id}: ${error}`);
      return false;
    }
  }

  /**
   * Deletes a like by post_id and user_id.
   * @param post_id The ID of the post.
   * @param user_id The ID of the user.
   * @returns True if the like was deleted, false otherwise.
   */
  static async deleteByPostIdAndUserId(post_id: string, user_id: string): Promise<boolean> {
    try {
      const db = await database.getDb();
      const result = await db.collection('likes').deleteOne({ post_id: post_id, user_id: user_id });
      return result.deletedCount === 1;
    } catch (error) {
      logger.error(`Error deleting like by post_id ${post_id} and user_id ${user_id}: ${error}`);
      return false;
    }
  }
}

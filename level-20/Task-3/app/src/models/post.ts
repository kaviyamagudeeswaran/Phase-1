import { ObjectId } from 'mongodb';
import { database } from '../utils/database';
import logger from '../utils/logger';

export class Post {
  public id: string;
  public user_id: string;
  public content: string;
  public created_at: number;
  public likes_count: number;

  constructor(
    id: string,
    user_id: string,
    content: string,
    created_at: number,
    likes_count: number,
  ) {
    this.id = id;
    this.user_id = user_id;
    this.content = content;
    this.created_at = created_at;
    this.likes_count = likes_count;
  }

  /**
   * Creates a Post instance from a MongoDB document.
   * @param doc The MongoDB document.
   * @returns A Post instance, or null if the document is invalid.
   */
  static fromDocument(doc: any): Post | null {
    if (!doc) {
      return null;
    }
    return new Post(
      doc.id,
      doc.user_id,
      doc.content,
      doc.created_at,
      doc.likes_count,
    );
  }

  /**
   * Creates a new post in the database.
   * @param postData The data for the new post.
   * @returns The created Post instance, or null if creation failed.
   */
  static async create(postData: {
    id: string;
    user_id: string;
    content: string;
    created_at: number;
    likes_count: number;
  }): Promise<Post | null> {
    try {
      const db = await database.getDb();
      const result = await db.collection<Post>('posts').insertOne(postData);
      if (result.acknowledged) {
        return Post.fromDocument(postData);
      }
      return null;
    } catch (error) {
      logger.error(`Error creating post: ${error}`);
      return null;
    }
  }

  /**
   * Finds a post by its ID.
   * @param id The unique identifier of the post.
   * @returns The Post instance, or null if not found.
   */
  static async findById(id: string): Promise<Post | null> {
    try {
      const db = await database.getDb();
      const doc = await db.collection<Post>('posts').findOne({ id: id });
      return Post.fromDocument(doc);
    } catch (error) {
      logger.error(`Error finding post by id ${id}: ${error}`);
      return null;
    }
  }

  /**
   * Updates an existing post.
   * @param id The unique identifier of the post to update.
   * @param updateFields The fields to update.
   * @returns The updated Post instance, or null if not found or update failed.
   */
  static async update(
    id: string,
    updateFields: Partial<Omit<Post, 'id'>>,
  ): Promise<Post | null> {
    try {
      const db = await database.getDb();
      const updatedDoc = await db
        .collection<Post>('posts')
        .findOneAndUpdate(
          { id: id },
          { $set: updateFields },
          { returnDocument: 'after' },
        );
      return Post.fromDocument(updatedDoc);
    } catch (error) {
      logger.error(`Error updating post with id ${id}: ${error}`);
      return null;
    }
  }

  /**
   * Deletes a post by its ID.
   * @param id The unique identifier of the post to delete.
   * @returns True if the post was deleted, false otherwise.
   */
  static async delete(id: string): Promise<boolean> {
    try {
      const db = await database.getDb();
      const result = await db.collection<Post>('posts').deleteOne({ id: id });
      return result.deletedCount === 1;
    } catch (error) {
      logger.error(`Error deleting post with id ${id}: ${error}`);
      return false;
    }
  }
}

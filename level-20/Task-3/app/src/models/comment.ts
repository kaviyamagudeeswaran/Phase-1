import { ObjectId } from 'mongodb';
import { database } from '../utils/database';
import logger from '../utils/logger';
import * as crypto from 'crypto';

export class Comment {
  public id: string;
  public post_id: string;
  public user_id: string;
  public content: string;
  public created_at: number;

  constructor(
    id: string,
    post_id: string,
    user_id: string,
    content: string,
    created_at: number,
  ) {
    this.id = id;
    this.post_id = post_id;
    this.user_id = user_id;
    this.content = content;
    this.created_at = created_at;
  }

  /**
   * Creates a Comment instance from a MongoDB document.
   * @param doc The MongoDB document.
   * @returns A Comment instance, or null if the document is invalid.
   */
  static fromDocument(doc: any): Comment | null {
    if (!doc) {
      return null;
    }
    return new Comment(
      doc.id,
      doc.post_id,
      doc.user_id,
      doc.content,
      doc.created_at,
    );
  }

  /**
   * Converts the Comment instance to a document suitable for MongoDB insertion/update.
   */
  toDocument(): any {
    return {
      id: this.id,
      post_id: this.post_id,
      user_id: this.user_id,
      content: this.content,
      created_at: this.created_at,
    };
  }

  /**
   * Creates a new comment in the database.
   * @param post_id The ID of the post the comment belongs to.
   * @param user_id The ID of the user who created the comment.
   * @param content The text content of the comment.
   * @returns The created Comment instance.
   */
  static async create(post_id: string, user_id: string, content: string): Promise<Comment> {
    const db = await database.getDb();
    const newComment = new Comment(
      crypto.randomUUID(),
      post_id,
      user_id,
      content,
      Math.floor(Date.now() / 1000) // Unix timestamp in seconds
    );

    try {
      await db.collection<any>('comments').insertOne(newComment.toDocument());
      return newComment;
    } catch (error) {
      logger.error(`Error creating comment: ${error}`);
      throw error;
    }
  }

  /**
   * Finds a comment by its unique ID.
   * @param id The unique identifier for the comment.
   * @returns The Comment instance, or null if not found.
   */
  static async findById(id: string): Promise<Comment | null> {
    const db = await database.getDb();
    try {
      const doc = await db.collection<any>('comments').findOne({ id: id });
      return Comment.fromDocument(doc);
    } catch (error) {
      logger.error(`Error finding comment by id ${id}: ${error}`);
      throw error;
    }
  }

  /**
   * Finds all comments for a given post ID.
   * @param post_id The ID of the post.
   * @returns An array of Comment instances.
   */
  static async findByPostId(post_id: string): Promise<Comment[]> {
    const db = await database.getDb();
    try {
      const docs = await db.collection<any>('comments').find({ post_id: post_id }).toArray();
      return docs.map(doc => Comment.fromDocument(doc)).filter((comment): comment is Comment => comment !== null);
    } catch (error) {
      logger.error(`Error finding comments for post_id ${post_id}: ${error}`);
      throw error;
    }
  }

  /**
   * Updates an existing comment.
   * @param id The ID of the comment to update.
   * @param updateFields An object containing fields to update (e.g., { content: "new content" }).
   * @returns The updated Comment instance, or null if not found.
   */
  static async update(id: string, updateFields: Partial<Omit<Comment, 'id' | 'post_id' | 'created_at'>>): Promise<Comment | null> {
    const db = await database.getDb();
    try {
      const result = await db.collection<any>('comments').findOneAndUpdate(
        { id: id },
        { $set: updateFields },
        { returnDocument: 'after' }
      );
      return Comment.fromDocument(result);
    } catch (error) {
      logger.error(`Error updating comment with id ${id}: ${error}`);
      throw error;
    }
  }

  /**
   * Deletes a comment by its ID.
   * @param id The ID of the comment to delete.
   * @returns True if the comment was deleted, false otherwise.
   */
  static async delete(id: string): Promise<boolean> {
    const db = await database.getDb();
    try {
      const result = await db.collection<any>('comments').deleteOne({ id: id });
      return result.deletedCount === 1;
    } catch (error) {
      logger.error(`Error deleting comment with id ${id}: ${error}`);
      throw error;
    }
  }
}
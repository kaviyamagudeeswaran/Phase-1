import { ObjectId } from 'mongodb';
import { database } from '../utils/database';
import logger from '../utils/logger';

export class User {
  public id: string;
  public username: string;
  public profile_picture_url: string;
  public bio: string;
  public skills: string[];
  public email: string;

  constructor(
    id: string,
    username: string,
    profile_picture_url: string,
    bio: string,
    skills: string[],
    email: string,
  ) {
    this.id = id;
    this.username = username;
    this.profile_picture_url = profile_picture_url;
    this.bio = bio;
    this.skills = skills;
    this.email = email;
  }

  /**
   * Creates a User instance from a MongoDB document.
   * @param doc The MongoDB document.
   * @returns A User instance or null if the document is invalid.
   */
  static fromDocument(doc: any): User | null {
    if (!doc) {
      return null;
    }
    return new User(
      doc.id,
      doc.username,
      doc.profile_picture_url,
      doc.bio,
      doc.skills,
      doc.email,
    );
  }

  /**
   * Creates a new user in the database.
   * @param userData The data for the new user.
   * @returns The created User instance.
   */
  static async create(userData: {
    id: string;
    username: string;
    profile_picture_url: string;
    bio: string;
    skills: string[];
    email: string;
  }): Promise<User> {
    const db = await database.getDb();
    const collection = db.collection<User>('users');
    const newUser = { ...userData };
    await collection.insertOne(newUser);
    return new User(
      newUser.id,
      newUser.username,
      newUser.profile_picture_url,
      newUser.bio,
      newUser.skills,
      newUser.email,
    );
  }

  /**
   * Finds a user by their unique ID.
   * @param id The unique ID of the user.
   * @returns The User instance if found, otherwise null.
   */
  static async findById(id: string): Promise<User | null> {
    const db = await database.getDb();
    const collection = db.collection<User>('users');
    const doc = await collection.findOne({ id: id });
    return User.fromDocument(doc);
  }

  /**
   * Finds a user by their username.
   * @param username The username of the user.
   * @returns The User instance if found, otherwise null.
   */
  static async findByUsername(username: string): Promise<User | null> {
    const db = await database.getDb();
    const collection = db.collection<User>('users');
    const doc = await collection.findOne({ username: username });
    return User.fromDocument(doc);
  }

  /**
   * Updates an existing user in the database.
   * @param id The unique ID of the user to update.
   * @param updateFields The fields to update.
   * @returns The updated User instance if found, otherwise null.
   */
  static async update(
    id: string,
    updateFields: Partial<User>,
  ): Promise<User | null> {
    const db = await database.getDb();
    const collection = db.collection<User>('users');
    const result = await collection.findOneAndUpdate(
      { id: id },
      { $set: updateFields },
      { returnDocument: 'after' },
    );

    if (result) {
      return User.fromDocument(result);
    }
    return null;
  }

  /**
   * Deletes a user from the database by their ID.
   * @param id The unique ID of the user to delete.
   * @returns True if the user was deleted, false otherwise.
   */
  static async delete(id: string): Promise<boolean> {
    const db = await database.getDb();
    const collection = db.collection<User>('users');
    const result = await collection.deleteOne({ id: id });
    return result.deletedCount === 1;
  }
}

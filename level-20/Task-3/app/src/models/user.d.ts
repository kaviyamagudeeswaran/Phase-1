export declare class User {
    id: string;
    username: string;
    profile_picture_url: string;
    bio: string;
    skills: string[];
    email: string;
    constructor(id: string, username: string, profile_picture_url: string, bio: string, skills: string[], email: string);
    /**
     * Creates a User instance from a MongoDB document.
     * @param doc The MongoDB document.
     * @returns A User instance or null if the document is invalid.
     */
    static fromDocument(doc: any): User | null;
    /**
     * Creates a new user in the database.
     * @param userData The data for the new user.
     * @returns The created User instance.
     */
    static create(userData: {
        id: string;
        username: string;
        profile_picture_url: string;
        bio: string;
        skills: string[];
        email: string;
    }): Promise<User>;
    /**
     * Finds a user by their unique ID.
     * @param id The unique ID of the user.
     * @returns The User instance if found, otherwise null.
     */
    static findById(id: string): Promise<User | null>;
    /**
     * Finds a user by their username.
     * @param username The username of the user.
     * @returns The User instance if found, otherwise null.
     */
    static findByUsername(username: string): Promise<User | null>;
    /**
     * Updates an existing user in the database.
     * @param id The unique ID of the user to update.
     * @param updateFields The fields to update.
     * @returns The updated User instance if found, otherwise null.
     */
    static update(id: string, updateFields: Partial<User>): Promise<User | null>;
    /**
     * Deletes a user from the database by their ID.
     * @param id The unique ID of the user to delete.
     * @returns True if the user was deleted, false otherwise.
     */
    static delete(id: string): Promise<boolean>;
}

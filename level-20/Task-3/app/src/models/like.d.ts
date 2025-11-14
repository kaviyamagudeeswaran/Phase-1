export declare class Like {
    id: string;
    post_id: string;
    user_id: string;
    constructor(id: string, post_id: string, user_id: string);
    /**
     * Creates a Like instance from a MongoDB document.
     * @param doc The MongoDB document.
     * @returns A new Like instance, or null if the document is null/undefined.
     */
    static fromDocument(doc: any): Like | null;
    /**
     * Converts the Like instance to a MongoDB document.
     * @returns An object suitable for insertion into MongoDB.
     */
    toDocument(): any;
    /**
     * Creates a new like in the database.
     * @param like The Like object to create.
     * @returns The created Like object, or null if creation failed.
     */
    static create(like: Like): Promise<Like | null>;
    /**
     * Finds a like by its unique identifier.
     * @param id The unique identifier of the like.
     * @returns The Like object if found, otherwise null.
     */
    static findById(id: string): Promise<Like | null>;
    /**
     * Finds a like by post_id and user_id.
     * @param post_id The ID of the post.
     * @param user_id The ID of the user.
     * @returns The Like object if found, otherwise null.
     */
    static findByPostIdAndUserId(post_id: string, user_id: string): Promise<Like | null>;
    /**
     * Deletes a like by its unique identifier.
     * @param id The unique identifier of the like to delete.
     * @returns True if the like was deleted, false otherwise.
     */
    static deleteById(id: string): Promise<boolean>;
    /**
     * Deletes a like by post_id and user_id.
     * @param post_id The ID of the post.
     * @param user_id The ID of the user.
     * @returns True if the like was deleted, false otherwise.
     */
    static deleteByPostIdAndUserId(post_id: string, user_id: string): Promise<boolean>;
}

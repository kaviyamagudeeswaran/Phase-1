export declare class Comment {
    id: string;
    post_id: string;
    user_id: string;
    content: string;
    created_at: number;
    constructor(id: string, post_id: string, user_id: string, content: string, created_at: number);
    /**
     * Creates a Comment instance from a MongoDB document.
     * @param doc The MongoDB document.
     * @returns A Comment instance, or null if the document is invalid.
     */
    static fromDocument(doc: any): Comment | null;
    /**
     * Converts the Comment instance to a document suitable for MongoDB insertion/update.
     */
    toDocument(): any;
    /**
     * Creates a new comment in the database.
     * @param post_id The ID of the post the comment belongs to.
     * @param user_id The ID of the user who created the comment.
     * @param content The text content of the comment.
     * @returns The created Comment instance.
     */
    static create(post_id: string, user_id: string, content: string): Promise<Comment>;
    /**
     * Finds a comment by its unique ID.
     * @param id The unique identifier for the comment.
     * @returns The Comment instance, or null if not found.
     */
    static findById(id: string): Promise<Comment | null>;
    /**
     * Finds all comments for a given post ID.
     * @param post_id The ID of the post.
     * @returns An array of Comment instances.
     */
    static findByPostId(post_id: string): Promise<Comment[]>;
    /**
     * Updates an existing comment.
     * @param id The ID of the comment to update.
     * @param updateFields An object containing fields to update (e.g., { content: "new content" }).
     * @returns The updated Comment instance, or null if not found.
     */
    static update(id: string, updateFields: Partial<Omit<Comment, 'id' | 'post_id' | 'created_at'>>): Promise<Comment | null>;
    /**
     * Deletes a comment by its ID.
     * @param id The ID of the comment to delete.
     * @returns True if the comment was deleted, false otherwise.
     */
    static delete(id: string): Promise<boolean>;
}

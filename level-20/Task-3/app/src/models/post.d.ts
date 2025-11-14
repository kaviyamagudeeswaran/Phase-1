export declare class Post {
    id: string;
    user_id: string;
    content: string;
    created_at: number;
    likes_count: number;
    constructor(id: string, user_id: string, content: string, created_at: number, likes_count: number);
    /**
     * Creates a Post instance from a MongoDB document.
     * @param doc The MongoDB document.
     * @returns A Post instance, or null if the document is invalid.
     */
    static fromDocument(doc: any): Post | null;
    /**
     * Creates a new post in the database.
     * @param postData The data for the new post.
     * @returns The created Post instance, or null if creation failed.
     */
    static create(postData: {
        id: string;
        user_id: string;
        content: string;
        created_at: number;
        likes_count: number;
    }): Promise<Post | null>;
    /**
     * Finds a post by its ID.
     * @param id The unique identifier of the post.
     * @returns The Post instance, or null if not found.
     */
    static findById(id: string): Promise<Post | null>;
    /**
     * Updates an existing post.
     * @param id The unique identifier of the post to update.
     * @param updateFields The fields to update.
     * @returns The updated Post instance, or null if not found or update failed.
     */
    static update(id: string, updateFields: Partial<Omit<Post, 'id'>>): Promise<Post | null>;
    /**
     * Deletes a post by its ID.
     * @param id The unique identifier of the post to delete.
     * @returns True if the post was deleted, false otherwise.
     */
    static delete(id: string): Promise<boolean>;
}

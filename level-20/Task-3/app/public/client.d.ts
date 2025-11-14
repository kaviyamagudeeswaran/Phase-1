export default class ClientAPI {
    fetchJSON(endpoint: any, options?: {}): Promise<any>;
    getCookie(name: any): string;
    /**
     * Deletes a comment.
     *
     * Request:
     * - Path parameter: comment_id (UUID)
     *
     * Response (200):
     * {
     *   success: boolean
     * }
     *
     * @param {string} commentId - The UUID of the comment to delete
     * @returns {Promise<{success: boolean}>}
     * @throws {Error} 403 if user is not the owner or admin, 404 if comment not found, 500 on server error
     */
    deleteComment(commentId: any): Promise<any>;
    /**
     * Updates a comment.
     *
     * Request:
     * PUT /api/comments/{comment_id}
     * Body: {
     *   content: string
     * }
     *
     * Response:
     * {
     *   id: string,
     *   post_id: string,
     *   user_id: string,
     *   content: string,
     *   created_at: number
     * }
     */
    updateComment(commentId: any, content: any): Promise<any>;
    /**
     * Retrieves all posts from the database, ordered by creation date in descending order (newest first).
     *
     * Request: GET /api/posts
     * No request body or query parameters.
     *
     * Response: {
     *   posts: Array<{
     *     id: string,
     *     user_id: string,
     *     content: string,
     *     created_at: number,
     *     likes_count: number
     *   }>
     * }
     */
    getAllPosts(): Promise<any>;
    /**
     * Creates a new post.
     *
     * Request:
     * {
     *   content: string
     * }
     *
     * Response:
     * {
     *   id: string,
     *   user_id: string,
     *   content: string,
     *   created_at: number,
     *   likes_count: number
     * }
     */
    createPost(content: any): Promise<any>;
    /**
     * Deletes a post.
     *
     * Request:
     * - Path parameter: post_id (UUID)
     *
     * Response (200):
     * {
     *   success: boolean
     * }
     *
     * @param {string} postId - The ID of the post to delete
     * @returns {Promise<{success: boolean}>}
     * @throws {Error} If the request fails (403: Forbidden, 404: Not found, 500: Server error)
     */
    deletePost(postId: any): Promise<any>;
    /**
     * Retrieves a single post.
     *
     * Request:
     * - Path parameter: post_id (string)
     *
     * Response (200):
     * {
     *   id: string,
     *   user_id: string,
     *   content: string,
     *   created_at: number,
     *   likes_count: number
     * }
     */
    getPost(postId: any): Promise<any>;
    /**
     * Updates a post.
     *
     * Request:
     * PUT /api/posts/{post_id}
     * Body: {
     *   content: string
     * }
     *
     * Response:
     * {
     *   id: string,
     *   user_id: string,
     *   content: string,
     *   created_at: number,
     *   likes_count: number
     * }
     */
    updatePost(postId: any, content: any): Promise<any>;
    /**
     * Retrieves all comments for a specific post.
     *
     * Request:
     * GET /api/posts/{post_id}/comments
     *
     * Response:
     * {
     *   comments: [
     *     {
     *       id: string,
     *       post_id: string,
     *       user_id: string,
     *       content: string,
     *       created_at: number
     *     }
     *   ]
     * }
     *
     * @param {string} postId - The ID of the post to retrieve comments for
     * @returns {Promise<GetAllCommentsResponse>} The comments for the post
     * @throws {Error} If the request fails
     */
    getAllComments(postId: any): Promise<any>;
    /**
     * Creates a comment for a specific post.
     *
     * Request:
     * POST /api/posts/{post_id}/comments
     * Body: {
     *   content: string
     * }
     *
     * Response (201):
     * {
     *   id: string,
     *   post_id: string,
     *   user_id: string,
     *   content: string,
     *   created_at: number
     * }
     *
     * @param {string} postId - The ID of the post to comment on
     * @param {string} content - The content of the comment
     * @returns {Promise<Object>} The created comment object
     * @throws {Error} If the request fails (400: invalid content, 404: post not found)
     */
    createComment(postId: any, content: any): Promise<any>;
    /**
     * Unlikes a post.
     *
     * Request:
     * - Method: DELETE
     * - Path: /api/posts/{post_id}/likes
     * - Body: null
     *
     * Response:
     * - Status: 200
     * - Body: {
     *     success: boolean
     *   }
     */
    unlikePost(postId: any): Promise<any>;
    /**
     * Likes a post.
     *
     * Request:
     * POST /api/posts/{post_id}/likes
     * No request body
     *
     * Response (201):
     * {
     *   id: string,
     *   post_id: string,
     *   user_id: string
     * }
     *
     * @param {string} postId - The ID of the post to like
     * @returns {Promise<{id: string, post_id: string, user_id: string}>}
     * @throws {Error} 400 if user has already liked the post, 404 if post not found
     */
    likePost(postId: any): Promise<any>;
    /**
     * Fetches the current storm user.
     * @async
     * @returns {Promise<{ userId: string, role: string, email: string, name: string }>} A promise that resolves to an object containing the user's ID and name, role and email.
     */
    getCurrentAuthUser(): Promise<any>;
    /**
     * Updates the current user's profile.
     *
     * Request: PUT /api/users/me
     * Body: {
     *   username: string,
     *   bio: string,
     *   skills: string[],
     *   profile_picture_url: string
     * }
     *
     * Response: {
     *   id: string,
     *   username: string,
     *   bio: string,
     *   skills: string[],
     *   profile_picture_url: string
     * }
     */
    updateUserProfile(username: any, bio: any, skills: any, profilePictureUrl: any): Promise<{
        id: any;
        username: any;
        bio: any;
        skills: any;
        profilePictureUrl: any;
    }>;
    /**
     * Uploads a profile picture for the current user.
     *
     * Request: multipart/form-data with file field 'profile_picture' (JPEG or PNG)
     *
     * Response: {
     *   profile_picture_url: string
     * }
     */
    uploadProfilePicture(profilePictureFile: any): Promise<any>;
    /**
     * Retrieves a user profile.
     *
     * Request:
     * GET /api/users/{user_id}
     *
     * Response (200):
     * {
     *   id: string,
     *   username: string,
     *   bio: string,
     *   skills: string[],
     *   profile_picture_url: string
     * }
     */
    getUserProfile(userId: any): Promise<any>;
}

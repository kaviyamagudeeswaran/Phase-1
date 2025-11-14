export default class ClientAPI {
  // Helper method for common fetch operations
  async fetchJSON(endpoint, options = {}) {
    const url = `${endpoint}`;

    // Get the auth token from cookie
    const authToken = this.getCookie("storm_app_token");

    // Build headers
    const headers = {
      // Only include Content-Type for requests with body
      ...(options.body && {
        "Content-Type": "application/json",
      }),
      // Add auth header if token exists
      ...(authToken && {
        Authorization: `Bearer ${authToken}`,
      }),
    };

    const response = await fetch(url, {
      ...options,
      headers: {
        ...headers,
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error || `Request failed with status ${response.status}`,
      );
    }

    return data;
  }

  // Helper method to get cookie by name
  getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  }

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
  async deleteComment(commentId) {
    const endpoint = `/api/comments/${commentId}`;
    
    return await this.fetchJSON(endpoint, {
      method: 'DELETE'
    });
  }

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
  async updateComment(commentId, content) {
    const endpoint = `/api/comments/${commentId}`;
    
    const response = await this.fetchJSON(endpoint, {
      method: 'PUT',
      body: JSON.stringify({
        content: content
      })
    });
    
    return response;
  }

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
  async getAllPosts() {
    const response = await this.fetchJSON('/api/posts', {
      method: 'GET'
    });
    
    return response;
  }

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
  async createPost(content) {
    const response = await this.fetchJSON('/api/posts', {
      method: 'POST',
      body: JSON.stringify({ content })
    });
    
    return response;
  }

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
  async deletePost(postId) {
    const endpoint = `/api/posts/${postId}`;
    
    return await this.fetchJSON(endpoint, {
      method: 'DELETE'
    });
  }

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
  async getPost(postId) {
    const endpoint = `/api/posts/${encodeURIComponent(postId)}`;
    return await this.fetchJSON(endpoint, {
      method: 'GET'
    });
  }

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
  async updatePost(postId, content) {
    const endpoint = `/api/posts/${postId}`;
    
    const response = await this.fetchJSON(endpoint, {
      method: 'PUT',
      body: JSON.stringify({
        content: content
      })
    });
    
    return response;
  }

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
  async getAllComments(postId) {
    const endpoint = `/api/posts/${postId}/comments`;
    return await this.fetchJSON(endpoint, {
      method: 'GET'
    });
  }

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
  async createComment(postId, content) {
    const endpoint = `/api/posts/${postId}/comments`;
    
    const response = await this.fetchJSON(endpoint, {
      method: 'POST',
      body: JSON.stringify({
        content: content
      })
    });
    
    return response;
  }

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
  async unlikePost(postId) {
    const endpoint = `/api/posts/${postId}/likes`;
    
    return await this.fetchJSON(endpoint, {
      method: 'DELETE'
    });
  }

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
  async likePost(postId) {
    return await this.fetchJSON(`/api/posts/${postId}/likes`, {
      method: 'POST'
    });
  }

  /**
   * Fetches the current storm user.
   * @async
   * @returns {Promise<{ userId: string, role: string, email: string, name: string }>} A promise that resolves to an object containing the user's ID and name, role and email.
   */
  async getCurrentAuthUser() {
      return await this.fetchJSON(`/api/storm/me`);
  }

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
  async updateUserProfile(username, bio, skills, profilePictureUrl) {
    const requestBody = {
      username,
      bio,
      skills,
      profile_picture_url: profilePictureUrl
    };

    const response = await this.fetchJSON('/api/users/me', {
      method: 'PUT',
      body: JSON.stringify(requestBody)
    });

    return {
      id: response.id,
      username: response.username,
      bio: response.bio,
      skills: response.skills,
      profilePictureUrl: response.profile_picture_url
    };
  }

  /**
   * Uploads a profile picture for the current user.
   * 
   * Request: multipart/form-data with file field 'profile_picture' (JPEG or PNG)
   * 
   * Response: {
   *   profile_picture_url: string
   * }
   */
  async uploadProfilePicture(profilePictureFile) {
    const url = '/api/users/me/profile-picture';
    
    // Get the auth token from cookie
    const authToken = this.getCookie('storm_app_token');
    
    // Create FormData and append the file
    const formData = new FormData();
    formData.append('profile_picture', profilePictureFile);
    
    // Build headers (don't set Content-Type, browser will set it with boundary)
    const headers = {};
    if (authToken) {
      headers['Authorization'] = `Bearer ${authToken}`;
    }
    
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: formData
    });
    
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || `Request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  }

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
  async getUserProfile(userId) {
    const endpoint = `/api/users/${encodeURIComponent(userId)}`;
    return await this.fetchJSON(endpoint, {
      method: 'GET'
    });
  }
}
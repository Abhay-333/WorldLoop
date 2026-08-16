import { apiClient } from "@/shared/lib/apiClient.js"

/**
 * Fetches the profile of a user by their username.
 * @async
 * @function getProfileApi
 * @returns {Promise<Object>} The user profile data including username, bio, avatar, etc.
 * @throws {Error} If the API request fails or the user is not found.
 */
export const getProfileApi = async () => {
  try {
    const result = await apiClient.get("/users/:username")
    return result.data
  } catch (error) {
    console.error(
      "Error fetching user profile:",
      error.response || error.message
    )
    throw error
  }
}

/**
 * Updates the authenticated user's profile information.
 * Sends a PATCH request to update the user's profile data such as bio, name, etc.
 * Requires the user to be logged in and have a valid authentication token.
 * @async
 * @function updateProfileApi
 * @returns {Promise<Object>} Updated user profile data.
 * @throws {Error} If the API request fails or user is not authenticated.
 */
export const updateProfileApi = async () => {
  try {
    const result = await apiClient.patch("/users/profile")
    return result.data
  } catch (error) {
    console.error(
      "Error updating user profile:",
      error.response || error.message
    )
    throw error
  }
}

/**
 * Updates the authenticated user's avatar/profile picture.
 * Sends a PATCH request to update the user's avatar in the database.
 * @async
 * @function updateAvatarApi
 * @returns {Promise<Object>} Updated user profile data with the new avatar URL.
 * @throws {Error} If the API request fails, avatar upload is unsuccessful, or user is not authenticated.
 */
export const updateAvatarApi = async () => {
  try {
    const result = await apiClient.patch("/users/profile/avatar")
    return result.data
  } catch (error) {
    console.error("Error updating avatar:", error.response || error.message)
    throw error
  }
}

/**
 * Deletes the authenticated user's avatar/profile picture.
 * Sends a DELETE request to remove the user's avatar from the database.
 * @async
 * @function deleteAvatarApi
 * @returns {Promise<Object>} Response confirming avatar has been deleted.
 * @throws {Error} If the API request fails, avatar deletion fails, or user is not authenticated.
 */
export const deleteAvatarApi = async () => {
  try {
    const result = await apiClient.delete("/users/profile/avatar")
    return result.data
  } catch (error) {
    console.error("Error deleting avatar:", error.response || error.message)
    throw error
  }
}

/**
 * Updates the authenticated user's privacy settings.
 * Sends a PATCH request to modify the user's privacy preferences.
 * @async
 * @function updatePrivacyApi
 * @returns {Promise<Object>} Updated user privacy settings.
 * @throws {Error} If the API request fails or user is not authenticated.
 */
export const updatePrivacyApi = async () => {
  try {
    const result = await apiClient.patch("/users/profile/privacy")
    return result.data
  } catch (error) {
    console.error(
      "Error updating privacy settings:",
      error.response || error.message
    )
    throw error
  }
}

/**
 * Fetches all posts created by a specific user.
 * Sends a GET request to retrieve posts filtered by username.
 * @async
 * @function getPostsApi
 * @returns {Promise<Object>} Array of posts created by the user.
 * @throws {Error} If the API request fails or user not found.
 */
export const getPostsApi = async ({ username, cursor, limit = 12 }) => {
  try {
    const { data } = await apiClient.get(`/users/${username}/posts`, {
      params: { cursor, limit },
    })
    return result.data
  } catch (error) {
    console.error("Error fetching user posts:", error.response || error.message)
    throw error
  }
}

/**
 * Fetches the list of followers for a specific user.
 * Sends a GET request to retrieve the followers of a user by username.
 * @async
 * @function getFollowersApi
 * @returns {Promise<Object>} Array of user profiles who follow the specified user.
 * @throws {Error} If the API request fails or user not found.
 */
export const getFollowersApi = async () => {
  try {
    const result = await apiClient.get("/users/:username/followers")
    return result.data
  } catch (error) {
    console.error("Error fetching followers:", error.response || error.message)
    throw error
  }
}

/**
 * Fetches the list of users that a specific user is following.
 * Sends a GET request to retrieve the following list of a user by username.
 * @async
 * @function getFollowingUsersApi
 * @returns {Promise<Object>} Array of user profiles that the specified user is following.
 * @throws {Error} If the API request fails or user not found.
 */
export const getFollowingUsersApi = async () => {
  try {
    const result = await apiClient.get("/users/:username/following")
    return result.data
  } catch (error) {
    console.error(
      "Error fetching following users:",
      error.response || error.message
    )
    throw error
  }
}

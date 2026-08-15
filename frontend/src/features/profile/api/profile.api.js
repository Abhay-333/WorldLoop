import { apiClient } from "@/shared/lib/apiClient.js"

/**
 * Fetches the profile of a user by their username.
 * @async
 * @function getProfileByUsername
 * @returns {Promise<Object>} The user profile data including username, bio, avatar, etc.
 * @throws {Error} If the API request fails or the user is not found.
 */
export const getProfileByUsername = async () => {
  try {
    const result = apiClient.get("/users/:username")
    return result.data
  } catch (error) {
    console.error("Profile Fetching error:", error.response || error.message)
    throw error
  }
}

/**
 * Fetches the authenticated user's own profile information.
 * Requires the user to be logged in and have a valid authentication token.
 * @async
 * @function getOwnProfile
 * @returns {Promise<Object>} The authenticated user's profile data including personal details, preferences, etc.
 * @throws {Error} If the API request fails or user is not authenticated.
 */
export const updateProfile = async () => {
  try {
    const result = apiClient.patch("/users/profile")
    return result.data
  } catch (error) {
    console.error("Own Profile Fetching error:", error.response || error.message)
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
    const result = apiClient.patch("/users/profile/avatar")
    return result.data
  } catch (error) {
    console.error("Update Profile error:", error.response || error.message)
    throw error
  }
}

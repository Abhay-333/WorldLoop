import axios from "axios"
import { apiClient } from "@/shared/lib/apiClient"

/**
 * Authenticates a user with their credentials (email and password).
 * Sends a POST request to log in the user and receives an authentication token.
 * @async
 * @function loginApi
 * @param {Object} userData - User login credentials
 * @param {string} userData.email - User's email address
 * @param {string} userData.password - User's password
 * @returns {Promise<Object>} Authentication response containing user data and access token.
 * @throws {Error} If login fails due to invalid credentials or server error.
 */
const loginApi = async (userData) => {
  try {
    const response = await apiClient.post("/auth/login", userData)
    return response.data
  } catch (error) {
    console.error("Login error:", error.response || error.message)
    throw error
  }
}

/**
 * Registers a new user with the provided credentials and information.
 * Sends a POST request to create a new user account.
 * @async
 * @function registerApi
 * @param {Object} userData - User registration data
 * @param {string} userData.email - User's email address
 * @param {string} userData.password - User's password
 * @param {string} userData.name - User's full name
 * @returns {Promise<Object>} Registration response containing user data and confirmation message.
 * @throws {Error} If registration fails due to existing email or validation errors.
 */
const registerApi = async (userData) => {
  try {
    const response = await apiClient.post("/auth/register", userData)
    return response.data
  } catch (error) {
    console.error(
      "Register error:",
      error.response?.data.message || error.message
    )
    throw error
  }
}

/**
 * Verifies a user's email address using a verification token sent to their email.
 * Confirms the email ownership and activates the user account.
 * @async
 * @function verifyEmail
 * @param {string} token - Email verification token received from registration email
 * @returns {Promise<Object>} Verification response confirming email is verified.
 * @throws {Error} If token is invalid, expired, or email verification fails.
 */
const verifyEmail = async (token) => {
  try {
    const response = await apiClient.get(`/auth/verify-email/${token}`)
    return response.data
  } catch (error) {
    console.error(
      "Email Verification Error:",
      error.response?.data.message || error.message
    )
    throw error
  }
}

/**
 * Resends the email verification link to the user's email address.
 * Used when the user didn't receive the initial verification email or it expired.
 * @async
 * @function resendEmailVerification
 * @param {Object} userData - User data for resending verification
 * @param {string} userData.email - User's email address to resend verification to
 * @returns {Promise<Object>} Response confirming verification email has been resent.
 * @throws {Error} If the user doesn't exist or resend request fails.
 */
const resendEmailVerification = async (userData) => {
  try {
    const response = await apiClient.post("/auth/resend-verification", userData)
    return response.data
  } catch (error) {
    console.error(
      "Resend Verification Error:",
      error.response?.data.message || error.message
    )
    throw error
  }
}

/**
 * Retrieves the current authenticated user's information.
 * Requires a valid authentication token in the request headers.
 * @async
 * @function getMe
 * @returns {Promise<Object>} Current user's profile and account information.
 * @throws {Error} If user is not authenticated or the token is invalid/expired.
 */
const getMe = async () => {
  try {
    const response = await apiClient.get("/auth/me")
    return response.data
  } catch (error) {
    console.error("getMe Error:", error.response?.data.message || error.message)
    throw error
  }
}

/**
 * Logs out the currently authenticated user.
 * Invalidates the user's authentication token and clears the session.
 * @async
 * @function logoutApi
 * @returns {Promise<Object>} Logout confirmation response.
 * @throws {Error} If logout request fails or user is not authenticated.
 */
const logoutApi = async () => {
  try {
    const response = await apiClient.post("/auth/logout")
    return response.data
  } catch (error) {
    console.error(
      "Logout Error:",
      error.response?.data.message || error.message
    )
    throw error
  }
}

/**
 * Initiates Google OAuth authentication.
 * Redirects to Google login or processes Google authentication token.
 * @async
 * @function googleAuthApi
 * @returns {Promise<Object>} Google authentication response with user data and token.
 * @throws {Error} If Google authentication fails or token validation fails.
 */
const googleAuthApi = async () => {
  try {
    const response = await apiClient.get("/auth/google")
    return response.data
  } catch (error) {
    console.error(
      "Google Login Error:",
      error.response?.data.message || error.message
    )
    throw error
  }
}

/**
 * Initiates the password reset process by sending a reset link to the user's email.
 * @async
 * @function forgetPasswordApi
 * @param {string} email - User's email address to send password reset link to
 * @returns {Promise<Object>} Response confirming password reset email has been sent.
 * @throws {Error} If email doesn't exist or sending reset email fails.
 */
const forgetPasswordApi = async (email) => {
  try {
    const response = await apiClient.post("/auth/forgot-password", email)
    return response.data
  } catch (error) {
    console.error(
      "Forget Password error:",
      error.response?.data.message || error.message
    )
    throw error
  }
}

/**
 * Resets the user's password using a valid password reset token.
 * The token is sent to the user's email via the forgot password process.
 * @async
 * @function resetPasswordApi
 * @param {Object} params - Reset password parameters
 * @param {string} params.token - Password reset token from email
 * @param {string} params.password - New password to set for the user account
 * @returns {Promise<Object>} Password reset confirmation response.
 * @throws {Error} If token is invalid, expired, or password reset fails.
 */
const resetPasswordApi = async ({token, password}) => {
  try {
    const response = await apiClient.post(
      `/auth/reset-password/${token}`,
      {password}
    )
    return response.data
  } catch (error) {
    console.error(
      "Reset Password error:",
      error.response?.data.message || error.message
    )
    throw error
  }
}

export {
  loginApi,
  registerApi,
  verifyEmail,
  resendEmailVerification,
  getMe,
  logoutApi,
  googleAuthApi,
  forgetPasswordApi,
  resetPasswordApi,
}

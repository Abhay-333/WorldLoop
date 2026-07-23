import axios from "axios"
import { apiClient } from "@/shared/lib/apiClient"

const loginApi = async (userData) => {
  try {
    const response = await apiClient.post("/auth/login", userData)
    return response.data
  } catch (error) {
    console.error("Login error:", error.response || error.message)
    throw error
  }
}

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

const getMe = async () => {
  try {
    const response = await apiClient.get("/auth/me")
    return response.data
  } catch (error) {
    console.error("getMe Error:", error.response?.data.message || error.message)
    throw error
  }
}

const logout = async () => {
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

const googleAuthApi = async () => {
  try {
    const response = await apiClient.post("/auth/google")
    return response.data
  } catch (error) {
    console.error(
      "Google Login Error:",
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
  logout,
  googleAuthApi,
}

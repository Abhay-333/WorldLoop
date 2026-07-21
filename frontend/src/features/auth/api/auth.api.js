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
    const response = await apiClient.get("/auth/logout")
    return response.data
  } catch (error) {
    console.error(
      "Logout Error:",
      error.response?.data.message || error.message
    )
    throw error
  }
}

export { loginApi, registerApi, getMe, logout }

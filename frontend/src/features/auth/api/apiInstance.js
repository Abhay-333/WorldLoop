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

export { loginApi, registerApi }

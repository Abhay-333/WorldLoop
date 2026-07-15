import axios from "axios"

const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json", // Content-Type HTTP header server ko batata hai ki request body kis format me bheji ja rahi hai.
  },
  withCredentials: true,
})

const loginApi = async (userData) => {
  try {
    const response = await apiInstance.post("/auth/login", userData)
    return response.data
  } catch (error) {
    console.error("Login error:", error.response || error.message)
    throw error
  }
}

const registerApi = async (userData) => {
  try {
    const response = await apiInstance.post("/auth/register", userData)
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

export default apiInstance

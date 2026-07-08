import axios from "axios"

const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json", // Content-Type HTTP header server ko batata hai ki request body kis format me bheji ja rahi hai.
  },
})

const loginApi = async (email, password) => {
  try {
    const response = await apiInstance.post("/auth/login", { email, password })
    return response.data
  } catch (error) {
    console.error("Login error:", error)
    throw error
  }
}

const registerApi = async (userData) => {
  try {
    const response = await apiInstance.post("/auth/register", userData)
    return response.data
  } catch (error) {
    console.error("Register error:", error)
    throw error
  }
}

export { loginApi, registerApi }

export default apiInstance

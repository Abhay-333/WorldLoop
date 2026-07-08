import axios from "axios"

const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json", // Content-Type HTTP header server ko batata hai ki request body kis format me bheji ja rahi hai.
  },
})

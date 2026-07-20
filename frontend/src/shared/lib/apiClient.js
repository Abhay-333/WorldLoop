import axios from "axios"
import { env } from "@/config/env"

export const apiClient = axios.create({
  baseURL: env.VITE_API_BASE_URL,
  withCredentials: true,    // refresh token httpOnly cookie ke liye
})

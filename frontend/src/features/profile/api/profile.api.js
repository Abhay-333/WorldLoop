import { apiClient } from "@/shared/lib/apiClient"
import toast from "react-hot-toast"

const updateAvatarApi = async () => {
  try {
    const result = apiClient.patch("/users/profile/avatar")
    return result.data
  } catch (error) {
    console.error("Update Profile error:", error.response || error.message)
    throw error
  }
}

import { useMutation } from "@tanstack/react-query"
import { resetPasswordApi } from "../api/auth.api"
import toast from "react-hot-toast"

const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPasswordApi,
    onSuccess: (response) => {
      toast.success(response.message || "Password reset successfully.")
    },
    onError: (error) => {
      toast.error(error.response?.data?.message)
    },
  })
}

export default useResetPassword

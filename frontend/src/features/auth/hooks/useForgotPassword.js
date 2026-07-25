import { useMutation } from "@tanstack/react-query"
import { forgetPasswordApi } from "../api/auth.api"
import toast from "react-hot-toast"

const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgetPasswordApi,
    onSuccess: (response) => {
      toast.success(response.message || "Password reset link sent.")
    },
    onError: (error) => {
      toast.error(error.response?.data?.message)
    },
  })
}

export default useForgotPassword

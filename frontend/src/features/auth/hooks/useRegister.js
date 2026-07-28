import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router"
import { registerApi } from "../api/auth.api"
import toast from "react-hot-toast"
import useVerifyEmail from "./useVerifyEmail"

const useRegister = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: registerApi,
    onSuccess: (response) => {
      const user = response.data.newUser
      navigate(`/verify-email`, { state: { email: user.email } })
    },
    onError: (error) => {
      console.log(error)
      toast.error(error.response?.data?.message)
    },
  })
}

export default useRegister

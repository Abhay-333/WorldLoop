import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router"
import { loginApi } from "../api/auth.api"
import toast from "react-hot-toast"

const useLogin = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      queryClient.setQueryData(["auth", "me"], data.data.user)
      navigate("/home")
    },
    onError: (error) => {
      toast.error(error.response?.data?.message) // error.response?.data?.message dikhana toast/form mein
    },
  })
}
export default useLogin

import { useMutation } from "@tanstack/react-query"
import { queryClient } from "@/app/query-client"
import { useNavigate } from "react-router"
import { loginApi } from "../api/auth.api"
import toast from "react-hot-toast"

const useLogin = () => {
  const navigate = useNavigate()
  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      queryClient.setQueryData(["auth", "me"], data.user)
      navigate("/home")
    },
    onError: (error) => {
      toast.error(error.response?.data?.message) // error.response?.data?.message dikhana toast/form mein
    },
  })
}
export default useLogin

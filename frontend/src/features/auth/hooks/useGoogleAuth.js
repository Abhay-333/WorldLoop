import { useMutation } from "@tanstack/react-query"
import { googleAuthApi } from "../api/auth.api"
import toast from "react-hot-toast"
import { useNavigate } from "react-router"
import { useGoogleLogin } from "@react-oauth/google"

const useGoogleAuth = () => {
  const navigate = useNavigate()
  const mutation = useMutation({
    mutationFn: (code) => googleAuthApi(code),
    onSuccess: (data) => {
      navigate("/home")
    },
    onError: (error) => {
      console.log(error)
      toast.error(error.response?.data?.message) // error.response?.data?.message dikhana toast/form mein
    },
  })
  const login = useGoogleLogin({
    flow: "auth-code",
    onSuccess: (response) => mutation.mutate(response.code),
    onError: (error) => toast.error("Google Login Failed."),
  })

  return { login, isPending: mutation.isPending }
}

export default useGoogleAuth

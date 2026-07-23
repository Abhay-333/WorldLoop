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
      // Cache mein user ka data seedha daal do — extra GET /me call nahi lagegi
      queryClient.setQueryData(["auth", "me"], user)
      navigate(`/verify-email`, { state: { email: user.email } }) // navigate to verify-email after create the verification page
    },
    onError: (error) => {
      console.log(error)
      toast.error(error.response?.data?.message) // error.response?.data?.message dikhana toast/form mein
    },
  })
}

export default useRegister

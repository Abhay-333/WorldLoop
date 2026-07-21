import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router"
import { registerApi } from "../api/auth.api"
import toast from "react-hot-toast"

const useRegister = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: registerApi,
    onSuccess: (data) => {
      // Cache mein user ka data seedha daal do — extra GET /me call nahi lagegi
      queryClient.setQueryData(["auth", "me"], data.user)
      navigate("/verify-email") // navigate to verify-email after create the verification page
    },
    onError: (error) => {
      toast.error(error.response?.data?.message) // error.response?.data?.message dikhana toast/form mein
    },
  })
}

export default useRegister

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router"
import { loginApi } from "../api/auth.api"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import { setCredentials } from "../authSlice"

const useLogin = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const dispatch = useDispatch()

  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      const { user, accessToken } = data.data
      queryClient.setQueryData(["me"], { ...data, data: user })
      dispatch(setCredentials({ user, token: accessToken }))
      navigate("/home")
    },
    onError: (error) => {
      toast.error(error.response?.data?.message) // error.response?.data?.message dikhana toast/form mein
    },
  })
}
export default useLogin

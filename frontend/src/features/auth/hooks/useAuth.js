import { useForm } from "react-hook-form"
import { registerApi, loginApi } from "../api/auth.api"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router"
import useRegister from "./useRegister"
import useLogin from "./useLogin"

const useAuth = () => {
  const navigate = useNavigate()

  return { useRegister, useLogin }
}

export default useAuth

import { useForm } from "react-hook-form"
import { registerApi, loginApi } from "../api/auth.api"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router"

const useAuth = () => {
  const navigate = useNavigate()

  const handleRegisterFormSubmit = async (data) => {
    try {
      const result = await registerApi(
        {
          email: data.email,
          password: data.password,
          username: data.username,
        },
        { withCredentials: true }
      )
      toast.success(
        "Registration successful! Please check your email to verify your account."
      )
      navigate("/")
    } catch (error) {
      console.error(
        "Registration error:",
        error.response?.data.message || error.message
      )
      toast.error(
        `Registration failed. ${error.response?.data.message || error.message}`
      )
    }
  }

  const handleLoginFormSubmit = async (data) => {
    try {
      const result = await loginApi(
        {
          email: data.email,
          password: data.password,
        },
        { withCredentials: true }
      )
      toast.success("Login successful!")
      navigate("/home")
    } catch (error) {
      console.error(
        "Login error:",
        error.response?.data.message || error.message
      )
      toast.error(
        `Login failed. ${error.response?.data.message || error.message}`
      )
    }
  }
  return { handleRegisterFormSubmit, handleLoginFormSubmit }
}

export default useAuth

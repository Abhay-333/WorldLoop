import { useQuery } from "@tanstack/react-query"
import { verifyEmail } from "../api/auth.api"

const useResendVerification = () => {
  return useQuery({
    queryKey: ["auth", "verify-email", token],
    queryFn: () => verifyEmail(token),
    enabled: !!token, // use to run the query based on the condition if the token is available or not
    retry: false,
  })
}

export default useResendVerification

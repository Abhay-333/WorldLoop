import { useMutation, useQueryClient } from "@tanstack/react-query"
import { resendEmailVerification } from "../api/auth.api"

const useResendVerification = () => {
  return useMutation({
    mutationFn: resendEmailVerification(),
  })
}

export default useResendVerification

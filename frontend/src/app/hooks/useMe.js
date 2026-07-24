import { getMe } from "@/features/auth/api/auth.api"
import { useQuery } from "@tanstack/react-query"

const useMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
    staleTime: 5 * 60 * 1000,
  })
}

export default useMe

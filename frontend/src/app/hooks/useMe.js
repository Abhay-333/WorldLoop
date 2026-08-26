import { getMe } from "@/features/auth/api/auth.api"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setUser } from "@/features/auth/authSlice"

const useMe = () => {
  const dispatch = useDispatch()
  const query = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
    staleTime: 5 * 60 * 1000,
  })

  useEffect(() => {
    if (query.data?.success && query.data.data) {
      dispatch(setUser(query.data.data))
    }
  }, [dispatch, query.data])

  return query
}

export default useMe

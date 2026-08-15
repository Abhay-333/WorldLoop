import { useQuery } from "@tanstack/react-query"
import { getProfileApi } from "../api/profile.api"
import toast from "react-hot-toast"

const useProfile = () => {
  return useQuery({
    queryKey: ["profile", username],
    queryFn: () => getProfileApi(username),
    enabled: Boolean(username),
  })
}

export default useProfile   
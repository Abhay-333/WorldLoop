import { useInfiniteQuery } from "@tanstack/react-query"
import { getProfileApi } from "../api/profile.api"

const useProfilePosts = () => {
  return useInfiniteQuery({
    queryKey: ["user-posts", username],
    queryFn: ({ pageParam }) =>
      getProfileApi({ username, cursor: pageParam, limit: POSTS_PER_PAGE }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    enabled: Boolean(username),
  })
}

export default useProfilePosts

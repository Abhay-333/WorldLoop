import { useInfiniteQuery } from "@tanstack/react-query"
import { getPostsApi } from "../api/profile.api"

const POSTS_PER_PAGE = 12

const useProfilePosts = (username, activeTab) => {
  return useInfiniteQuery({
    queryKey: ["user-posts", username],
    queryFn: ({ pageParam }) =>
      getPostsApi({ username, cursor: pageParam, limit: POSTS_PER_PAGE }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    enabled: Boolean(username),
  })
}

export default useProfilePosts

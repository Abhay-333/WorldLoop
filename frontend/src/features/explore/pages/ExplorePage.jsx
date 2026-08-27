// src/features/explore/components/ExplorePage.tsx
import { useEffect, useState } from "react"
import { Search } from "lucide-react"
import ExploreGridItem from "../components/ExploreGridItem"
import Loading from "@/components/custom/Loading"
import { MOCK_POSTS, SPAN_PATTERN } from "@/components/utils/componentsUtils"

function ExplorePage() {
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 700)
    return () => window.clearTimeout(timer)
  }, [])

  if (isLoading) return <Loading label="Loading explore..." />

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      <div className="mb-6 flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-2.5">
        <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search"
          className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />
      </div>

      <div className="grid auto-rows-[180px] grid-cols-3 gap-1 sm:gap-1.5">
        {MOCK_POSTS.map((post, i) => (
          <ExploreGridItem
            key={post.id}
            post={post}
            span={SPAN_PATTERN[i % SPAN_PATTERN.length]}
          />
        ))}
      </div>
    </div>
  )
}

export default ExplorePage
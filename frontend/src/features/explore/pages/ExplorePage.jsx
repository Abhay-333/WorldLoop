// src/features/explore/components/ExplorePage.tsx
import { useState } from "react"
import { Search } from "lucide-react"
import ExploreGridItem from "./ExploreGridItem"

// TODO: replace with TanStack Query hook -> GET /api/posts/explore (cursor-paginated per SRS)
const MOCK_POSTS = [
  { id: "1", thumbnail: "https://picsum.photos/id/10/500/700", likes: 245, comments: 12, isVideo: false },
  { id: "2", thumbnail: "https://picsum.photos/id/20/500/500", likes: 89, comments: 4, isVideo: true },
  { id: "3", thumbnail: "https://picsum.photos/id/30/500/500", likes: 1023, comments: 56, isVideo: false },
  { id: "4", thumbnail: "https://picsum.photos/id/40/500/700", likes: 312, comments: 21, isVideo: false },
  { id: "5", thumbnail: "https://picsum.photos/id/50/500/500", likes: 67, comments: 2, isVideo: true },
  { id: "6", thumbnail: "https://picsum.photos/id/60/500/500", likes: 540, comments: 33, isVideo: false },
  { id: "7", thumbnail: "https://picsum.photos/id/70/500/700", likes: 198, comments: 9, isVideo: false },
  { id: "8", thumbnail: "https://picsum.photos/id/80/500/500", likes: 76, comments: 3, isVideo: false },
  { id: "9", thumbnail: "https://picsum.photos/id/90/500/500", likes: 2100, comments: 145, isVideo: true },
]

// Repeating span pattern to create the Instagram-style masonry rhythm.
// Every 7th tile is a tall 2-row feature tile, breaking up the grid visually.
const SPAN_PATTERN = ["row-span-1", "row-span-1", "row-span-2", "row-span-1", "row-span-1", "row-span-1", "row-span-2"]

function ExplorePage() {
  const [query, setQuery] = useState("")

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
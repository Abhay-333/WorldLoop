// src/features/explore/components/ExploreGridItem.tsx
import { Heart, MessageCircle, Play } from "lucide-react"

function ExploreGridItem({ post, span }) {
  return (
    <div
      className={`group relative cursor-pointer overflow-hidden rounded-md bg-muted ${span}`}
    >
      <img
        src={post.thumbnail}
        alt={post.caption ?? "Post"}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />

      {post.isVideo && (
        <Play className="absolute top-2 right-2 h-5 w-5 fill-white text-white drop-shadow" />
      )}

      <div className="absolute inset-0 flex items-center justify-center gap-6 bg-black/0 opacity-0 transition-all duration-200 group-hover:bg-black/40 group-hover:opacity-100">
        <span className="flex items-center gap-1.5 font-semibold text-white">
          <Heart className="h-5 w-5 fill-white" />
          {post.likes}
        </span>
        <span className="flex items-center gap-1.5 font-semibold text-white">
          <MessageCircle className="h-5 w-5 fill-white" />
          {post.comments}
        </span>
      </div>
    </div>
  )
}

export default ExploreGridItem
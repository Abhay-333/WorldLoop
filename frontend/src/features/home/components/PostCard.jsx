import { useState } from "react"
import { Avatar } from "./Avatar"
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
} from "lucide-react"
import { Input } from "../../../components/ui/input"

function PostCard({ post }) {
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const [likeCount, setLikeCount] = useState(post.likes)

  const toggleLike = () => {
    setLiked((v) => !v)
    setLikeCount((c) => (liked ? c - 1 : c + 1))
  }

  return (
    <div className="mb-6 overflow-hidden rounded-2xl border border-border bg-card text-card-foreground">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <Avatar name={post.user} size={36} />
          <div>
            <p className="text-sm font-semibold text-foreground">{post.user}</p>
            <p className="text-xs text-muted-foreground">{post.time}</p>
          </div>
        </div>
        <button className="text-muted-foreground hover:text-foreground">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>

      <img
        src={post.image}
        alt={`${post.user}'s post`}
        className="aspect-square w-full object-cover"
      />

      <div className="px-4 pt-3 pb-4">
        <div className="flex items-center gap-4">
          <button onClick={toggleLike} aria-label="Like">
            <Heart
              className={`h-6 w-6 transition-colors ${
                liked ? "fill-accent text-accent" : "text-foreground"
              }`}
            />
          </button>
          <button aria-label="Comment">
            <MessageCircle className="h-6 w-6 text-foreground" />
          </button>
          <button aria-label="Share">
            <Send className="h-6 w-6 text-foreground" />
          </button>
          <button
            onClick={() => setSaved((v) => !v)}
            aria-label="Save"
            className="ml-auto"
          >
            <Bookmark
              className={`h-6 w-6 transition-colors ${
                saved ? "fill-foreground text-foreground" : "text-foreground"
              }`}
            />
          </button>
        </div>

        <p className="mt-2 text-sm font-semibold text-foreground">
          {likeCount.toLocaleString()} likes
        </p>
        <p className="mt-1 text-sm text-foreground">
          <span className="font-semibold">{post.user}</span> {post.caption}
        </p>
        {post.comments > 0 && (
          <button className="mt-1 text-sm text-muted-foreground hover:text-muted-foreground">
            View all {post.comments} comments
          </button>
        )}

        <div className="mt-3 flex items-center gap-2 border-t border-border pt-3">
          <Input
            placeholder="Add a comment..."
            className="h-9 border-none bg-transparent px-0 text-sm shadow-none focus-visible:ring-0"
          />
          <button className="shrink-0 text-sm font-semibold text-accent hover:text-accent">
            Post
          </button>
        </div>
      </div>
    </div>
  )
}

export default PostCard

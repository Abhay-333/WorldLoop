import { useFonts } from "../../styles/hooks/useFonts"
import PostCard from "../../components/custom/PostCard"
import { POSTS, STORIES } from "../../components/utils/componentsUtils"
import StoryAvatar from "../../components/custom/StoryAvatar"
import OwnStory from "../../components/custom/OwnStory"

/**
 * WorldLoop — Home Feed
 *
 * Instagram-style layout: fixed left sidebar nav, center stories + post
 * feed, right-side follow suggestions panel. Built with the WorldLoop
 * identity (coral-to-gold accent, dark avatar badge, warm surfaces).
 *
 * Adjust the "../hooks/useFonts" import path to match wherever this file
 * actually lives in your feature-based folder structure.
 *
 * Avatars are generated locally (colored initial circles) instead of
 * external face-photo services, so there's no extra dependency or
 * copyright concern — swap Avatar's img fallback in when you have real
 * user photos from your API.
 */

function Feed() {
  useFonts()

  return (
    <section className="w-full">
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div>
        <div className="mb-6 no-scrollbar flex gap-4 overflow-x-auto rounded-2xl border border-border bg-card p-4 text-card-foreground">
          <OwnStory />
          {STORIES.map((s) => (
            <StoryAvatar key={s.name} {...s} />
          ))}
        </div>

        {POSTS.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

    
    </section>
  )
}

export default Feed

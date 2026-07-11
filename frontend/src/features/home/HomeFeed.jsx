import { useState } from "react"
import {
  Home,
  Search,
  MessageCircle,
  Heart,
  PlusSquare,
  User,
  MoreHorizontal,
  Send,
  Bookmark,
  Plus,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { useFonts } from "../../styles/hooks/useFonts"

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

const NAV_ITEMS = [
  { icon: Home, label: "Home" },
  { icon: Search, label: "Explore" },
  { icon: MessageCircle, label: "Messages" },
  { icon: Heart, label: "Notifications" },
  { icon: PlusSquare, label: "Create" },
  { icon: User, label: "Profile" },
]

const STORIES = [
  { name: "Priya", viewed: false },
  { name: "Rohit", viewed: false },
  { name: "Meera", viewed: true },
  { name: "Karan", viewed: false },
  { name: "Sana", viewed: true },
  { name: "Dev", viewed: false },
]

const POSTS = [
  {
    id: 1,
    user: "priya.codes",
    time: "2h",
    image: "https://picsum.photos/seed/wl1/600/600",
    likes: 234,
    caption: "Shipped the new onboarding flow today 🚀",
    comments: 12,
  },
  {
    id: 2,
    user: "karan.designs",
    time: "5h",
    image: "https://picsum.photos/seed/wl2/600/600",
    likes: 891,
    caption: "Sunset from the office rooftop 🌅",
    comments: 47,
  },
  {
    id: 3,
    user: "sana.builds",
    time: "1d",
    image: "https://picsum.photos/seed/wl3/600/600",
    likes: 156,
    caption: "First open source PR merged today. Feels good!",
    comments: 8,
  },
]

const SUGGESTIONS = [
  { username: "rohit.dev", subtitle: "Followed by karan.designs" },
  { username: "meera.ux", subtitle: "Suggested for you" },
  { username: "dev.ops", subtitle: "New to WorldLoop" },
  { username: "ananya.ml", subtitle: "Followed by priya.codes" },
  { username: "vikram.js", subtitle: "Suggested for you" },
]

const AVATAR_COLORS = ["#FF5C7A", "#FF8A5B", "#FFC24B", "#12B8A6", "#6C63FF", "#1F1B24"]

function getAvatarColor(name) {
  const sum = [...name].reduce((acc, ch) => acc + ch.charCodeAt(0), 0)
  return AVATAR_COLORS[sum % AVATAR_COLORS.length]
}

function Avatar({ name, size = 44 }) {
  const initial = name?.[0]?.toUpperCase() ?? "?"
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-full font-semibold text-white"
      style={{
        width: size,
        height: size,
        backgroundColor: getAvatarColor(name),
        fontSize: size * 0.4,
      }}
    >
      {initial}
    </div>
  )
}

function StoryAvatar({ name, viewed }) {
  return (
    <div className="flex w-16 shrink-0 flex-col items-center gap-1.5">
      <div
        className="rounded-full p-[2.5px]"
        style={{
          background: viewed
            ? "#EFE7E1"
            : "linear-gradient(135deg, #FF5C7A, #FFC24B)",
        }}
      >
        <div className="rounded-full bg-white p-[2px]">
          <Avatar name={name} size={56} />
        </div>
      </div>
      <span className="w-full truncate text-center text-[11px] text-[#5C5560]">
        {name}
      </span>
    </div>
  )
}

function OwnStory() {
  return (
    <div className="flex w-16 shrink-0 flex-col items-center gap-1.5">
      <div className="relative">
        <div className="rounded-full bg-[#EFE7E1] p-[2.5px]">
          <div className="rounded-full bg-white p-[2px]">
            <Avatar name="Abhay Sharma" size={56} />
          </div>
        </div>
        <div className="absolute -right-1 -bottom-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-[#FF3D66]">
          <Plus className="h-3 w-3 text-white" strokeWidth={3} />
        </div>
      </div>
      <span className="text-[11px] text-[#5C5560]">Your story</span>
    </div>
  )
}

function PostCard({ post }) {
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const [likeCount, setLikeCount] = useState(post.likes)

  const toggleLike = () => {
    setLiked((v) => !v)
    setLikeCount((c) => (liked ? c - 1 : c + 1))
  }

  return (
    <div className="mb-6 overflow-hidden rounded-2xl border border-[#F0E9E3] bg-white">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <Avatar name={post.user} size={36} />
          <div>
            <p className="text-sm font-semibold text-[#1F1B24]">{post.user}</p>
            <p className="text-xs text-[#B7AFB9]">{post.time}</p>
          </div>
        </div>
        <button className="text-[#8A8390] hover:text-[#1F1B24]">
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
                liked ? "fill-[#FF3D66] text-[#FF3D66]" : "text-[#1F1B24]"
              }`}
            />
          </button>
          <button aria-label="Comment">
            <MessageCircle className="h-6 w-6 text-[#1F1B24]" />
          </button>
          <button aria-label="Share">
            <Send className="h-6 w-6 text-[#1F1B24]" />
          </button>
          <button
            onClick={() => setSaved((v) => !v)}
            aria-label="Save"
            className="ml-auto"
          >
            <Bookmark
              className={`h-6 w-6 transition-colors ${
                saved ? "fill-[#1F1B24] text-[#1F1B24]" : "text-[#1F1B24]"
              }`}
            />
          </button>
        </div>

        <p className="mt-2 text-sm font-semibold text-[#1F1B24]">
          {likeCount.toLocaleString()} likes
        </p>
        <p className="mt-1 text-sm text-[#1F1B24]">
          <span className="font-semibold">{post.user}</span> {post.caption}
        </p>
        {post.comments > 0 && (
          <button className="mt-1 text-sm text-[#8A8390] hover:text-[#5C5560]">
            View all {post.comments} comments
          </button>
        )}

        <div className="mt-3 flex items-center gap-2 border-t border-[#F0E9E3] pt-3">
          <Input
            placeholder="Add a comment..."
            className="h-9 border-none bg-transparent px-0 text-sm shadow-none focus-visible:ring-0"
          />
          <button className="shrink-0 text-sm font-semibold text-[#FF3D66] hover:text-[#ff2857]">
            Post
          </button>
        </div>
      </div>
    </div>
  )
}

function SuggestionsPanel() {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <Avatar name="Abhay Sharma" size={44} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-[#1F1B24]">
            abhaydev
          </p>
          <p className="truncate text-xs text-[#8A8390]">Abhay Sharma</p>
        </div>
        <button className="shrink-0 text-xs font-semibold text-[#FF3D66]">
          Switch
        </button>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-[#8A8390]">
          Suggested for you
        </p>
        <button className="text-xs font-semibold text-[#1F1B24] hover:text-[#5C5560]">
          See All
        </button>
      </div>

      <div className="space-y-4">
        {SUGGESTIONS.map((s) => (
          <div key={s.username} className="flex items-center gap-3">
            <Avatar name={s.username} size={40} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-[#1F1B24]">
                {s.username}
              </p>
              <p className="truncate text-xs text-[#8A8390]">{s.subtitle}</p>
            </div>
            <button className="shrink-0 text-xs font-semibold text-[#FF3D66] hover:text-[#ff2857]">
              Follow
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

function Sidebar() {
  const [active, setActive] = useState("Home")
  return (
    <aside className="fixed top-0 left-0 hidden h-screen w-64 flex-col justify-between border-r border-[#F0E9E3] bg-white px-4 py-6 md:flex">
      <div>
        <div className="mb-8 flex items-center gap-2 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1F1B24]">
            <span className="text-sm font-extrabold text-white">W</span>
          </div>
          <span className="text-lg font-bold text-[#1F1B24]">WorldLoop</span>
        </div>
        <nav className="space-y-1">
          {NAV_ITEMS.map(({ icon: Icon, label }) => (
            <button
              key={label}
              onClick={() => setActive(label)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                active === label
                  ? "bg-[#FFF1E9] font-semibold text-[#FF3D66]"
                  : "text-[#1F1B24] hover:bg-[#FAF7F4]"
              }`}
            >
              <Icon className="h-5 w-5" />
              {label}
            </button>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-2 rounded-xl px-2 py-2 hover:bg-[#FAF7F4]">
        <Avatar name="Abhay Sharma" size={32} />
        <span className="text-sm font-medium text-[#1F1B24]">abhaydev</span>
      </div>
    </aside>
  )
}

function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 z-10 flex w-full items-center justify-around border-t border-[#F0E9E3] bg-white py-2 md:hidden">
      {NAV_ITEMS.slice(0, 5).map(({ icon: Icon, label }) => (
        <button key={label} className="p-2 text-[#1F1B24]" aria-label={label}>
          <Icon className="h-6 w-6" />
        </button>
      ))}
    </nav>
  )
}

export default function HomeFeed() {
  useFonts()

  return (
    <div
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      className="min-h-screen bg-[#FAF7F4]"
    >
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <Sidebar />

      <div className="md:pl-64">
        <div className="mx-auto flex max-w-6xl gap-8 px-4 pt-6 pb-20 md:pb-6">
          <main className="mx-auto w-full max-w-[470px] lg:mx-0">
            <div className="no-scrollbar mb-6 flex gap-4 overflow-x-auto rounded-2xl border border-[#F0E9E3] bg-white p-4">
              <OwnStory />
              {STORIES.map((s) => (
                <StoryAvatar key={s.name} {...s} />
              ))}
            </div>

            {POSTS.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </main>

          <aside className="hidden w-72 shrink-0 pt-2 lg:block">
            <SuggestionsPanel />
          </aside>
        </div>
      </div>

      <MobileNav />
    </div>
  )
}
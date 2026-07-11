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
import SuggestionsPanel from "./components/SuggestionsPanel"
import PostCard from "./components/PostCard"
import Sidebar from "./components/Sidebar"
// import { Link } from "react-router"

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

const AVATAR_COLORS = [
  "#FF5C7A",
  "#FF8A5B",
  "#FFC24B",
  "#12B8A6",
  "#6C63FF",
  "#1F1B24",
]

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
            <div className="mb-6 no-scrollbar flex gap-4 overflow-x-auto rounded-2xl border border-[#F0E9E3] bg-white p-4">
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

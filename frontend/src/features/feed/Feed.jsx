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
import SuggestionsPanel from "../../components/custom/SuggestionsPanel"
import PostCard from "../../components/custom/PostCard"
import Sidebar from "../../components/custom/Sidebar"
import {
  AVATAR_COLORS,
  POSTS,
  STORIES,
  NAV_ITEMS,
} from "../../components/utils/componentsUtils"
import { Avatar } from "../../components/custom/Avatar"
import StoryAvatar from "../../components/custom/StoryAvatar"
import OwnStory from "../../components/custom/OwnStory"
import MobileNav from "../../components/custom/MobileNav"
import ThemeButton from "../theme/ThemeButton"
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

export default function HomeFeed() {
  useFonts()

  return (
    <div
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      className="flex min-h-screen w-full items-center justify-center bg-background text-foreground"
    >
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <Sidebar />

      <div className="md:pl-64">
        <div className="mx-auto flex max-w-6xl gap-8 px-4 pt-6 pb-20 md:pb-6">
          <main className="mx-auto w-full max-w-[470px] lg:mx-0">
            <div className="mb-6 no-scrollbar flex gap-4 overflow-x-auto rounded-2xl border border-border bg-card p-4 text-card-foreground">
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

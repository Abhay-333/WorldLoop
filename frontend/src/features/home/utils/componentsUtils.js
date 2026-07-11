import {
  Home,
  Search,
  MessageCircle,
  Heart,
  PlusSquare,
  User,
} from "lucide-react"

const SUGGESTIONS = [
  { username: "rohit.dev", subtitle: "Followed by karan.designs" },
  { username: "meera.ux", subtitle: "Suggested for you" },
  { username: "dev.ops", subtitle: "New to WorldLoop" },
  { username: "ananya.ml", subtitle: "Followed by priya.codes" },
  { username: "vikram.js", subtitle: "Suggested for you" },
]

const NAV_ITEMS = [
  { icon: Home, label: "Home" },
  { icon: Search, label: "Explore" },
  { icon: MessageCircle, label: "Messages" },
  { icon: Heart, label: "Notifications" },
  { icon: PlusSquare, label: "Create" },
  { icon: User, label: "Profile" },
]

const AVATAR_COLORS = [
  "#FF5C7A",
  "#FF8A5B",
  "#FFC24B",
  "#12B8A6",
  "#6C63FF",
  "#1F1B24",
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

const STORIES = [
  { name: "Priya", viewed: false },
  { name: "Rohit", viewed: false },
  { name: "Meera", viewed: true },
  { name: "Karan", viewed: false },
  { name: "Sana", viewed: true },
  { name: "Dev", viewed: false },
]

export { SUGGESTIONS, NAV_ITEMS, AVATAR_COLORS, POSTS, STORIES }

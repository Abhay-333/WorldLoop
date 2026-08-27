import {
  Home,
  Search,
  MessageCircle,
  Heart,
  PlusSquare,
  User,
  LogOut,
} from "lucide-react"

const SUGGESTIONS = [
  { username: "rohit.dev", subtitle: "Followed by karan.designs" },
  { username: "meera.ux", subtitle: "Suggested for you" },
  { username: "dev.ops", subtitle: "New to WorldLoop" },
  { username: "ananya.ml", subtitle: "Followed by priya.codes" },
  { username: "vikram.js", subtitle: "Suggested for you" },
]

const NAV_ITEMS = [
  { icon: Home, label: "Home", navigateTo: "/home" },
  { icon: Search, label: "Explore", navigateTo: "/home/explore" },
  { icon: MessageCircle, label: "Messages", navigateTo: "/home/messages" },
  { icon: Heart, label: "Notifications", navigateTo: "/home/notifications" },
  { icon: PlusSquare, label: "Create", navigateTo: "/home/create" },
  { icon: User, label: "Profile", navigateTo: "/home/profile" },
  { icon: LogOut, label: "Logout", action: "logout" },
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

// TODO: replace with TanStack Query hook -> GET /api/posts/explore (cursor-paginated per SRS)
const MOCK_POSTS = [
  {
    id: "1",
    thumbnail: "https://picsum.photos/id/10/500/700",
    likes: 245,
    comments: 12,
    isVideo: false,
  },
  {
    id: "2",
    thumbnail: "https://picsum.photos/id/20/500/500",
    likes: 89,
    comments: 4,
    isVideo: true,
  },
  {
    id: "3",
    thumbnail: "https://picsum.photos/id/30/500/500",
    likes: 1023,
    comments: 56,
    isVideo: false,
  },
  {
    id: "4",
    thumbnail: "https://picsum.photos/id/40/500/700",
    likes: 312,
    comments: 21,
    isVideo: false,
  },
  {
    id: "5",
    thumbnail: "https://picsum.photos/id/50/500/500",
    likes: 67,
    comments: 2,
    isVideo: true,
  },
  {
    id: "6",
    thumbnail: "https://picsum.photos/id/60/500/500",
    likes: 540,
    comments: 33,
    isVideo: false,
  },
  {
    id: "7",
    thumbnail: "https://picsum.photos/id/70/500/700",
    likes: 198,
    comments: 9,
    isVideo: false,
  },
  {
    id: "8",
    thumbnail: "https://picsum.photos/id/80/500/500",
    likes: 76,
    comments: 3,
    isVideo: false,
  },
  {
    id: "9",
    thumbnail: "https://picsum.photos/id/90/500/500",
    likes: 2100,
    comments: 145,
    isVideo: true,
  },
]

// Repeating span pattern to create the Instagram-style masonry rhythm.
// Every 7th tile is a tall 2-row feature tile, breaking up the grid visually.
const SPAN_PATTERN = [
  "row-span-1",
  "row-span-1",
  "row-span-2",
  "row-span-1",
  "row-span-1",
  "row-span-1",
  "row-span-2",
]


const MOCK_GALLERY = [
  { id: "g1", tone: "#6C5CE7" },
  { id: "g2", tone: "#FF6B4A" },
  { id: "g3", tone: "#2FB6A6" },
  { id: "g4", tone: "#E8A33D" },
  { id: "g5", tone: "#E85D8A" },
  { id: "g6", tone: "#4E9AE8" },
  { id: "g7", tone: "#6C5CE7" },
  { id: "g8", tone: "#FF6B4A" },
  { id: "g9", tone: "#2FB6A6" },
];


const MOCK_PEOPLE = [
  { id: "p1", name: "priya.codes", initials: "PC", tone: "#FF6B4A" },
  { id: "p2", name: "arjun_builds", initials: "AB", tone: "#2FB6A6" },
  { id: "p3", name: "meera.designs", initials: "MD", tone: "#4E9AE8" },
  { id: "p4", name: "rohan.dev", initials: "RD", tone: "#6C5CE7" },
];

const TYPE_META = {
  like: { icon: Heart, bg: "bg-red-100 dark:bg-red-950", fg: "text-red-600 dark:text-red-400" },
  comment: { icon: MessageCircle, bg: "bg-blue-100 dark:bg-blue-950", fg: "text-blue-600 dark:text-blue-400" },
  follow: { icon: UserPlus, bg: "bg-emerald-100 dark:bg-emerald-950", fg: "text-emerald-600 dark:text-emerald-400" },
  mention: { icon: AtSign, bg: "bg-violet-100 dark:bg-violet-950", fg: "text-violet-600 dark:text-violet-400" },
  tag: { icon: Tag, bg: "bg-violet-100 dark:bg-violet-950", fg: "text-violet-600 dark:text-violet-400" },
};

const MOCK_DATA = {
  New: [
    {
      id: "n1",
      type: "like",
      unread: true,
      user: { name: "priya.codes", initials: "PC", tone: "coral" },
      timestamp: "2m",
      preview: "liked your post",
      postThumb: true,
    },
    {
      id: "n2",
      type: "follow",
      unread: true,
      user: { name: "arjun_builds", initials: "AB", tone: "teal" },
      timestamp: "14m",
      preview: "started following you",
      followState: "none",
    },
    {
      id: "n3",
      type: "comment",
      unread: true,
      user: { name: "meera.designs", initials: "MD", tone: "sky" },
      timestamp: "26m",
      preview: "\u201cthis loop transition is so smooth\u201d",
      postThumb: true,
    },
  ],
  Today: [
    {
      id: "n4",
      type: "mention",
      unread: false,
      user: { name: "rohan.dev", initials: "RD", tone: "indigo" },
      timestamp: "3h",
      preview: "mentioned you in a comment",
      postThumb: true,
    },
    {
      id: "n5",
      type: "follow",
      unread: false,
      user: { name: "kavya_writes", initials: "KW", tone: "rose" },
      timestamp: "5h",
      preview: "requested to follow you",
      followState: "requested",
    },
    {
      id: "n6",
      type: "like",
      unread: false,
      user: { name: "dev.aditi", initials: "DA", tone: "amber" },
      timestamp: "7h",
      preview: "and 12 others liked your post",
      postThumb: true,
    },
  ],
  "This week": [
    {
      id: "n7",
      type: "tag",
      unread: false,
      user: { name: "sameer.k", initials: "SK", tone: "teal" },
      timestamp: "Mon",
      preview: "tagged you in a photo",
      postThumb: true,
    },
    {
      id: "n8",
      type: "follow",
      unread: false,
      user: { name: "ishaan_ux", initials: "IU", tone: "sky" },
      timestamp: "Sun",
      preview: "started following you",
      followState: "following",
    },
  ],
  Earlier: [
    {
      id: "n9",
      type: "comment",
      unread: false,
      user: { name: "nisha.p", initials: "NP", tone: "coral" },
      timestamp: "Aug 19",
      preview: "\u201cwhere was this shot?\u201d",
      postThumb: true,
    },
  ],
};

export {
  SUGGESTIONS,
  NAV_ITEMS,
  AVATAR_COLORS,
  POSTS,
  STORIES,
  MOCK_POSTS,
  SPAN_PATTERN,
  MOCK_GALLERY,
  MOCK_PEOPLE,
  TYPE_META,
  MOCK_DATA,
}

import { useState } from "react";
import { Heart, MessageCircle, UserPlus, AtSign, Tag } from "lucide-react";
import { Avatar } from "@/components/custom/Avatar";
/**
 * WorldLoop — Notifications page
 * Feature-based location: /notifications/pages/NotificationsPage.jsx
 * Sub-components (ActivityRow, GroupHeader) are colocated below for a single-file
 * preview — split into /notifications/components/ when wiring into the real app.
 *
 * Data shape expected from the API (feed this in via a useNotifications() TanStack
 * Query hook instead of the MOCK_DATA below):
 *   { id, type: 'like'|'comment'|'follow'|'mention'|'tag', unread,
 *     user: { name, initials, tone }, timestamp,
 *     preview?, postThumb?: boolean, followState?: 'none'|'following'|'requested' }
 */

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

// function Avatar({ user, unread, type }) {
//   const size = 44;
//   const r = 20;
//   const c = 2 * Math.PI * r;
//   // signature: a broken loop, not a full ring — reserved for stories elsewhere.
//   // draws roughly a 270° arc, gap sits bottom-right, only for unread items.
//   const arc = c * 0.75;

//   return (
//     <div className="relative shrink-0" style={{ width: size, height: size }}>
//       {unread && (
//         <svg
//           width={size}
//           height={size}
//           viewBox={`0 0 ${size} ${size}`}
//           className="absolute -inset-[3px]"
//           style={{ width: size + 6, height: size + 6, transform: "rotate(135deg)" }}
//         >
//           <defs>
//             <linearGradient id={`loop-${user.name}`} x1="0%" y1="0%" x2="100%" y2="100%">
//               <stop offset="0%" stopColor="#6C5CE7" />
//               <stop offset="100%" stopColor="#FF6B4A" />
//             </linearGradient>
//           </defs>
//           <circle
//             cx={size / 2 + 3}
//             cy={size / 2 + 3}
//             r={r}
//             fill="none"
//             stroke={`url(#loop-${user.name})`}
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeDasharray={`${arc} ${c - arc}`}
//           />
//         </svg>
//       )}
//       <div
//         className="w-full h-full rounded-full flex items-center justify-center font-medium text-[13px]"
//         style={{
//           background: `${TONES[user.tone]}22`,
//           color: TONES[user.tone],
//           fontFamily: "Inter, sans-serif",
//         }}
//       >
//         {user.initials}
//       </div>
//       <TypeBadge type={type} />
//     </div>
//   );
// }

function TypeBadge({ type }) {
  if (!type) return null;
  const meta = TYPE_META[type];
  const Icon = meta.icon;
  return (
    <div
      className={`absolute -bottom-0.5 -right-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full border-[1.5px] border-background ${meta.bg}`}
    >
      <Icon size={10} strokeWidth={2.5} className={meta.fg} fill={type === "like" ? "currentColor" : "none"} />
    </div>
  );
}

function FollowButton({ state: initialState }) {
  const [state, setState] = useState(initialState);

  if (state === "following") {
    return (
      <button
        onClick={() => setState("none")}
        className="shrink-0 rounded-lg border border-border bg-transparent px-4 py-1.5 text-[13px] font-medium text-muted-foreground"
      >
        Following
      </button>
    );
  }
  if (state === "requested") {
    return (
      <button
        className="shrink-0 rounded-lg border border-border bg-transparent px-4 py-1.5 text-[13px] font-medium text-muted-foreground"
      >
        Requested
      </button>
    );
  }
  return (
    <button
      onClick={() => setState("following")}
      className="shrink-0 rounded-lg bg-primary px-4 py-1.5 text-[13px] font-medium text-primary-foreground"
    >
      Follow back
    </button>
  );
}

function ActivityRow({ item }) {
  const meta = TYPE_META[item.type];
  return (
    <div
      className={`flex items-center gap-3 border-b border-border px-4 py-3 transition-colors ${item.unread ? "bg-muted/50" : "bg-transparent"}`}
    >
      <div className="relative h-11 w-11 shrink-0">
        <Avatar name={item.user.name} size={44} />
        <TypeBadge type={item.type} />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm leading-snug text-foreground">
          <span className="font-medium">{item.user.name}</span>{" "}
          <span className="text-muted-foreground">{item.preview}</span>
        </p>
        <span className="text-xs text-muted-foreground">
          {item.timestamp}
        </span>
      </div>

      {item.type === "follow" ? (
        <FollowButton state={item.followState} />
      ) : item.postThumb ? (
        <div
          className="h-11 w-11 shrink-0 rounded-md bg-muted"
        />
      ) : null}
    </div>
  );
}

function GroupHeader({ label }) {
  return (
    <div className="px-4 pt-5 pb-2">
      <span
        className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground"
      >
        {label}
      </span>
    </div>
  );
}

export default function NotificationsPage() {
  const [tab, setTab] = useState("all");
  const requestCount = Object.values(MOCK_DATA)
    .flat()
    .filter((n) => n.followState === "requested").length;

  return (
    <div className="mx-auto min-h-screen w-full max-w-3xl pb-12">
      <div className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur">
        <div className="px-4 pb-3 pt-6 sm:px-0">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Notifications
          </h1>
        </div>
        <div className="flex gap-6 px-4 sm:px-0">
          {[
            { key: "all", label: "All" },
            { key: "requests", label: `Requests${requestCount ? ` (${requestCount})` : ""}` },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`relative pb-3 text-sm font-medium ${tab === t.key ? "text-foreground" : "text-muted-foreground"}`}
            >
              {t.label}
              {tab === t.key && (
                <span
                  className="absolute right-0 -bottom-px left-0 h-0.5 rounded-full bg-primary"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="pb-8">
        {tab === "all" &&
          Object.entries(MOCK_DATA).map(([label, items]) => (
            <div key={label}>
              <GroupHeader label={label} />
              {items.map((item) => (
                <ActivityRow key={item.id} item={item} />
              ))}
            </div>
          ))}

        {tab === "requests" && (
          <div>
            <GroupHeader label="Follow requests" />
            {Object.values(MOCK_DATA)
              .flat()
              .filter((n) => n.followState === "requested")
              .map((item) => (
                <ActivityRow key={item.id} item={item} />
              ))}
            {requestCount === 0 && (
              <p className="px-4 py-8 text-center text-sm text-muted-foreground">
                No pending requests right now.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
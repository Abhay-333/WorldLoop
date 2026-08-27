import { useState } from "react";
import { Heart, MessageCircle, UserPlus, AtSign, Tag } from "lucide-react";
import { Avatar } from "@/components/custom/Avatar";
import GroupHeader from "../components/GroupHeader";
import ActivityRow from "../components/ActivityRow";
import { MOCK_DATA } from "@/components/utils/componentsUtils";
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
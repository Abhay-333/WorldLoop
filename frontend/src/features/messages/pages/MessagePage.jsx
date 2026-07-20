// src/features/messages/components/MessagesPage.tsx
import { useState } from "react"
import { Send, Image as ImageIcon, Phone, Video, Info } from "lucide-react"
import { Avatar } from "../../../components/custom/Avatar"
import ConversationItem from "../components/ConversationItem"
import ChatBubble from "../components/ChatBubble"

// TODO: replace with TanStack Query -> GET /api/conversations (per SRS conversations collection)
const MOCK_CONVERSATIONS = [
  {
    id: "1",
    username: "priya.codes",
    lastMessage: "Bhai woh API ready hai?",
    time: "2m",
    unread: true,
  },
  {
    id: "2",
    username: "rahul_dev",
    lastMessage: "Sent an attachment",
    time: "1h",
    unread: true,
  },
  {
    id: "3",
    username: "meera_ux",
    lastMessage: "Design looks great!",
    time: "3h",
    unread: false,
  },
  {
    id: "4",
    username: "kartik.ui",
    lastMessage: "You: Sounds good",
    time: "1d",
    unread: false,
  },
]

// TODO: replace with TanStack Query -> GET /api/conversations/:id/messages (cursor-paginated)
const MOCK_MESSAGES = [
  { id: "1", text: "Hey! Kaisa chal raha hai project?", isOwn: false },
  {
    id: "2",
    text: "Bas theme provider aur explore page kar liya",
    isOwn: true,
  },
  { id: "3", text: "Ab messages UI pe kaam kar raha hu", isOwn: true },
  { id: "4", text: "Nice bro, dikha jab ready ho jaye", isOwn: false },
]

function MessagesPage() {
  const [activeId, setActiveId] = useState(MOCK_CONVERSATIONS[0].id)
  const [draft, setDraft] = useState("")

  const activeConversation = MOCK_CONVERSATIONS.find((c) => c.id === activeId)

  return (
    <div className="flex h-screen w-full">
      {/* Left panel — conversation list */}
      <div className="flex w-full max-w-[380px] shrink-0 flex-col border-r border-border">
        <div className="border-b border-border px-4 py-4">
          <h1 className="text-lg font-semibold text-foreground">
            {/* TODO: swap for logged-in username from auth store */}
            abhaydev
          </h1>
        </div>
        <div className="flex items-center justify-between px-4 py-3">
          <span className="text-sm font-semibold text-foreground">
            Messages
          </span>
        </div>
        <div className="flex-1 overflow-y-auto">
          {MOCK_CONVERSATIONS.map((c) => (
            <ConversationItem
              key={c.id}
              conversation={c}
              isActive={c.id === activeId}
              onClick={() => setActiveId(c.id)}
            />
          ))}
        </div>
      </div>

      {/* Right panel — active chat */}
      <div className="flex flex-1 flex-col">
        {activeConversation ? (
          <>
            {/* Chat header */}
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <div className="flex items-center gap-3">
                <Avatar name={activeConversation.username} size={40} />
                <span className="text-sm font-semibold text-foreground">
                  {activeConversation.username}
                </span>
              </div>
              <div className="flex items-center gap-4 text-foreground">
                <Phone className="h-5 w-5 cursor-pointer" />
                <Video className="h-5 w-5 cursor-pointer" />
                <Info className="h-5 w-5 cursor-pointer" />
              </div>
            </div>

            {/* Message thread */}
            <div className="flex flex-1 flex-col gap-2 overflow-y-auto px-4 py-4">
              {MOCK_MESSAGES.map((m) => (
                <ChatBubble key={m.id} message={m} isOwn={m.isOwn} />
              ))}
            </div>

            {/* Composer */}
            <div className="flex items-center gap-3 border-t border-border px-4 py-3">
              <ImageIcon className="h-6 w-6 shrink-0 cursor-pointer text-foreground" />
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Message..."
                className="flex-1 rounded-full border border-border bg-transparent px-4 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
              {draft.trim() && (
                <button className="shrink-0 text-sm font-semibold text-primary">
                  <Send className="h-5 w-5" />
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
            Select a conversation to start chatting
          </div>
        )}
      </div>
    </div>
  )
}

export default MessagesPage

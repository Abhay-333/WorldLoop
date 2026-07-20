// src/features/messages/components/ConversationItem.tsx
import { Avatar } from "../../../components/custom/Avatar"

function ConversationItem({ conversation, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors ${
        isActive ? "bg-muted" : "hover:bg-muted/60"
      }`}
    >
      <Avatar name={conversation.username} size={48} />
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-sm font-medium text-foreground">
          {conversation.username}
        </span>
        <span
          className={`truncate text-xs ${
            conversation.unread
              ? "font-semibold text-foreground"
              : "text-muted-foreground"
          }`}
        >
          {conversation.lastMessage} · {conversation.time}
        </span>
      </div>
      {conversation.unread && (
        <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-primary" />
      )}
    </button>
  )
}

export default ConversationItem
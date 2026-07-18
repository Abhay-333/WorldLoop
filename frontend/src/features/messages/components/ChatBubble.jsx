// src/features/messages/components/ChatBubble.tsx
function ChatBubble({ message, isOwn }) {
  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
      <span
        className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm ${
          isOwn
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-foreground"
        }`}
      >
        {message.text}
      </span>
    </div>
  )
}

export default ChatBubble
import { useEffect, useState } from "react"
import { Link } from "react-router"
import { X } from "lucide-react"
import { Avatar } from "@/components/custom/Avatar"
import { getFollowersApi, getFollowingUsersApi } from "../api/profile.api"

const ConnectionsDialog = ({ username, type, open, onClose }) => {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    if (!open) return

    let isCurrent = true
    const fetchUsers = async () => {
      setIsLoading(true)
      setHasError(false)
      try {
        const response =
          type === "followers"
            ? await getFollowersApi(username)
            : await getFollowingUsersApi(username)
        if (isCurrent) setUsers(response?.data ?? [])
      } catch {
        if (isCurrent) setHasError(true)
      } finally {
        if (isCurrent) setIsLoading(false)
      }
    }

    fetchUsers()
    return () => {
      isCurrent = false
    }
  }, [open, type, username])

  useEffect(() => {
    if (!open) return
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [open, onClose])

  if (!open) return null

  const title = type === "followers" ? "Followers" : "Following"

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="connections-dialog-title"
        className="flex max-h-[min(560px,calc(100vh-2rem))] w-full max-w-md flex-col overflow-hidden rounded-xl border bg-background shadow-xl"
      >
        <header className="flex items-center justify-between border-b px-5 py-4">
          <h2 id="connections-dialog-title" className="text-base font-semibold">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="overflow-y-auto p-3">
          {isLoading && (
            <p className="px-3 py-8 text-center text-sm text-muted-foreground">
              Loading...
            </p>
          )}
          {!isLoading && hasError && (
            <p className="px-3 py-8 text-center text-sm text-destructive">
              Could not load this list.
            </p>
          )}
          {!isLoading && !hasError && users.length === 0 && (
            <p className="px-3 py-8 text-center text-sm text-muted-foreground">
              {type === "followers"
                ? "No followers yet."
                : "Not following anyone yet."}
            </p>
          )}
          {!isLoading &&
            !hasError &&
            users.map((user) => {
              const name = user.fullName || user.username
              return (
                <Link
                  key={user._id || user.id || user.username}
                  to={`/${user.username}`}
                  onClick={onClose}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-muted"
                >
                  <Avatar
                    name={name}
                    src={user.avatar?.url || user.avatarUrl}
                    size={44}
                  />
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold">
                      {user.username}
                    </span>
                    {user.fullName && (
                      <span className="block truncate text-sm text-muted-foreground">
                        {user.fullName}
                      </span>
                    )}
                  </span>
                </Link>
              )
            })}
        </div>
      </section>
    </div>
  )
}

export default ConnectionsDialog

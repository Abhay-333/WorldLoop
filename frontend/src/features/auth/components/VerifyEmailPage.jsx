import { useSearchParams, useNavigate } from "react-router-dom"
import { CheckCircle2, XCircle, Loader2 } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { useVerifyEmail } from "../hooks/useVerifyEmail"

function VerifyEmailPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const token = searchParams.get("token")

  const { isLoading, isSuccess, isError } = useVerifyEmail(token)

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="flex w-full max-w-sm flex-col items-center gap-4 rounded-2xl border border-border bg-card px-8 py-10 text-center">

        {!token && (
          <>
            <XCircle className="h-12 w-12 text-destructive" />
            <h1 className="text-lg font-semibold text-foreground">
              Invalid verification link
            </h1>
            <p className="text-sm text-muted-foreground">
              This link is missing a verification token. Please check the
              email we sent you, or request a new link.
            </p>
          </>
        )}

        {token && isLoading && (
          <>
            <Loader2 className="h-12 w-12 animate-spin text-muted-foreground" />
            <h1 className="text-lg font-semibold text-foreground">
              Verifying your email...
            </h1>
            <p className="text-sm text-muted-foreground">
              This will only take a moment.
            </p>
          </>
        )}

        {token && isSuccess && (
          <>
            <CheckCircle2 className="h-12 w-12 text-primary" />
            <h1 className="text-lg font-semibold text-foreground">
              Email verified
            </h1>
            <p className="text-sm text-muted-foreground">
              Your account is ready. You can now log in to WorldLoop.
            </p>
          </>
        )}

        {token && isError && (
          <>
            <XCircle className="h-12 w-12 text-destructive" />
            <h1 className="text-lg font-semibold text-foreground">
              Verification failed
            </h1>
            <p className="text-sm text-muted-foreground">
              This link may have expired or already been used. Try logging in,
              or request a new verification email.
            </p>
          </>
        )}

        <Button
          className="mt-2 w-full"
          onClick={() => navigate("/login")}
        >
          Back to Login
        </Button>
      </div>
    </div>
  )
}

export default VerifyEmailPage
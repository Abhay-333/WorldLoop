import { useState, useEffect } from "react"
import { useLocation, useNavigate, useParams } from "react-router"
import { MailCheck, CheckCircle2, XCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import useVerifyEmail from "../hooks/useVerifyEmail"
import useResendVerification from "../hooks/useResendVerification"

const RESEND_COOLDOWN = 30 // seconds

function VerifyEmailPage() {
  const { token } = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  console.log(token)
  const email = location.state?.email

  const { isLoading, isSuccess, isError } = useVerifyEmail(token)
  const { mutate: resend, isPending } = useResendVerification()
  const [cooldown, setCooldown] = useState(0)

  useEffect(() => {
    if (cooldown === 0) return
    const timer = setInterval(() => setCooldown((c) => c - 1), 1000)
    return () => clearInterval(timer)
  }, [cooldown])

  const handleResend = () => {
    if (!email || cooldown > 0) return
    resend(email)
    setCooldown(RESEND_COOLDOWN)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="flex w-full max-w-sm flex-col items-center gap-4 rounded-2xl border border-border bg-card px-8 py-10 text-center">
        {/* ---------- No token: pending / "check your inbox" state ---------- */}
        {!token && (
          <>
            <MailCheck className="h-12 w-12 text-primary" />
            <h1 className="text-lg font-semibold text-foreground">
              Check your email
            </h1>
            <p className="text-sm text-muted-foreground">
              {email ? (
                <>
                  We've sent a verification link to{" "}
                  <span className="font-medium text-foreground">{email}</span>.
                  Click it to activate your account.
                </>
              ) : (
                "We've sent a verification link to your email. Click it to activate your account."
              )}
            </p>
            <Button
              variant="outline"
              className="mt-2 w-full"
              onClick={handleResend}
              disabled={!email || isPending || cooldown > 0}
            >
              {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend email"}
            </Button>
          </>
        )}

        {/* ---------- Token present: verifying ---------- */}
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

        {/* ---------- Token present: success ---------- */}
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

        {/* ---------- Token present: error ---------- */}
        {token && isError && (
          <>
            <XCircle className="h-12 w-12 text-destructive" />
            <h1 className="text-lg font-semibold text-foreground">
              Verification failed
            </h1>
            <p className="text-sm text-muted-foreground">
              This link may have expired or already been used. Try resending, or
              log in if you're already verified.
            </p>
          </>
        )}

        <Button className="w-full" onClick={() => navigate("/")}>
          Back to Login
        </Button>
      </div>
    </div>
  )
}

export default VerifyEmailPage

import { useState, useEffect } from "react"
import { useLocation, useNavigate, useParams } from "react-router"
import { MailCheck, CheckCircle2, XCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import useVerifyEmail from "../hooks/useVerifyEmail"
import useResendVerification from "../hooks/useResendVerification"
import { useFonts } from "../../../styles/hooks/useFonts"
import ConnectionGraph from "./ConnectionGraph"

const RESEND_COOLDOWN = 30 // seconds

function VerifyEmailPage() {
  useFonts()
  const { token } = useParams()
  const location = useLocation()
  const navigate = useNavigate()

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
    resend({email})
    setCooldown(RESEND_COOLDOWN)
  }

  return (
    <div
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      className="flex min-h-screen w-full items-center justify-center bg-white px-4"
    >
      <div className="w-full max-w-md overflow-hidden rounded-3xl border border-[#F0E9E3] bg-white shadow-[0_20px_60px_-15px_rgba(31,27,36,0.15)]">
        <div
          className="relative h-28 overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #FF5C7A 0%, #FF8A5B 55%, #FFC24B 100%)",
          }}
        >
          <ConnectionGraph />
        </div>
        <div className="flex flex-col items-center gap-4 px-8 pt-8 pb-9 text-center">
        {/* ---------- No token: pending / "check your inbox" state ---------- */}
        {!token && (
          <>
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF0F3]">
              <MailCheck className="h-7 w-7 text-[#FF3D66]" />
            </div>
            <h1 className="text-2xl font-bold text-[#1F1B24]">
              Check your email
            </h1>
            <p className="text-sm leading-relaxed text-[#8A8390]">
              {email ? (
                <>
                  We've sent a verification link to{" "}
                  <span className="font-semibold text-[#1F1B24]">{email}</span>.
                  Click it to activate your account.
                </>
              ) : (
                "We've sent a verification link to your email. Click it to activate your account."
              )}
            </p>
            <Button
              variant="outline"
              className="mt-2 h-11 w-full border-[#EFE7E1] text-[#1F1B24] hover:bg-[#FAF7F4]"
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
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF0F3]">
              <Loader2 className="h-7 w-7 animate-spin text-[#FF3D66]" />
            </div>
            <h1 className="text-2xl font-bold text-[#1F1B24]">
              Verifying your email...
            </h1>
            <p className="text-sm leading-relaxed text-[#8A8390]">
              This will only take a moment.
            </p>
          </>
        )}

        {/* ---------- Token present: success ---------- */}
        {token && isSuccess && (
          <>
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E7F8F5]">
              <CheckCircle2 className="h-7 w-7 text-[#12B8A6]" />
            </div>
            <h1 className="text-2xl font-bold text-[#1F1B24]">
              Email verified
            </h1>
            <p className="text-sm leading-relaxed text-[#8A8390]">
              Your account is ready. You can now log in to WorldLoop.
            </p>
          </>
        )}

        {/* ---------- Token present: error ---------- */}
        {token && isError && (
          <>
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF0F3]">
              <XCircle className="h-7 w-7 text-[#FF3D66]" />
            </div>
            <h1 className="text-2xl font-bold text-[#1F1B24]">
              Verification failed
            </h1>
            <p className="text-sm leading-relaxed text-[#8A8390]">
              This link may have expired or already been used. Try resending, or
              log in if you're already verified.
            </p>
          </>
        )}

        <Button
          className="h-11 w-full bg-[#FF3D66] font-semibold text-white hover:bg-[#ff2857]"
          onClick={() => navigate("/")}
        >
          Back to Login
        </Button>
        </div>
      </div>
    </div>
  )
}

export default VerifyEmailPage

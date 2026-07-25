import { useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router"
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFonts } from "../../../styles/hooks/useFonts"
import useForgotPassword from "../hooks/useForgotPassword"

/**
 * ForgotPasswordPage
 *
 * Unified page, same pattern as VerifyEmailPage:
 *  - "form" state: user enters their email
 *  - "sent" state: generic confirmation shown after submit
 *
 * We always show the "sent" state on success, regardless of whether
 * the email actually exists in the DB — this avoids leaking which
 * emails are registered (user enumeration).
 */
const ForgotPasswordPage = () => {
  useFonts()
  const [email, setEmail] = useState("")
  const [submittedEmail, setSubmittedEmail] = useState("")
  const theme = useSelector((state) => state.theme?.theme || "light")
  const isDark = theme === "dark"
  const { mutate: sendResetLink, isPending, error } = useForgotPassword()

  const handleSubmit = (e) => {
    e.preventDefault()
    sendResetLink(
      { email },
      {
        onSuccess: () => setSubmittedEmail(email),
      }
    )
  }

  const isSent = Boolean(submittedEmail)

  return (
    <div
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      className={`flex min-h-screen items-center justify-center px-4 transition-colors ${
        isDark ? "bg-[#0f0b16]" : "bg-[#fdf8f5]"
      }`}
    >
      <div className="w-full max-w-md">
        <Link
          to="/login"
          className={`mb-6 inline-flex items-center gap-1.5 text-sm transition-colors ${
            isDark ? "text-slate-300 hover:text-white" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to log in
        </Link>

        <div
          className={`overflow-hidden rounded-[28px] border shadow-[0_20px_60px_-15px_rgba(31,27,36,0.15)] ${
            isDark
              ? "border-white/10 bg-[#1a1522]"
              : "border-[#f0e9e3] bg-white"
          }`}
        >
          <div className="relative h-28 overflow-hidden bg-gradient-to-r from-[#FF5C7A] via-[#FF8A5B] to-[#FFC24B]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.28),_transparent_45%)]" />
            <div className="relative flex h-full items-center justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/40 bg-white/20 backdrop-blur-sm">
                <Mail className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>

          <div className="px-8 py-8">
            {!isSent ? (
              <>
                <div className="mb-8 text-center">
                  <h1 className={`text-2xl font-semibold tracking-tight ${isDark ? "text-white" : "text-foreground"}`}>
                    Forgot your password?
                  </h1>
                  <p className={`mt-2 text-sm ${isDark ? "text-slate-300" : "text-muted-foreground"}`}>
                    Enter the email linked to your account and we'll send you a
                    link to reset it.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className={isDark ? "text-slate-200" : "text-foreground"}
                    >
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoFocus
                      className={isDark ? "border-white/10 bg-[#241f31] text-white placeholder:text-slate-400" : ""}
                    />
                  </div>

                  {error && (
                    <p className="text-sm text-destructive">
                      {error?.response?.data?.message ??
                        "Something went wrong. Please try again."}
                    </p>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-[#FF3D66] text-white hover:bg-[#ff2857]"
                    disabled={isPending}
                  >
                    {isPending ? "Sending link..." : "Send reset link"}
                  </Button>
                </form>
              </>
            ) : (
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <h1 className={`text-2xl font-semibold tracking-tight ${isDark ? "text-white" : "text-foreground"}`}>
                  Check your inbox
                </h1>
                <p className={`mt-2 text-sm ${isDark ? "text-slate-300" : "text-muted-foreground"}`}>
                  If an account exists for{" "}
                  <span className={`font-medium ${isDark ? "text-white" : "text-foreground"}`}>
                    {submittedEmail}
                  </span>
                  , we've sent a link to reset your password.
                </p>

                <div className={`mt-6 flex items-center justify-center gap-1.5 text-xs ${isDark ? "text-slate-400" : "text-muted-foreground"}`}>
                  <Mail className="h-3.5 w-3.5" />
                  <span>Didn't get it? Check your spam folder.</span>
                </div>

                <Button
                  variant="ghost"
                  className={`mt-6 w-full ${isDark ? "text-slate-200 hover:text-white" : ""}`}
                  onClick={() => setSubmittedEmail("")}
                >
                  Use a different email
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordPage

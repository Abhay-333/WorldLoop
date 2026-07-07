import { useEffect, useState } from "react"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFonts } from "../hooks/useFonts"

/**
 * WorldLoop — Sign In
 *
 * Concept: a social platform's identity lives in profile covers, avatars,
 * and the web of connections between people — so instead of a generic
 * dark glass card, this borrows that real UI language: a cover-photo
 * banner with a floating connection graph, and an avatar badge
 * overlapping into the form, exactly like a profile header.
 *
 * Font (Plus Jakarta Sans — a warm, rounded, social-feeling geometric
 * sans) is injected at runtime via a <link> tag, no extra setup needed.
 * Colors are inlined as arbitrary Tailwind values (bg-[#...]) so this
 * renders identically regardless of your tailwind.config.
 */

export default function LoginPage() {
  useFonts()
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      className="flex min-h-screen w-full items-center justify-center bg-white px-4 py-10"
    >
      <div className="w-full max-w-md">
        <div className="relative overflow-hidden rounded-3xl border border-[#F0E9E3] bg-white shadow-[0_20px_60px_-15px_rgba(31,27,36,0.15)]">
          {/* Cover banner */}
          <div
            className="relative h-36 overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, #FF5C7A 0%, #FF8A5B 55%, #FFC24B 100%)",
            }}
          >
            <ConnectionGraph />
          </div>

          {/* Overlapping avatar badge */}
          <div className="relative flex justify-center">
            <div className="absolute -top-10 flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-[#1F1B24] shadow-lg">
              <span className="text-2xl font-extrabold text-white">W</span>
              <span className="absolute right-1 bottom-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-[#12B8A6]" />
            </div>
          </div>

          <div className="px-8 pt-14 pb-8 text-center">
            <h1 className="text-2xl font-bold text-[#1F1B24]">
              Welcome back to WorldLoop
            </h1>
            <p className="mt-1 text-sm text-[#8A8390]">
              Your circle's been posting. Come see what you missed.
            </p>

            <form
              className="mt-7 space-y-4 text-left"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="space-y-1.5">
                <Label
                  htmlFor="identifier"
                  className="text-xs font-semibold text-[#5C5560]"
                >
                  Email or username
                </Label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-3 h-4 w-4 text-[#B7AFB9]" />
                  <Input
                    id="identifier"
                    type="text"
                    placeholder="you@WorldLoop.app"
                    className="h-11 border-[#EFE7E1] bg-[#FAF7F4] pl-10 text-sm text-[#1F1B24] placeholder:text-[#B7AFB9] focus-visible:ring-[#FF5C7A]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="password"
                    className="text-xs font-semibold text-[#5C5560]"
                  >
                    Password
                  </Label>
                  <a
                    href="#"
                    className="text-xs font-medium text-[#FF5C7A] hover:underline"
                  >
                    Forgot?
                  </a>
                </div>
                <div className="relative flex items-center">
                  <Lock className="absolute left-3 h-4 w-4 text-[#B7AFB9]" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="h-11 border-[#EFE7E1] bg-[#FAF7F4] pr-10 pl-10 text-sm text-[#1F1B24] placeholder:text-[#B7AFB9] focus-visible:ring-[#FF5C7A]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 text-[#B7AFB9] hover:text-[#5C5560]"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="h-11 w-full bg-[#FF3D66] font-semibold text-white hover:bg-[#ff2857]"
              >
                Sign in
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-[#F0E9E3]" />
              </div>
              <div className="relative flex justify-center text-[11px] tracking-wider uppercase">
                <span className="bg-white px-3 text-[#B7AFB9]">or</span>
              </div>
            </div>

            <Button
              type="button"
              //   variant="outline"
              className="h-11 w-full border-[#EFE7E1] text-[#1F1B24] hover:bg-[#FAF7F4] hover:text-[#1F1B24] focus-visible:ring-[#FF5C7A]"
            >
              <GoogleIcon className="mr-2 h-4 w-4 text-[#8A8390]" />
              Continue with Google
            </Button>

            <p className="mt-6 text-sm text-[#8A8390]">
              New to WorldLoop?{" "}
              <a
                href="#"
                className="font-semibold text-[#FF3D66] hover:underline"
              >
                Create account
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

/** Small floating connection graph inside the cover banner — friends/nodes linked, gently drifting. */
function ConnectionGraph() {
  const nodes = [
    { cx: 40, cy: 40, r: 10, dur: 3.2, delay: 0 },
    { cx: 120, cy: 74, r: 6, dur: 3.8, delay: 0.6 },
    { cx: 205, cy: 28, r: 8, dur: 3.4, delay: 1.1 },
    { cx: 262, cy: 82, r: 5, dur: 4.2, delay: 0.3 },
    { cx: 322, cy: 46, r: 9, dur: 3.6, delay: 0.9 },
    { cx: 90, cy: 104, r: 5, dur: 4, delay: 1.4 },
  ]

  return (
    <div className="absolute inset-0">
      <style>{`
        @keyframes WorldLoop-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
      <svg
        viewBox="0 0 360 140"
        className="h-full w-full"
        preserveAspectRatio="none"
      >
        <g stroke="rgba(255,255,255,0.45)" strokeWidth="1">
          <line x1="40" y1="40" x2="120" y2="74" />
          <line x1="120" y1="74" x2="205" y2="28" />
          <line x1="205" y1="28" x2="262" y2="82" />
          <line x1="262" y1="82" x2="322" y2="46" />
          <line x1="90" y1="104" x2="120" y2="74" />
          <line x1="90" y1="104" x2="40" y2="40" />
        </g>
        {nodes.map((n, i) => (
          <circle
            key={i}
            cx={n.cx}
            cy={n.cy}
            r={n.r}
            fill="rgba(255,255,255,0.92)"
            style={{
              animation: `WorldLoop-float ${n.dur}s ease-in-out infinite`,
              animationDelay: `${n.delay}s`,
              transformBox: "fill-box",
              transformOrigin: "center",
            }}
          />
        ))}
      </svg>
    </div>
  )
}

function GoogleIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M21.35 11.1h-9.17v2.98h5.4c-.23 1.4-1.62 4.1-5.4 4.1a5.9 5.9 0 1 1 0-11.8 5.3 5.9 0 0 1 3.75 1.46l2.28-2.2A9.1 9.1 0 0 0 12.18 3a9.18 9.18 0 1 0 0 18.36c5.3 0 8.8-3.72 8.8-8.96 0-.6-.07-1.06-.15-1.5Z"
        fill="currentColor"
      />
    </svg>
  )
}

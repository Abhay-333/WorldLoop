import { useEffect, useState } from "react"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFonts } from "../hooks/useFonts"
import { Link } from "react-router"
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
      className="flex h-full w-full items-center justify-center bg-white px-4"
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
                  <Link
                    to="/forgot-password"
                    className="text-xs font-medium text-[#FF5C7A] hover:underline"
                  >
                    Forgot?
                  </Link>
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
              <Link
                to="/register"
                className="font-semibold text-[#FF3D66] hover:underline"
              >
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

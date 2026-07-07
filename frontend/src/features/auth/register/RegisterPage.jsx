import { useEffect, useState } from "react"
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useFonts } from "../hooks/useFonts"
import ConnectionGraph from "../components/ConnectionGraph"
import GoogleIcon from "../components/GoogleIcon"
/**
 * WorldLoop — Register
 *
 * Matches WorldLoopSignIn.jsx exactly: cover-photo banner with the floating
 * connection graph, overlapping avatar badge, coral-to-gold gradient,
 * Plus Jakarta Sans, same card/surface treatment.
 */

export default function RegisterPage() {
  useFonts()
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      className="flex min-h-screen w-full items-center justify-center bg-white px-4"
    >
      <div className="w-full max-w-md">
        <div className="relative overflow-hidden rounded-3xl border border-[#F0E9E3] bg-white shadow-[0_20px_60px_-15px_rgba(31,27,36,0.15)]">
          {/* Cover banner */}
          <div
            className="relative h-30 overflow-hidden"
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

          <div className="px-8 pt-11 pb-5 text-center">
            <h1 className="text-2xl font-bold text-[#1F1B24]">
              Join WorldLoop
            </h1>
            <p className="mt-1 text-sm text-[#8A8390]">
              Make your profile, find your circle, start posting.
            </p>

            <form
              className="mt-4 space-y-4 text-left"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="space-y-1.5">
                <Label
                  htmlFor="username"
                  className="text-xs font-semibold text-[#5C5560]"
                >
                  Username
                </Label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-sm text-[#B7AFB9]">
                    @
                  </span>
                  <Input
                    id="username"
                    type="text"
                    placeholder="abhaydev"
                    className="h-11 border-[#EFE7E1] bg-[#FAF7F4] pl-8 text-sm text-[#1F1B24] placeholder:text-[#B7AFB9] focus-visible:ring-[#FF5C7A]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="email"
                  className="text-xs font-semibold text-[#5C5560]"
                >
                  Email
                </Label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-3 h-4 w-4 text-[#B7AFB9]" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@worldloop.io"
                    className="h-11 border-[#EFE7E1] bg-[#FAF7F4] pl-10 text-sm text-[#1F1B24] placeholder:text-[#B7AFB9] focus-visible:ring-[#FF5C7A]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="password"
                  className="text-xs font-semibold text-[#5C5560]"
                >
                  Password
                </Label>
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

              <div className="flex items-start gap-2 pt-1">
                <Checkbox
                  id="terms"
                  className="mt-0.5 border-[#EFE7E1] data-[state=checked]:border-[#FF3D66] data-[state=checked]:bg-[#FF3D66]"
                />
                <Label
                  htmlFor="terms"
                  className="text-xs leading-relaxed font-normal text-[#8A8390]"
                >
                  I agree to WorldLoop's{" "}
                  <a href="#" className="text-[#FF5C7A] hover:underline">
                    Terms
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-[#FF5C7A] hover:underline">
                    Privacy Policy
                  </a>
                  .
                </Label>
              </div>

              <Button
                type="submit"
                className="h-11 w-full bg-[#FF3D66] font-semibold text-white hover:bg-[#ff2857]"
              >
                Create account
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
              className="h-11 w-full border-[#EFE7E1] text-[#1F1B24] hover:bg-[#FAF7F4]"
            >
              <GoogleIcon className="mr-2 h-4 w-4 text-[#8A8390]" />
              Continue with Google
            </Button>

            <p className="mt-3 text-sm text-[#8A8390]">
              Already on WorldLoop?{" "}
              <a
                href="#"
                className="font-semibold text-[#FF3D66] hover:underline"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

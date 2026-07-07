import { useEffect, useState } from "react";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/**
 * WorldLoop — Register
 *
 * Consistent with the SignInPage identity: deep navy base, amber (#F2A65A)
 * + teal (#4FD1C5) accents, Fraunces (display) + Manrope (UI), orbit
 * signature and live world clocks on the brand panel.
 *
 * Genuine (non-decorative) touch: the timezone field auto-detects the
 * visitor's local timezone via Intl and pre-selects it, since WorldLoop's
 * whole premise is "everyone, every timezone."
 *
 * Colors are inlined as arbitrary Tailwind values (bg-[#...]) so this
 * renders identically regardless of your tailwind.config — no setup needed.
 */

const CITIES = [
  { name: "Tokyo", tz: "Asia/Tokyo" },
  { name: "Lagos", tz: "Africa/Lagos" },
  { name: "São Paulo", tz: "America/Sao_Paulo" },
  { name: "Berlin", tz: "Europe/Berlin" },
];

const TIMEZONE_OPTIONS = [
  { value: "Asia/Tokyo", label: "Tokyo — GMT+9" },
  { value: "Asia/Kolkata", label: "Mumbai / Delhi — GMT+5:30" },
  { value: "Asia/Singapore", label: "Singapore — GMT+8" },
  { value: "Europe/Berlin", label: "Berlin — GMT+1" },
  { value: "Europe/London", label: "London — GMT+0" },
  { value: "Africa/Lagos", label: "Lagos — GMT+1" },
  { value: "America/Sao_Paulo", label: "São Paulo — GMT-3" },
  { value: "America/New_York", label: "New York — GMT-5" },
  { value: "America/Los_Angeles", label: "Los Angeles — GMT-8" },
  { value: "Australia/Sydney", label: "Sydney — GMT+11" },
];

function useFonts() {
  useEffect(() => {
    const id = "worldloop-fonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Manrope:wght@400;500;600;700;800&display=swap";
    document.head.appendChild(link);
  }, []);
}

function useWorldClocks() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);
  return CITIES.map((c) => ({
    ...c,
    time: new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: c.tz,
    }).format(now),
  }));
}

function useDetectedTimezone() {
  const [tz, setTz] = useState("Europe/London");
  useEffect(() => {
    try {
      const detected = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const known = TIMEZONE_OPTIONS.find((o) => o.value === detected);
      setTz(known ? detected : "Europe/London");
    } catch {
      // fall back to default
    }
  }, []);
  return [tz, setTz];
}

export default function RegisterPage() {
  useFonts();
  const clocks = useWorldClocks();
  const [timezone, setTimezone] = useDetectedTimezone();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div
      style={{ fontFamily: "'Manrope', sans-serif" }}
      className="relative flex min-h-screen w-full items-stretch bg-[#0A1120] text-[#EDEAE3]"
    >
      {/* Left — brand panel */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-gradient-to-br from-[#0D1B2A] via-[#0A1120] to-[#0A1120] p-12 lg:flex">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle, #1b2438 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        <OrbitSignature />

        <div className="relative z-10">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#4FD1C5]">
            Worldwide, always looping
          </span>
          <h1
            style={{ fontFamily: "'Fraunces', serif" }}
            className="mt-6 max-w-sm text-5xl font-medium leading-[1.05] text-[#F5F1E8]"
          >
            Start your loop,{" "}
            <span className="italic text-[#F2A65A]">wherever</span> you are.
          </h1>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#8B93A7]">
            Join a network that's always awake somewhere. One account, every
            timezone, one continuous loop.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-[#232C42] pt-6">
          {clocks.map((c) => (
            <div key={c.name} className="flex flex-col">
              <span className="text-[11px] uppercase tracking-wider text-[#8B93A7]">
                {c.name}
              </span>
              <span
                style={{ fontFamily: "'Fraunces', serif" }}
                className="text-lg text-[#EDEAE3]"
              >
                {c.time}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right — form panel */}
      <div className="flex w-full flex-col items-center justify-center px-6 py-12 lg:w-1/2 lg:px-16">
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <span
              style={{ fontFamily: "'Fraunces', serif" }}
              className="text-2xl text-[#F5F1E8]"
            >
              WorldLoop
            </span>
          </div>

          <h2
            style={{ fontFamily: "'Fraunces', serif" }}
            className="text-3xl font-medium text-[#F5F1E8]"
          >
            Create your account
          </h2>
          <p className="mt-2 text-sm text-[#8B93A7]">
            Takes about a minute. Your loop starts right after.
          </p>

          <form className="mt-7 space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-xs font-medium uppercase tracking-wide text-[#8B93A7]"
              >
                Full name
              </Label>
              <div className="relative flex items-center">
                <User className="absolute left-3 h-4 w-4 text-[#5B6478]" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Abhay Sharma"
                  className="h-11 border-[#232C42] bg-[#0C1424] pl-10 text-sm text-[#EDEAE3] placeholder:text-[#5B6478] focus-visible:ring-[#4FD1C5]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-xs font-medium uppercase tracking-wide text-[#8B93A7]"
              >
                Email
              </Label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3 h-4 w-4 text-[#5B6478]" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@worldloop.io"
                  className="h-11 border-[#232C42] bg-[#0C1424] pl-10 text-sm text-[#EDEAE3] placeholder:text-[#5B6478] focus-visible:ring-[#4FD1C5]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-xs font-medium uppercase tracking-wide text-[#8B93A7]"
                >
                  Password
                </Label>
                <div className="relative flex items-center">
                  <Lock className="absolute left-3 h-4 w-4 text-[#5B6478]" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="h-11 border-[#232C42] bg-[#0C1424] pl-10 pr-9 text-sm text-[#EDEAE3] placeholder:text-[#5B6478] focus-visible:ring-[#4FD1C5]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 text-[#5B6478] hover:text-[#8B93A7]"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="confirm"
                  className="text-xs font-medium uppercase tracking-wide text-[#8B93A7]"
                >
                  Confirm
                </Label>
                <div className="relative flex items-center">
                  <Lock className="absolute left-3 h-4 w-4 text-[#5B6478]" />
                  <Input
                    id="confirm"
                    type={showConfirm ? "text" : "password"}
                    placeholder="••••••••"
                    className="h-11 border-[#232C42] bg-[#0C1424] pl-10 pr-9 text-sm text-[#EDEAE3] placeholder:text-[#5B6478] focus-visible:ring-[#4FD1C5]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((v) => !v)}
                    className="absolute right-3 text-[#5B6478] hover:text-[#8B93A7]"
                  >
                    {showConfirm ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-medium uppercase tracking-wide text-[#8B93A7]">
                Your timezone
              </Label>
              <Select value={timezone} onValueChange={setTimezone}>
                <SelectTrigger className="h-11 border-[#232C42] bg-[#0C1424] text-sm text-[#EDEAE3] focus:ring-[#4FD1C5]">
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent className="border-[#232C42] bg-[#0F1729] text-[#EDEAE3]">
                  {TIMEZONE_OPTIONS.map((opt) => (
                    <SelectItem
                      key={opt.value}
                      value={opt.value}
                      className="text-sm focus:bg-[#1A2438] focus:text-[#EDEAE3]"
                    >
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-[#5B6478]">
                Detected automatically — change it if that's not where you
                are.
              </p>
            </div>

            <div className="flex items-start gap-2 pt-1">
              <Checkbox
                id="terms"
                className="mt-0.5 border-[#232C42] data-[state=checked]:border-[#F2A65A] data-[state=checked]:bg-[#F2A65A]"
              />
              <Label
                htmlFor="terms"
                className="text-xs font-normal leading-relaxed text-[#8B93A7]"
              >
                I agree to WorldLoop's{" "}
                <a href="#" className="text-[#4FD1C5] hover:underline">
                  Terms
                </a>{" "}
                and{" "}
                <a href="#" className="text-[#4FD1C5] hover:underline">
                  Privacy Policy
                </a>
                .
              </Label>
            </div>

            <Button
              type="submit"
              className="h-11 w-full bg-[#F2A65A] font-semibold text-[#241205] hover:bg-[#f0b378]"
            >
              Create account
            </Button>
          </form>

          <div className="relative my-7">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-[#232C42]" />
            </div>
            <div className="relative flex justify-center text-[11px] uppercase tracking-wider">
              <span className="bg-[#0A1120] px-3 text-[#5B6478]">or</span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="h-11 w-full border-[#232C42] bg-transparent text-[#EDEAE3] hover:bg-[#131B2E]"
          >
            <GoogleIcon className="mr-2 h-4 w-4 text-[#8B93A7]" />
            Continue with Google
          </Button>

          <p className="mt-8 text-center text-sm text-[#8B93A7]">
            Already looping?{" "}
            <a href="#" className="font-semibold text-[#F2A65A] hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

function OrbitSignature() {
  return (
    <div className="pointer-events-none absolute -right-24 -top-24 z-0 h-[420px] w-[420px] opacity-80">
      <style>{`
        @keyframes wl-orbit { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
      <svg viewBox="0 0 400 400" className="h-full w-full">
        <circle cx="200" cy="200" r="150" fill="none" stroke="#232C42" strokeWidth="1" />
        <circle cx="200" cy="200" r="110" fill="none" stroke="#232C42" strokeWidth="1" />
        <circle
          cx="200"
          cy="200"
          r="150"
          fill="none"
          stroke="#4FD1C5"
          strokeWidth="1.5"
          strokeDasharray="4 10"
          opacity="0.5"
        />
      </svg>
      <div className="absolute inset-0" style={{ animation: "wl-orbit 18s linear infinite" }}>
        <div className="absolute left-1/2 top-[50px] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[#F2A65A] shadow-[0_0_12px_2px_rgba(242,166,90,0.6)]" />
      </div>
      <div
        className="absolute inset-0"
        style={{ animation: "wl-orbit 26s linear infinite reverse" }}
      >
        <div className="absolute left-1/2 top-[90px] h-2 w-2 -translate-x-1/2 rounded-full bg-[#4FD1C5] shadow-[0_0_10px_2px_rgba(79,209,197,0.6)]" />
      </div>
    </div>
  );
}

function GoogleIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M21.35 11.1h-9.17v2.98h5.4c-.23 1.4-1.62 4.1-5.4 4.1a5.9 5.9 0 1 1 0-11.8 5.3 5.9 0 0 1 3.75 1.46l2.28-2.2A9.1 9.1 0 0 0 12.18 3a9.18 9.18 0 1 0 0 18.36c5.3 0 8.8-3.72 8.8-8.96 0-.6-.07-1.06-.15-1.5Z"
        fill="currentColor"
      />
    </svg>
  );
}
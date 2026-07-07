import { Card, CardContent, CardFooter, CardHeader } from "../../../components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Globe, Mail, Lock, Eye } from "lucide-react"

export default function LoginCard() {
  return (
    <main className="relative z-10 w-full max-w-md px-6">
      <Card className="border-outline-variant/30 bg-surface-container/40 rounded-xl border p-6 shadow-2xl backdrop-blur-xl">
        <CardHeader className="space-y-2 text-center">
          <div className="bg-primary-container/20 mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-primary/20">
            <Globe className="h-7 w-7 text-primary" />
          </div>

          <h1 className="text-on-surface text-3xl font-bold tracking-tight">
            WorldLoop
          </h1>

          <p className="text-on-surface-variant text-sm">
            Enter your credentials to access your account
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>

            <div className="relative">
              <Mail className="text-outline absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />

              <Input
                id="email"
                type="email"
                placeholder="name@worldloop.io"
                className="bg-surface-container-low border-outline-variant h-11 pl-10"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>

              <button
                type="button"
                className="hover:text-primary-fixed-dim text-xs text-primary"
              >
                Forgot Password?
              </button>
            </div>

            <div className="relative">
              <Lock className="text-outline absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />

              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="bg-surface-container-low border-outline-variant h-11 pr-10 pl-10"
              />

              <Button
                variant="ghost"
                size="icon"
                type="button"
                className="absolute top-1/2 right-1 h-8 w-8 -translate-y-1/2"
              >
                <Eye className="text-outline h-4 w-4" />
              </Button>
            </div>
          </div>

          <Button className="bg-primary-container text-on-primary-container hover:bg-primary-container/90 h-11 w-full">
            Sign In
          </Button>

          {/* Divider */}
          <div className="relative">
            <Separator />

            <span className="text-on-surface-variant absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs uppercase">
              Or continue with
            </span>
          </div>

          {/* Google */}
          <Button
            variant="outline"
            className="border-outline-variant hover:bg-surface-bright h-11 w-full bg-transparent"
          >
            <img src="/google.svg" alt="Google" className="mr-2 h-4 w-4" />
            Google
          </Button>
        </CardContent>

        <CardFooter className="justify-center">
          <p className="text-on-surface-variant text-sm">
            Don't have an account?
            <button className="ml-1 font-semibold text-primary hover:underline">
              Sign Up
            </button>
          </p>
        </CardFooter>
      </Card>
    </main>
  )
}

import { useState } from "react"
import { Link, useNavigate, useParams } from "react-router"
import { CheckCircle2, XCircle, Eye, EyeOff } from "lucide-react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import useResetPassword from "../hooks/useResetPassword"

const MIN_PASSWORD_LENGTH = 6

/**
 * ResetPasswordPage
 *
 * Lands here from the reset-link email: /reset-password?token=...
 * Unified states:
 *  - "missing" : no token in URL at all -> send back to forgot-password
 *  - "form"    : token present -> let user set a new password
 *  - "success" : password updated -> CTA to log in
 *  - error from mutation (e.g. expired/invalid token) shown inline on the form
 */

const ResetPasswordPage = () => {
  const { token } = useParams()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const { mutate: resetPassword, isPending, error } = useResetPassword()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  const passwordValue = watch("password")

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="w-full max-w-sm text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <XCircle className="h-6 w-6 text-destructive" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Invalid reset link
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            This link is missing its reset token. Request a fresh one below.
          </p>
          <Button asChild className="mt-6 w-full">
            <Link to="/forgot-password">Request new link</Link>
          </Button>
        </div>
      </div>
    )
  }

  const handleResetForm = (formData) => {
    resetPassword(
      {
        token,
        password: formData.password,
      },
      {
        onSuccess: () => setIsSuccess(true),
      }
    )
  }

  if (isSuccess) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="w-full max-w-sm text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle2 className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Password updated
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Your password has been reset. You can now log in with your new
            password.
          </p>
          <Button className="mt-6 w-full" onClick={() => navigate("/")}>
            Go to log in
          </Button>
        </div>
      </div>
    )
  }

  const mutationErrorMessage = error?.response?.data?.message
  const isTokenInvalid =
    error?.response?.status === 400 || error?.response?.status === 410

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight">
            Set a new password
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Choose a new password for your account.
          </p>
        </div>

        <form onSubmit={handleSubmit(handleResetForm)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">New password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                autoFocus
                aria-invalid={Boolean(errors.password)}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: MIN_PASSWORD_LENGTH,
                    message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`,
                  },
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                tabIndex={-1}
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
            <Label htmlFor="confirmPassword">Confirm new password</Label>
            <Input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              aria-invalid={Boolean(errors.confirmPassword)}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === passwordValue || "Passwords do not match.",
              })}
            />
          </div>

          {(errors.password ||
            errors.confirmPassword ||
            mutationErrorMessage) && (
            <p className="text-sm text-destructive">
              {errors.password?.message ||
                errors.confirmPassword?.message ||
                mutationErrorMessage}
            </p>
          )}

          {isTokenInvalid && (
            <p className="text-sm text-muted-foreground">
              Your link may have expired.{" "}
              <Link to="/forgot-password" className="font-medium underline">
                Request a new one
              </Link>
              .
            </p>
          )}

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Updating password..." : "Reset password"}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default ResetPasswordPage

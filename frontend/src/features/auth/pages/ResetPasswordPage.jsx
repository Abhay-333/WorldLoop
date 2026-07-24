import { useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, XCircle, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useResetPassword } from '../hooks/useResetPassword';

const MIN_PASSWORD_LENGTH = 8;

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
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const { mutate: resetPassword, isPending, error } = useResetPassword();

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
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    if (password.length < MIN_PASSWORD_LENGTH) {
      setFormError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
      return;
    }
    if (password !== confirmPassword) {
      setFormError('Passwords do not match.');
      return;
    }

    resetPassword(
      { token, password },
      { onSuccess: () => setIsSuccess(true) }
    );
  };

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
          <Button className="mt-6 w-full" onClick={() => navigate('/login')}>
            Go to log in
          </Button>
        </div>
      </div>
    );
  }

  const mutationErrorMessage = error?.response?.data?.message;
  const isTokenInvalid = error?.response?.status === 400 || error?.response?.status === 410;

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

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">New password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
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
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {(formError || mutationErrorMessage) && (
            <p className="text-sm text-destructive">
              {formError || mutationErrorMessage}
            </p>
          )}

          {isTokenInvalid && (
            <p className="text-sm text-muted-foreground">
              Your link may have expired.{' '}
              <Link to="/forgot-password" className="font-medium underline">
                Request a new one
              </Link>
              .
            </p>
          )}

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? 'Updating password...' : 'Reset password'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
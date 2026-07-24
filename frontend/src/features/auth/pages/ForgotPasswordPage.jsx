import { useState } from 'react';
import { Link } from 'react-router';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForgotPassword } from '../hooks/useForgotPassword';

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
  const [email, setEmail] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState('');
  const { mutate: sendResetLink, isPending, error } = useForgotPassword();

  const handleSubmit = (e) => {
    e.preventDefault();
    sendResetLink(
      { email },
      {
        onSuccess: () => setSubmittedEmail(email),
      }
    );
  };

  const isSent = Boolean(submittedEmail);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <Link
          to="/login"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to log in
        </Link>

        {!isSent ? (
          <>
            <div className="mb-8">
              <h1 className="text-2xl font-semibold tracking-tight">
                Forgot your password?
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Enter the email linked to your account and we'll send you a
                link to reset it.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                />
              </div>

              {error && (
                <p className="text-sm text-destructive">
                  {error?.response?.data?.message ??
                    'Something went wrong. Please try again.'}
                </p>
              )}

              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? 'Sending link...' : 'Send reset link'}
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle2 className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Check your inbox
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              If an account exists for{' '}
              <span className="font-medium text-foreground">
                {submittedEmail}
              </span>
              , we've sent a link to reset your password.
            </p>

            <div className="mt-6 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <Mail className="h-3.5 w-3.5" />
              <span>Didn't get it? Check your spam folder.</span>
            </div>

            <Button
              variant="ghost"
              className="mt-6 w-full"
              onClick={() => setSubmittedEmail('')}
            >
              Use a different email
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
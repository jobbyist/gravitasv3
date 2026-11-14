import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { z } from "zod";

import { Logo } from "@/components/brand/logo";
import { MailIcon } from "@/components/landing/icons";
import { safeNext, useAuth } from "@/lib/auth";
import { pageHead } from "@/lib/seo";

const searchSchema = z.object({
  next: z.string().optional(),
  error: z.string().optional(),
});

export const Route = createFileRoute("/sign-in")({
  validateSearch: searchSchema,
  head: () =>
    pageHead({
      title: "Sign in",
      description: "Sign in to Gravitas with Google or a one-time email link.",
      path: "/sign-in",
      noindex: true,
    }),
  component: SignInPage,
});

const emailSchema = z.string().trim().email("Enter a valid email address.");

function SignInPage() {
  const { next, error: callbackError } = Route.useSearch();
  const destination = safeNext(next ?? "/");
  const { ready, user, signInWithGoogle, signInWithEmail } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "google">("idle");
  const [error, setError] = useState<string | null>(callbackError ?? null);

  useEffect(() => {
    if (ready && user) void navigate({ to: destination });
  }, [ready, user, destination, navigate]);

  async function onEmail(e: FormEvent) {
    e.preventDefault();
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Enter a valid email address.");
      return;
    }
    setError(null);
    setStatus("sending");
    const result = await signInWithEmail(parsed.data, destination);
    if (result.error) {
      setStatus("idle");
      setError(result.error);
    } else {
      setStatus("sent");
    }
  }

  async function onGoogle() {
    setError(null);
    setStatus("google");
    const result = await signInWithGoogle(destination);
    if (result.error) {
      setStatus("idle");
      setError(result.error);
    }
  }

  return (
    <main
      id="main"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-5 py-16"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(45% 50% at 50% 0%, color-mix(in oklab, var(--accent-b) 18%, transparent), transparent 70%)",
        }}
      />
      <div className="relative w-full max-w-sm">
        <Link to="/" aria-label="Gravitas home" className="mx-auto mb-10 flex w-fit">
          <Logo variant="mobile" />
        </Link>

        <div className="rounded-xl border border-border bg-card p-6 shadow-lg sm:p-8">
          <h1 className="font-display text-2xl font-bold tracking-tight">Sign in</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            No passwords. Use Google or get a one-time link by email.
          </p>

          {status === "sent" ? (
            <div role="status" className="mt-8 rounded-lg border border-border bg-elevated p-5">
              <MailIcon className="text-2xl text-accent-c" />
              <p className="mt-3 text-sm font-medium text-foreground">Check your inbox</p>
              <p className="mt-1 text-sm text-muted-foreground">
                We sent a sign-in link to <span className="text-foreground">{email}</span>. It
                expires in one hour.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-4 text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
              >
                Use a different email
              </button>
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={onGoogle}
                disabled={status !== "idle"}
                className="mt-8 flex w-full items-center justify-center gap-3 rounded-full border border-control bg-background px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-elevated disabled:cursor-wait disabled:opacity-60"
              >
                <GoogleIcon />
                {status === "google" ? "Redirecting to Google…" : "Continue with Google"}
              </button>

              <div className="my-6 flex items-center gap-3">
                <span className="h-px flex-1 bg-border" />
                <span className="meta-label">or</span>
                <span className="h-px flex-1 bg-border" />
              </div>

              <form onSubmit={onEmail} noValidate>
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={error ? true : undefined}
                  aria-describedby={error ? "signin-error" : undefined}
                  placeholder="you@company.com"
                  className="focus-gradient mt-2 w-full rounded-full border border-control bg-[var(--field-bg)] px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground"
                />
                <button
                  type="submit"
                  disabled={status !== "idle"}
                  className="mt-4 w-full rounded-full bg-accent-gradient px-5 py-3 text-sm font-semibold text-primary-foreground transition-[filter] hover:brightness-110 disabled:cursor-wait disabled:opacity-60"
                >
                  {status === "sending" ? "Sending link…" : "Email me a sign-in link"}
                </button>
              </form>
            </>
          )}

          {error ? (
            <p id="signin-error" role="alert" className="mt-4 text-sm text-error">
              {error}
            </p>
          ) : null}
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          By signing in you agree to our{" "}
          <Link to="/legal/$doc" params={{ doc: "terms" }} className="underline">
            Terms
          </Link>{" "}
          and{" "}
          <Link to="/legal/$doc" params={{ doc: "privacy" }} className="underline">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </main>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" width="18" height="18" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5Z"
      />
      <path
        fill="#FF3D00"
        d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7Z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2c-2 1.5-4.5 2.4-7.2 2.4-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44Z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5Z"
      />
    </svg>
  );
}

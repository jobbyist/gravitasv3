import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";

import { Emblem } from "@/components/brand/logo";
import { supabase } from "@/integrations/supabase/client";
import { safeNext } from "@/lib/auth";

export const Route = createFileRoute("/auth/callback")({
  validateSearch: z.object({
    next: z.string().optional(),
    code: z.string().optional(),
    error_description: z.string().optional(),
  }),
  head: () => ({ meta: [{ title: "Signing in…" }, { name: "robots", content: "noindex" }] }),
  component: AuthCallback,
});

/**
 * Landing page for Google OAuth and email magic links (PKCE). The client
 * exchanges the one-time code for a session, then forwards to `next`.
 */
function AuthCallback() {
  const { next, code, error_description } = Route.useSearch();
  const navigate = useNavigate();
  const [message, setMessage] = useState("Signing you in…");

  useEffect(() => {
    let cancelled = false;
    const destination = safeNext(next);

    async function finish() {
      if (error_description) {
        void navigate({ to: "/sign-in", search: { error: error_description, next: destination } });
        return;
      }
      // detectSessionInUrl may already have exchanged the code; only exchange if needed.
      const existing = await supabase.auth.getSession();
      if (!existing.data.session && code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) {
          if (!cancelled) setMessage("That link has expired or was already used.");
          void navigate({
            to: "/sign-in",
            search: {
              error: "That sign-in link has expired or was already used.",
              next: destination,
            },
          });
          return;
        }
      }
      if (!cancelled) void navigate({ href: destination, replace: true });
    }

    void finish();
    return () => {
      cancelled = true;
    };
  }, [next, code, error_description, navigate]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5 bg-background">
      <Emblem className="gv-preloader-emblem size-12" />
      <p role="status" className="text-sm text-muted-foreground">
        {message}
      </p>
    </main>
  );
}

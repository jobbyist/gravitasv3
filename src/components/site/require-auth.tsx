import { useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import { Emblem } from "@/components/brand/logo";
import type { AppRole } from "@/integrations/supabase/types";
import { useAuth } from "@/lib/auth";

/**
 * Client-side gate for signed-in areas. It only decides what to render: every
 * read and write is still enforced by Row Level Security in the database.
 */
export function RequireAuth({
  roles,
  children,
  fallback,
}: {
  /** If set, the user needs at least one of these roles. */
  roles?: readonly AppRole[];
  children: ReactNode;
  fallback?: ReactNode;
}) {
  const { ready, user, hasRole } = useAuth();
  const navigate = useNavigate();
  const href = useRouterState({ select: (s) => s.location.href });

  useEffect(() => {
    if (ready && !user) void navigate({ to: "/sign-in", search: { next: href } });
  }, [ready, user, href, navigate]);

  if (!ready || !user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Emblem className="gv-preloader-emblem size-10" />
      </div>
    );
  }

  if (roles && !hasRole(...roles)) {
    return (
      fallback ?? (
        <div className="mx-auto max-w-md px-5 py-24 text-center">
          <h1 className="font-display text-2xl font-bold">No access</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Your account ({user.email}) doesn’t have permission to view this page.
          </p>
        </div>
      )
    );
  }

  return <>{children}</>;
}

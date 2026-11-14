import type { Session, User } from "@supabase/supabase-js";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { supabase } from "@/integrations/supabase/client";
import type { AppRole } from "@/integrations/supabase/types";
import { absoluteUrl } from "@/lib/site";

export const STAFF_ROLES: readonly AppRole[] = [
  "super_admin",
  "admin",
  "editor",
  "client_manager",
  "finance_manager",
];
export const FUNDING_ROLES: readonly AppRole[] = ["super_admin", "admin", "finance_manager"];

interface AuthState {
  /** False until the first session check finishes in the browser. */
  ready: boolean;
  session: Session | null;
  user: User | null;
  roles: AppRole[];
  hasRole: (...roles: readonly AppRole[]) => boolean;
  isStaff: boolean;
  signInWithGoogle: (next?: string) => Promise<{ error: string | null }>;
  signInWithEmail: (email: string, next?: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthState | null>(null);

/** Only same-site paths are allowed as post-sign-in destinations. */
export function safeNext(next: string | undefined | null) {
  if (!next || !next.startsWith("/") || next.startsWith("//")) return "/";
  return next;
}

function callbackUrl(next?: string) {
  const origin = typeof window !== "undefined" ? window.location.origin : absoluteUrl("/");
  const url = new URL("/auth/callback", origin);
  url.searchParams.set("next", safeNext(next));
  return url.toString();
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [roles, setRoles] = useState<AppRole[]>([]);

  const loadRoles = useCallback(async (userId: string | undefined) => {
    if (!userId) {
      setRoles([]);
      return;
    }
    const { data, error } = await supabase.from("user_roles").select("role").eq("user_id", userId);
    setRoles(error ? [] : (data ?? []).map((r) => r.role));
  }, []);

  useEffect(() => {
    let active = true;

    supabase.auth.getSession().then(async ({ data }) => {
      if (!active) return;
      setSession(data.session);
      await loadRoles(data.session?.user.id);
      if (active) setReady(true);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
      // Defer the query so it never runs inside the auth callback's lock.
      setTimeout(() => {
        void loadRoles(next?.user.id).then(() => setReady(true));
      }, 0);
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, [loadRoles]);

  const value = useMemo<AuthState>(() => {
    const hasRole = (...wanted: readonly AppRole[]) => wanted.some((r) => roles.includes(r));
    return {
      ready,
      session,
      user: session?.user ?? null,
      roles,
      hasRole,
      isStaff: hasRole(...STAFF_ROLES),
      async signInWithGoogle(next) {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: "google",
          options: { redirectTo: callbackUrl(next) },
        });
        return { error: error?.message ?? null };
      },
      async signInWithEmail(email, next) {
        const { error } = await supabase.auth.signInWithOtp({
          email,
          options: { emailRedirectTo: callbackUrl(next), shouldCreateUser: true },
        });
        return { error: error?.message ?? null };
      },
      async signOut() {
        await supabase.auth.signOut();
        setRoles([]);
      },
    };
  }, [ready, session, roles]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}

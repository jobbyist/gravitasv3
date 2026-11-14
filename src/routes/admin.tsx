import { Link, Outlet, createFileRoute, useRouterState } from "@tanstack/react-router";

import { Logo } from "@/components/brand/logo";
import { RequireAuth } from "@/components/site/require-auth";
import { STAFF_ROLES, useAuth } from "@/lib/auth";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Admin | GRAVITAS.WTF" }, { name: "robots", content: "noindex, nofollow" }],
  }),
  component: AdminLayout,
});

const liveTabs = [
  { label: "Overview", to: "/admin" },
  { label: "Funding", to: "/admin/funding" },
] as const;

/** Control-centre modules arriving with Prompt 06 and later phases. */
const upcomingTabs = [
  "Users & roles",
  "Studio services",
  "Enquiries & leads",
  "Consultations",
  "Portfolio",
  "Dispatch",
  "Podcast",
  "Media library",
  "AI assistant",
  "Integrations",
  "Publishing schedules",
  "Clients & projects",
  "Invoices & payments",
  "Email templates",
  "Site settings & SEO",
  "Feature flags",
  "Audit log",
];

function AdminLayout() {
  return (
    <RequireAuth roles={STAFF_ROLES}>
      <AdminFrame />
    </RequireAuth>
  );
}

function AdminFrame() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-background lg:grid lg:grid-cols-[248px_minmax(0,1fr)]">
      <aside className="border-b border-border bg-obsidian lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto lg:border-b-0 lg:border-r">
        <div className="flex h-16 items-center justify-between px-5">
          <Link to="/" aria-label="Back to gravitas.wtf">
            <Logo className="text-xs" />
          </Link>
          <span className="meta-label">Admin</span>
        </div>
        <nav
          aria-label="Admin"
          className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-col lg:pb-6"
        >
          {liveTabs.map((tab) => {
            const active =
              tab.to === "/admin"
                ? pathname === "/admin" || pathname === "/admin/"
                : pathname.startsWith(tab.to);
            return (
              <Link
                key={tab.to}
                to={tab.to}
                aria-current={active ? "page" : undefined}
                className={`shrink-0 rounded-md px-3 py-2 text-sm transition-colors ${
                  active
                    ? "bg-elevated text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
          <p className="meta-label mt-6 hidden px-3 pb-1 lg:block">Coming next</p>
          {upcomingTabs.map((label) => (
            <span
              key={label}
              aria-disabled="true"
              className="hidden cursor-not-allowed px-3 py-1.5 text-sm text-muted-foreground/50 lg:block"
            >
              {label}
            </span>
          ))}
        </nav>
        <div className="hidden border-t border-border px-5 py-4 lg:block">
          <p className="truncate text-xs text-muted-foreground">{user?.email}</p>
          <button
            type="button"
            onClick={() => void signOut()}
            className="mt-2 text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground"
          >
            Sign out
          </button>
        </div>
      </aside>
      <main id="main" className="min-w-0 px-5 py-8 md:px-8 lg:py-10">
        <Outlet />
      </main>
    </div>
  );
}

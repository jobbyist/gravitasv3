import { useQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";

import { supabase } from "@/integrations/supabase/client";
import { FUNDING_ROLES, useAuth } from "@/lib/auth";
import { OPEN_STATUSES, daysUntil } from "@/lib/funding";

export const Route = createFileRoute("/admin/")({
  component: AdminOverview,
});

async function countRows(
  table: "dispatch_articles" | "funding_applications",
  filter?: (q: ReturnType<typeof base>) => ReturnType<typeof base>,
) {
  const q = base(table);
  const { count, error } = await (filter ? filter(q) : q);
  if (error) throw new Error(error.message);
  return count ?? 0;
}

function base(table: "dispatch_articles" | "funding_applications") {
  return supabase.from(table).select("id", { count: "exact", head: true });
}

function AdminOverview() {
  const { user, roles, hasRole } = useAuth();
  const canFund = hasRole(...FUNDING_ROLES);

  const stats = useQuery({
    queryKey: ["admin", "overview", canFund],
    queryFn: async () => {
      const [published, drafts] = await Promise.all([
        countRows("dispatch_articles", (q) => q.eq("status", "published")),
        countRows("dispatch_articles", (q) => q.neq("status", "published")),
      ]);
      let openFunding = 0;
      let dueSoon = 0;
      if (canFund) {
        const { data, error } = await supabase
          .from("funding_applications")
          .select("status, deadline");
        if (error) throw new Error(error.message);
        const open = (data ?? []).filter((r) =>
          (OPEN_STATUSES as readonly string[]).includes(r.status),
        );
        openFunding = open.length;
        dueSoon = open.filter((r) => {
          const d = daysUntil(r.deadline);
          return d !== null && d >= 0 && d <= 30;
        }).length;
      }
      return { published, drafts, openFunding, dueSoon };
    },
  });

  const cards = [
    { label: "Published articles", value: stats.data?.published, to: "/dispatch" },
    { label: "Draft articles", value: stats.data?.drafts },
    ...(canFund
      ? [
          {
            label: "Open funding applications",
            value: stats.data?.openFunding,
            to: "/admin/funding",
          },
          { label: "Deadlines in next 30 days", value: stats.data?.dueSoon, to: "/admin/funding" },
        ]
      : []),
  ];

  return (
    <div>
      <p className="eyebrow">Control centre</p>
      <h1 className="mt-2 font-display text-3xl font-bold tracking-tight">Overview</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Signed in as {user?.email} · {roles.filter((r) => r !== "member").join(", ") || "member"}
      </p>

      {stats.isError ? (
        <p role="alert" className="mt-8 text-sm text-error">
          Couldn’t load metrics: {(stats.error as Error).message}
        </p>
      ) : null}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((c) => {
          const inner = (
            <>
              <p className="meta-label">{c.label}</p>
              <p className="mt-3 font-display text-4xl font-bold">
                {stats.isLoading ? (
                  <span className="text-muted-foreground">…</span>
                ) : (
                  (c.value ?? "—")
                )}
              </p>
            </>
          );
          return c.to ? (
            <Link
              key={c.label}
              to={c.to}
              className="rounded-lg border border-border bg-card p-5 transition-colors hover:border-foreground/30"
            >
              {inner}
            </Link>
          ) : (
            <div key={c.label} className="rounded-lg border border-border bg-card p-5">
              {inner}
            </div>
          );
        })}
      </div>

      <section className="mt-12 rounded-lg border border-dashed border-border p-6">
        <h2 className="font-display text-lg font-semibold">Setting up</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          More modules (users and roles, Studio leads, portfolio, Dispatch editor, podcast, client
          projects, invoices, integrations, settings and audit log) arrive with the admin control
          centre phase. Metrics here only count real database records.
        </p>
      </section>
    </div>
  );
}

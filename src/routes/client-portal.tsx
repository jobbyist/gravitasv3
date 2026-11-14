import { Link, createFileRoute } from "@tanstack/react-router";

import { PageShell, buttonStyles } from "@/components/site/page-shell";
import { RequireAuth } from "@/components/site/require-auth";
import { StatusBadge } from "@/components/ui/status-badge";
import { useAuth } from "@/lib/auth";
import { pageHead } from "@/lib/seo";
import { contact } from "@/lib/site";

export const Route = createFileRoute("/client-portal")({
  head: () =>
    pageHead({
      title: "Client Portal",
      description: "Gravitas client portal: projects, deliverables, invoices and payments.",
      path: "/client-portal",
      noindex: true,
    }),
  component: () => (
    <PageShell>
      <RequireAuth>
        <PortalHome />
      </RequireAuth>
    </PageShell>
  ),
});

function PortalHome() {
  const { user, isStaff } = useAuth();
  return (
    <section className="mx-auto max-w-3xl px-5 py-20 md:px-8">
      <div className="flex items-center gap-3">
        <p className="eyebrow">Client Portal</p>
        <StatusBadge status="in-development" />
      </div>
      <h1 className="mt-4 font-display text-4xl font-bold tracking-tight">
        Welcome{user?.email ? `, ${user.email}` : ""}.
      </h1>
      <p className="mt-4 text-base leading-relaxed text-muted-foreground">
        Your projects, milestones, deliverables and invoices will appear here once your account is
        linked to a Gravitas project. We’re rolling the portal out to clients now.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <a href={`mailto:${contact.general}`} className={buttonStyles.secondary}>
          Contact your project team
        </a>
        {isStaff ? (
          <Link to="/admin" className={buttonStyles.primary}>
            Go to Admin
          </Link>
        ) : null}
      </div>
    </section>
  );
}

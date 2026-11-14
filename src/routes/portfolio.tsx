import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { PageHero, PageShell, Section, buttonStyles } from "@/components/site/page-shell";
import { StatusBadge } from "@/components/ui/status-badge";
import { ownershipLabel, portfolio, type Ownership } from "@/lib/portfolio";
import { breadcrumbJsonLd, pageHead } from "@/lib/seo";

const filters: { key: "all" | Ownership; label: string }[] = [
  { key: "all", label: "All Projects" },
  { key: "venture", label: "In-House Ventures" },
  { key: "client", label: "Client Work" },
  { key: "coming-soon", label: "Coming Soon" },
];

export const Route = createFileRoute("/portfolio")({
  head: () =>
    pageHead({
      title: "Portfolio",
      description:
        "Ventures Gravitas owns and operates, and digital systems built for clients: SkinLabs®, Puntr, Klymb, Jobbyist, LOUDMOUF™ and Cannaplug.",
      path: "/portfolio",
      jsonLd: [
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Portfolio", path: "/portfolio" },
        ]),
      ],
    }),
  component: PortfolioPage,
});

function PortfolioPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]["key"]>("all");
  const shown = filter === "all" ? portfolio : portfolio.filter((p) => p.ownership === filter);

  return (
    <PageShell>
      <PageHero
        eyebrow="Portfolio"
        title="What we’ve built, and who it belongs to."
        lede="Our own ventures sit next to systems we built for clients. For client work, the client owns the brand and the business; we say exactly what Gravitas built."
      />
      <Section>
        <div role="tablist" aria-label="Filter projects" className="mb-8 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.key}
              role="tab"
              type="button"
              aria-selected={filter === f.key}
              onClick={() => setFilter(f.key)}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                filter === f.key
                  ? "border-foreground bg-elevated text-foreground"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p) => (
            <article
              key={p.slug}
              className={`flex flex-col rounded-lg border bg-card p-6 ${
                p.ownership === "coming-soon" ? "border-dashed border-border" : "border-border"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="meta-label">{ownershipLabel[p.ownership]}</span>
                {p.status ? <StatusBadge status={p.status} /> : null}
              </div>
              <h2 className="mt-5 font-display text-2xl font-semibold">{p.name}</h2>
              <p className="mt-1 text-xs text-muted-foreground">{p.category}</p>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                {p.summary}
              </p>
              {p.capabilities.length ? (
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {p.capabilities.map((c) => (
                    <li
                      key={c}
                      className="rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground"
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              ) : null}
              {p.url ? (
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 text-sm text-foreground underline-offset-4 hover:underline"
                >
                  {new URL(p.url).hostname} ↗
                </a>
              ) : null}
            </article>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap gap-4">
          <Link to="/contact" className={buttonStyles.primary}>
            Hire Gravitas
          </Link>
          <Link to="/contact" className={buttonStyles.secondary}>
            Book a Consultation
          </Link>
        </div>
      </Section>
    </PageShell>
  );
}

import { Link, createFileRoute } from "@tanstack/react-router";

import { PageHero, PageShell, Section, buttonStyles } from "@/components/site/page-shell";
import { breadcrumbJsonLd, organizationJsonLd, pageHead } from "@/lib/seo";
import { brand, company, contact } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () =>
    pageHead({
      title: "About",
      description:
        "Gravitas Industries (Pty) Ltd is an AI-first venture studio in South Africa, founded by Michael E. Chigbu. We build for clients and for ourselves.",
      path: "/about",
      jsonLd: [
        organizationJsonLd,
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]),
      ],
    }),
  component: AboutPage,
});

const facts: [string, string][] = [
  ["Company", company.legalName],
  ["Registration number", company.registrationNumber],
  ["Country", company.country],
  ["Founder", company.founder],
  ["Positioning", "AI-First Venture Studio"],
  ["Contact", contact.general],
];

function AboutPage() {
  return (
    <PageShell>
      <PageHero eyebrow="About Gravitas" title={brand.manifesto} lede={brand.description} />

      <Section eyebrow="Who we are" title="An operating venture studio, not a portfolio template.">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
            <p>
              Gravitas runs two kinds of work under one roof. The{" "}
              <strong className="text-foreground">Studio</strong> designs, builds and maintains
              digital systems for businesses. Our{" "}
              <strong className="text-foreground">ventures</strong> are products we own and operate
              ourselves, including SkinLabs®, Puntr and Klymb.
            </p>
            <p>
              Client work keeps us close to real problems and funds patient product development.
              Running our own products means we live with what we build, and that experience goes
              straight back into client projects.
            </p>
            <p>
              We’re honest about stage. Every project on this site is labelled with where it
              actually is, and we don’t publish numbers we can’t back up.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                to="/dispatch/$slug"
                params={{ slug: "a-new-gravitas" }}
                className={buttonStyles.secondary}
              >
                Read: A New Gravitas
              </Link>
              <Link to="/partners" className={buttonStyles.secondary}>
                Partner with us
              </Link>
            </div>
          </div>
          <dl className="divide-y divide-border rounded-lg border border-border bg-card">
            {facts.map(([k, v]) => (
              <div key={k} className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:justify-between">
                <dt className="meta-label">{k}</dt>
                <dd className="text-sm text-foreground">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>
    </PageShell>
  );
}

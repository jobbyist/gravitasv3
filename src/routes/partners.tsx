import { createFileRoute } from "@tanstack/react-router";

import { PageHero, PageShell, Section, buttonStyles } from "@/components/site/page-shell";
import { pageHead } from "@/lib/seo";
import { contact } from "@/lib/site";

export const Route = createFileRoute("/partners")({
  head: () =>
    pageHead({
      title: "Partners",
      description:
        "Technology partnerships, accelerators, startup programmes, venture collaboration and commercial engagements with Gravitas.",
      path: "/partners",
    }),
  component: PartnersPage,
});

const categories = [
  "Technology partnerships",
  "Accelerator and startup programmes",
  "Funding opportunities",
  "Strategic partnerships",
  "Venture collaboration",
  "Commercial engagements",
];

function PartnersPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Partners"
        title="Build with Gravitas."
        lede="We work with technology partners, programmes and collaborators who help us move faster. We’ll be clear about what we’ve built, the stage each product is at, and what support would make a difference."
      >
        <a
          href={`mailto:${contact.partners}?subject=Partnership%20enquiry`}
          className={buttonStyles.primary}
        >
          {contact.partners}
        </a>
      </PageHero>
      <Section eyebrow="Conversations we welcome">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <li key={c} className="rounded-lg border border-border bg-card px-5 py-4 text-sm">
              {c}
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-2xl text-sm text-muted-foreground">
          Please include your organisation, what you have in mind and any relevant deadlines. A
          dedicated partnership and funding enquiry form is on the way.
        </p>
      </Section>
    </PageShell>
  );
}

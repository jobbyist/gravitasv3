import { createFileRoute } from "@tanstack/react-router";

import { MailIcon, WhatsAppIcon } from "@/components/landing/icons";
import { PageHero, PageShell, Section } from "@/components/site/page-shell";
import { pageHead } from "@/lib/seo";
import { contact } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead({
      title: "Contact",
      description:
        "Start a project, book a consultation or ask a question. Email hey@gravitas.wtf or message Gravitas on WhatsApp.",
      path: "/contact",
    }),
  component: ContactPage,
});

const routes = [
  { label: "Projects, consultations and general enquiries", email: contact.general },
  { label: "Partnerships, funding and programmes", email: contact.partners },
  { label: "Invoices and billing", email: contact.billing },
  { label: "Legal and privacy", email: contact.legal },
];

function ContactPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Contact"
        title="Tell us what you’re building."
        lede="Share a little about the project, your timeline and a rough budget. You’ll hear back from the people who would actually build it."
      />
      <Section>
        <div className="grid gap-4 md:grid-cols-2">
          <a
            href={`mailto:${contact.general}?subject=Project%20enquiry`}
            className="group rounded-lg border border-border bg-card p-6 transition-colors hover:border-foreground/40"
          >
            <MailIcon className="text-2xl text-accent-c" />
            <h2 className="mt-5 font-display text-xl font-semibold">Email us</h2>
            <p className="mt-1 text-sm text-muted-foreground">{contact.general}</p>
          </a>
          <a
            href={contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-lg border border-border bg-card p-6 transition-colors hover:border-foreground/40"
          >
            <WhatsAppIcon className="text-2xl text-live" />
            <h2 className="mt-5 font-display text-xl font-semibold">WhatsApp</h2>
            <p className="mt-1 text-sm text-muted-foreground">{contact.whatsappNumber}</p>
          </a>
        </div>
        <dl className="mt-10 divide-y divide-border border-y border-border">
          {routes.map((r) => (
            <div key={r.email} className="flex flex-col gap-1 py-4 sm:flex-row sm:justify-between">
              <dt className="text-sm text-muted-foreground">{r.label}</dt>
              <dd>
                <a href={`mailto:${r.email}`} className="text-sm text-foreground hover:underline">
                  {r.email}
                </a>
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-8 text-xs text-muted-foreground">
          An online project enquiry form and consultation booking are coming to the Studio soon.
        </p>
      </Section>
    </PageShell>
  );
}

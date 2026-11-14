import { Link, createFileRoute } from "@tanstack/react-router";

import { ArrowRightIcon } from "@/components/landing/icons";
import { PageHero, PageShell, Section, buttonStyles } from "@/components/site/page-shell";
import { breadcrumbJsonLd, pageHead } from "@/lib/seo";

const services = [
  {
    title: "Workflow Management Systems & Automation",
    desc: "Internal workflow tools, approvals, document processing, CRM and API integrations, automated reporting.",
  },
  {
    title: "Website & Application Design and Development",
    desc: "Websites, SaaS products, progressive web apps, MVPs and prototypes. UX/UI, front end, back end and deployment.",
  },
  {
    title: "Custom Digital Dashboards",
    desc: "Internal and customer-facing dashboards, admin portals, analytics, reporting and data visualisation.",
  },
  {
    title: "Automated Multi-Channel Marketing Engines",
    desc: "Email, SMS and WhatsApp automation, lifecycle journeys, segmentation and transactional notifications.",
  },
  {
    title: "AI Voice Receptionists & Sales Chatbots",
    desc: "Website and WhatsApp assistants, lead qualification and booking, grounded in your own business knowledge.",
  },
  {
    title: "Editorial-Grade Content Generation & Marketing",
    desc: "AI-assisted editorial workflows, SEO content, newsletters, social and podcast production pipelines.",
  },
  {
    title: "High-Fidelity Visuals, Graphics & Marketing Assets",
    desc: "Brand identity, campaign and ad creative, product mockups, editorial artwork and presentation design.",
  },
];

export const Route = createFileRoute("/studio")({
  head: () =>
    pageHead({
      title: "Studio",
      description:
        "Gravitas Studio designs, develops and deploys intelligent digital systems: websites, apps, dashboards, automation, AI assistants and content engines.",
      path: "/studio",
      jsonLd: [
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Studio", path: "/studio" },
        ]),
      ],
    }),
  component: StudioPage,
});

function StudioPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Gravitas Studio"
        title="Big ideas. Unreasonable execution."
        lede="We design, develop and deploy intelligent digital systems that help businesses operate smarter, communicate better and build what comes next."
      >
        <Link to="/contact" className={buttonStyles.primary}>
          Start a Project
          <ArrowRightIcon />
        </Link>
        <Link to="/contact" className={buttonStyles.secondary}>
          Book a Consultation
        </Link>
      </PageHero>

      <Section eyebrow="Services" title="What we build">
        <div className="grid gap-4 md:grid-cols-2">
          {services.map((s, i) => (
            <article key={s.title} className="rounded-lg border border-border bg-card p-6">
              <span className="text-accent-gradient font-display text-sm font-bold">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </article>
          ))}
        </div>
        <p className="mt-8 text-sm text-muted-foreground">
          Detailed service pages, project enquiries and consultation booking are on the way. Until
          then,{" "}
          <Link to="/contact" className="text-foreground underline">
            get in touch
          </Link>{" "}
          and we’ll come back to you directly.
        </p>
      </Section>
    </PageShell>
  );
}

import { createFileRoute } from "@tanstack/react-router";

import { PageHero, PageShell } from "@/components/site/page-shell";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/origin")({
  head: () =>
    pageHead({
      title: "Origin",
      description: "ORIGIN, an AI coding assistant from Gravitas. Coming January 2027.",
      path: "/origin",
    }),
  component: () => (
    <PageShell>
      <PageHero
        eyebrow="Origin"
        status="coming-soon"
        title="ORIGIN"
        lede="An AI coding assistant from Gravitas. Coming January 2027. Origin isn’t available yet; we’ll announce it on Dispatch when there’s something real to try."
      />
    </PageShell>
  ),
});

import { createFileRoute } from "@tanstack/react-router";

import { PageHero, PageShell } from "@/components/site/page-shell";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/community")({
  head: () =>
    pageHead({
      title: "Community",
      description:
        "Gravitas Community, coming January 2027: a place for founders, builders, clients and collaborators.",
      path: "/community",
    }),
  component: () => (
    <PageShell>
      <PageHero
        eyebrow="Community"
        status="coming-soon"
        title="Community. Coming January 2027."
        lede="A place for founders, freelancers, developers, clients and collaborators to share what’s working: how to use AI properly, ship with a small team and build products for South Africa and beyond. We’ll share how to join closer to launch."
      />
    </PageShell>
  ),
});

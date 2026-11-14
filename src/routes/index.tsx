import { createFileRoute } from "@tanstack/react-router";

import {
  ApproachSection,
  DispatchSection,
  EcosystemSection,
  Hero,
  PodcastSection,
  SelectedWorkSection,
  WhatWeDoSection,
  WorkWithUsSection,
} from "@/components/landing/sections";
import { PageShell } from "@/components/site/page-shell";
import { listArticles } from "@/lib/dispatch";
import { organizationJsonLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
  loader: async () => ({ articles: await listArticles(3) }),
  head: () =>
    pageHead({
      title: "GRAVITAS.WTF | An AI-First Venture Studio",
      description:
        "Gravitas is an AI-first venture studio. We combine AI, creative thinking and engineering to turn ambitious ideas into products, platforms and ventures.",
      path: "/",
      jsonLd: [organizationJsonLd],
    }),
  component: LandingPage,
});

function LandingPage() {
  const { articles } = Route.useLoaderData();
  return (
    <PageShell>
      <Hero />
      <WhatWeDoSection />
      <SelectedWorkSection />
      <ApproachSection />
      <DispatchSection articles={articles} />
      <PodcastSection />
      <EcosystemSection />
      <WorkWithUsSection />
    </PageShell>
  );
}

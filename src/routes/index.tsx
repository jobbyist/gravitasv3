import { createFileRoute } from "@tanstack/react-router";

import { SiteFooter } from "@/components/landing/footer";
import { SiteNav } from "@/components/landing/nav";
import {
  CommunityOriginSection,
  DispatchSection,
  Hero,
  PlatformSection,
  PortfolioSection,
} from "@/components/landing/sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gravitas v3 — Build what comes next." },
      {
        name: "description",
        content:
          "Gravitas is an independent, community-first AI venture studio building the next generation of digital products, media experiences, tools and services.",
      },
      { property: "og:title", content: "Gravitas v3 — Build what comes next." },
      {
        property: "og:description",
        content:
          "Independent, community-first AI venture studio. Ideas. People. Products. Gravitas.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <SiteNav />
      <main>
        <Hero />
        <PlatformSection />
        <DispatchSection />
        <CommunityOriginSection />
        <PortfolioSection />
      </main>
      <SiteFooter />
    </div>
  );
}

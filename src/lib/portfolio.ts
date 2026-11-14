import type { StatusKey } from "@/lib/status";

/**
 * Approved public portfolio (Prompt 03 brief). Scoutr and The Mannuh Project are
 * deliberately absent: they stay hidden until an administrator publishes them.
 * Only verified URLs appear here; client sites without an approved URL show none.
 * This list moves to the database with the portfolio admin in Prompt 03.
 */
export type Ownership = "venture" | "client" | "coming-soon";

export interface PortfolioProject {
  slug: string;
  name: string;
  category: string;
  ownership: Ownership;
  status?: StatusKey;
  summary: string;
  capabilities: string[];
  url?: string;
}

export const portfolio: PortfolioProject[] = [
  {
    slug: "skinlabs",
    name: "SkinLabs®",
    category: "Skincare Technology / AI",
    ownership: "venture",
    status: "live",
    summary:
      "A community-driven skincare platform combining AI-assisted skin analysis, educational resources and personalised routines.",
    capabilities: ["SKYNN AI", "Skin analysis", "Smart Routines", "Skincare education"],
    url: "https://skinlabs.co.za",
  },
  {
    slug: "puntr",
    name: "Puntr",
    category: "Sports Intelligence",
    ownership: "venture",
    status: "in-development",
    summary:
      "A sports intelligence and community platform for South African sports fans, punters and tipsters.",
    capabilities: ["Match insights", "Results and leaderboards", "Community features"],
    url: "https://puntr.co.za",
  },
  {
    slug: "klymb",
    name: "Klymb",
    category: "Financial Intelligence / AI",
    ownership: "venture",
    status: "preview",
    summary:
      "An AI-powered financial intelligence platform that helps traders interpret market information and spot opportunities.",
    capabilities: ["Market interpretation", "Opportunity discovery", "AI analysis"],
    url: "https://klymb.live",
  },
  {
    slug: "jobbyist",
    name: "Jobbyist",
    category: "Recruitment Technology",
    ownership: "client",
    summary:
      "A recruitment and job-discovery platform focused on making employment opportunities easier to find.",
    capabilities: ["Job discovery", "Search and indexing", "SEO-driven distribution"],
    url: "https://jobbyist.africa",
  },
  {
    slug: "loudmouf",
    name: "LOUDMOUF™",
    category: "Consumer Brand / Digital Commerce",
    ownership: "client",
    summary:
      "A consumer brand and digital experience, developed through Gravitas' creative and technical work.",
    capabilities: ["Brand identity", "Product catalogue", "Digital experience"],
  },
  {
    slug: "cannaplug",
    name: "Cannaplug",
    category: "Digital Commerce",
    ownership: "client",
    summary:
      "Digital commerce and operational infrastructure: product discovery, customer accounts, administration and point of sale.",
    capabilities: ["Digital commerce", "Customer accounts", "Admin and POS", "Payments"],
  },
  {
    slug: "monogamy",
    name: "Monogamy",
    category: "Lifestyle Technology",
    ownership: "coming-soon",
    status: "coming-soon",
    summary: "A digital lifestyle product from Gravitas. More soon.",
    capabilities: [],
  },
];

export const ownershipLabel: Record<Ownership, string> = {
  venture: "In-house venture",
  client: "Client work",
  "coming-soon": "Coming soon",
};

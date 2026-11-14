import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { safeNext } from "@/lib/auth";
import { daysUntil, emptyFundingForm, fundingFormSchema } from "@/lib/funding";
import { renderMarkdown } from "@/lib/markdown";
import { portfolio } from "@/lib/portfolio";
import { socials } from "@/lib/site";
import { routeTree } from "@/routeTree.gen";

describe("Prompt 01 routes", () => {
  const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
  it.each([
    "/studio",
    "/portfolio",
    "/dispatch",
    "/dispatch/a-new-gravitas",
    "/about",
    "/community",
    "/origin",
    "/contact",
    "/partners",
    "/legal/privacy",
    "/sign-in",
    "/auth/callback",
    "/client-portal",
    "/admin",
    "/admin/funding",
  ])("matches %s", (path) => {
    expect(router.matchRoutes(path).at(-1)?.routeId).not.toBe(rootRouteId);
  });
});

describe("safeNext", () => {
  it("allows same-site paths only", () => {
    expect(safeNext("/admin")).toBe("/admin");
    expect(safeNext("//evil.com")).toBe("/");
    expect(safeNext("https://evil.com")).toBe("/");
    expect(safeNext(undefined)).toBe("/");
  });
});

describe("markdown", () => {
  it("drops raw HTML and unsafe links", () => {
    const html = renderMarkdown("Hi <script>alert(1)</script> [x](javascript:alert(1))");
    expect(html).not.toContain("<script");
    expect(html).not.toContain("javascript:");
  });
  it("opens external links safely", () => {
    expect(renderMarkdown("[s](https://example.com)")).toContain('rel="noopener noreferrer"');
  });
});

describe("funding form", () => {
  it("requires programme and funder", () => {
    expect(fundingFormSchema.safeParse(emptyFundingForm()).success).toBe(false);
  });
  it("normalises empty optional fields to null", () => {
    const parsed = fundingFormSchema.parse({
      ...emptyFundingForm(),
      programme: "Parallel for Startups",
      funder: "Parallel",
      amount_requested: "50000",
    });
    expect(parsed.amount_requested).toBe(50000);
    expect(parsed.deadline).toBeNull();
    expect(parsed.url).toBeNull();
  });
  it("counts days to a deadline", () => {
    expect(daysUntil("2026-11-20", new Date("2026-11-14T10:00:00+02:00"))).toBe(6);
  });
});

describe("brand rules", () => {
  it("publishes only Substack, Medium and WhatsApp", () => {
    expect(socials.map((s) => s.label)).toEqual(["Substack", "Medium", "WhatsApp"]);
  });
  it("keeps Scoutr and The Mannuh Project out of the public portfolio", () => {
    const names = portfolio.map((p) => p.name.toLowerCase()).join(" ");
    expect(names).not.toContain("scoutr");
    expect(names).not.toContain("mannuh");
    expect(portfolio.find((p) => p.slug === "monogamy")?.ownership).toBe("coming-soon");
  });
});

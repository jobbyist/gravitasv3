import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });
});

describe("Design system route", () => {
  it("matches /design and marks it noindex", async () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/design");
    const route = matches.at(-1);

    expect(route?.routeId).toBe("/design");
    const head = await router.routesById["/design"].options.head?.({} as never);
    const robots = head?.meta?.find((m) => m !== undefined && "name" in m && m.name === "robots");
    expect(robots).toMatchObject({ content: expect.stringContaining("noindex") });
  });

  it("is not linked from the primary navigation or footer", async () => {
    const { readFileSync } = await import("node:fs");
    const { resolve } = await import("node:path");
    for (const file of ["nav.tsx", "footer.tsx", "sections.tsx"]) {
      const source = readFileSync(resolve(__dirname, "../components/landing", file), "utf8");
      expect(source).not.toMatch(/["'`#/]design["'`]/);
    }
  });
});

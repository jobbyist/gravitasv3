import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Logo } from "@/components/brand/logo";
import { StatusBadge } from "@/components/ui/status-badge";
import { STATUS_KEYS, statusMeta } from "@/lib/status";

describe("<StatusBadge />", () => {
  it.each(STATUS_KEYS)("renders the %s status as readable text", (status) => {
    const { container } = render(<StatusBadge status={status} />);
    const badge = container.querySelector(`[data-status="${status}"]`);

    expect(badge).not.toBeNull();
    expect(badge).toHaveTextContent(statusMeta[status].label);
  });

  it("covers every blueprint status", () => {
    expect([...STATUS_KEYS].sort()).toEqual([
      "building",
      "coming-soon",
      "core",
      "in-development",
      "live",
      "preview",
      "testing",
      "waitlist",
    ]);
  });

  it("announces the status to assistive tech", () => {
    render(<StatusBadge status="building" />);

    expect(screen.getByText("Status:")).toHaveClass("sr-only");
  });

  it("accepts a label override", () => {
    render(<StatusBadge status="core" label="xs · 480" />);

    expect(screen.getByText("xs · 480")).toBeInTheDocument();
  });
});

describe("<Logo />", () => {
  it("exposes one accessible name for the horizontal lockup", () => {
    render(<Logo />);

    expect(screen.getByRole("img", { name: "Gravitas v3" })).toBeInTheDocument();
  });

  it("gives each emblem instance its own gradient id", () => {
    const { container } = render(
      <>
        <Logo variant="emblem" />
        <Logo variant="emblem" />
      </>,
    );
    const ids = [...container.querySelectorAll("linearGradient")].map((g) => g.id);

    expect(new Set(ids).size).toBe(2);
  });
});

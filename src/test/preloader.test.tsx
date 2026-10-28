import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { PRELOADER_STORAGE_KEY, PRELOADER_TIMING, Preloader } from "@/components/brand/preloader";

describe("<Preloader />", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    sessionStorage.clear();
  });
  afterEach(() => vi.useRealTimers());

  it("closes within the 5-8 second window", () => {
    const total = PRELOADER_TIMING.fillMs + PRELOADER_TIMING.readyMs + PRELOADER_TIMING.fadeMs;

    expect(total).toBeGreaterThanOrEqual(5000);
    expect(total).toBeLessThanOrEqual(8000);
  });

  it("shows the loading copy, then 'You’re all set', then removes itself", () => {
    render(<Preloader />);
    expect(screen.getByText("Preparing your experience…")).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toBeInTheDocument();

    act(() => void vi.advanceTimersByTime(PRELOADER_TIMING.fillMs));
    expect(screen.getByText("You’re all set")).toBeInTheDocument();

    act(() => void vi.advanceTimersByTime(PRELOADER_TIMING.readyMs + PRELOADER_TIMING.fadeMs));
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(sessionStorage.getItem(PRELOADER_STORAGE_KEY)).toBe("1");
  });

  it("does not show again in the same session", () => {
    sessionStorage.setItem(PRELOADER_STORAGE_KEY, "1");
    render(<Preloader />);

    expect(screen.queryByRole("dialog")).toBeNull();
  });
});

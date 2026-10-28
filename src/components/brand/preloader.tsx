import { useEffect, useState } from "react";

import { Emblem } from "./logo";

/**
 * Branded preloader. One run is 6.1s from navigation start, inside the 5-8s window:
 *
 *   0 - 4.5s   "Preparing your experience…" while the bar fills
 *   4.5 - 5.6s "You're all set" with the bar complete
 *   5.6 - 6.1s fade out, then the overlay is removed
 *
 * It shows once per browser session (sessionStorage), so navigating or reloading
 * within a session does not repeat it. The boot script below sets
 * `data-preloaded` before first paint to avoid a flash on repeat visits.
 */
export const PRELOADER_STORAGE_KEY = "gravitas:preloaded";
export const PRELOADER_TIMING = { fillMs: 4500, readyMs: 1100, fadeMs: 500 } as const;

export const PRELOADER_BOOT_SCRIPT = `try{if(sessionStorage.getItem("${PRELOADER_STORAGE_KEY}"))document.documentElement.setAttribute("data-preloaded","")}catch(e){}`;

type Phase = "loading" | "ready" | "closing" | "done";

export function Preloader() {
  const [phase, setPhase] = useState<Phase>("loading");

  useEffect(() => {
    try {
      if (sessionStorage.getItem(PRELOADER_STORAGE_KEY)) {
        setPhase("done");
        return;
      }
    } catch {
      /* storage blocked: show the preloader every time */
    }

    const { fillMs, readyMs, fadeMs } = PRELOADER_TIMING;
    const timers = [
      window.setTimeout(() => setPhase("ready"), fillMs),
      window.setTimeout(() => setPhase("closing"), fillMs + readyMs),
      window.setTimeout(
        () => {
          setPhase("done");
          try {
            sessionStorage.setItem(PRELOADER_STORAGE_KEY, "1");
          } catch {
            /* ignore */
          }
        },
        fillMs + readyMs + fadeMs,
      ),
    ];
    return () => timers.forEach(window.clearTimeout);
  }, []);

  // Keep the page from scrolling behind the overlay.
  useEffect(() => {
    if (phase === "done") return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [phase]);

  if (phase === "done") return null;

  const ready = phase === "ready" || phase === "closing";

  return (
    <div
      id="gv-preloader"
      data-phase={phase}
      role="dialog"
      aria-modal="true"
      aria-label="Loading Gravitas"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-8 bg-obsidian transition-opacity duration-500 ease-out data-[phase=closing]:opacity-0"
    >
      <Emblem className="gv-preloader-emblem size-20" />

      <div className="flex w-[min(280px,70vw)] flex-col items-center gap-4">
        <div
          role="progressbar"
          aria-label="Loading"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={ready ? 100 : undefined}
          className="h-1 w-full overflow-hidden rounded-full bg-elevated"
        >
          <div
            className="gv-preloader-bar h-full origin-left rounded-full bg-accent-gradient"
            style={{ ["--gv-fill-ms" as string]: `${PRELOADER_TIMING.fillMs}ms` }}
          />
        </div>
        <p role="status" aria-live="polite" className="meta-label !text-foreground">
          {ready ? "You’re all set" : "Preparing your experience…"}
        </p>
      </div>
    </div>
  );
}

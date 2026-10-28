import emblem from "@/assets/emblem.png";

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <img
        src={emblem}
        alt="Gravitas emblem"
        width={816}
        height={816}
        className="size-7 shrink-0"
      />
      <span className="font-display text-sm font-bold tracking-[0.35em] text-foreground">
        GRAVITAS
      </span>
      <span className="self-start text-[10px] font-semibold text-muted-foreground">
        v3
      </span>
    </span>
  );
}

import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "focus-gradient flex min-h-[96px] w-full rounded-md border border-control bg-card px-3 py-2 text-base transition-[box-shadow,border-color] placeholder:text-muted-foreground aria-[invalid=true]:border-error disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };

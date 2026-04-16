import * as React from "react";
import { cn } from "./Button"; // reuse cn

function Badge({
  className,
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { variant?: "default" | "secondary" | "outline" }) {
  const variants = {
    default: "border-transparent bg-red-700 text-white shadow hover:bg-red-800",
    secondary: "border-transparent bg-red-100 text-red-950 hover:bg-red-200",
    outline: "border-neutral-300 text-neutral-950",
  };
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-red-800 focus:ring-offset-2",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };

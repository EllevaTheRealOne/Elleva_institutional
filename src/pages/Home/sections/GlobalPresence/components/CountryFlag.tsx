import React from "react";
import { cn } from "@/lib/utils";

interface CountryFlagProps {
  /** ISO 3166-1 alpha-2. */
  code: string;
  className?: string;
}

/**
 * The same round flag the language switcher draws (flag-icons, `fi fi-{code}`).
 * Decorative: the country's name is always written next to it.
 */
export const CountryFlag: React.FC<CountryFlagProps> = ({ code, className }) => (
  <span
    aria-hidden="true"
    className={cn("flex size-4 shrink-0 overflow-hidden rounded-full bg-white/10", className)}
  >
    <span className={`fi fi-${code.toLowerCase()} block size-full! bg-cover! bg-center! bg-no-repeat!`} />
  </span>
);

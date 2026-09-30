import React from "react";
import { cn } from "@/lib/utils";

interface FigureProps {
  label: string;
  aside?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

/** A headline figure tile: label, then the value (and an optional aside on the right). */
export const Figure: React.FC<FigureProps> = ({ label, aside, className, children }) => (
  <div className={cn("rounded-lg border border-[rgba(245,247,246,0.06)] bg-[#0A0D0F] px-4 py-3.5", className)}>
    <dt className="font-ui text-[11px] leading-tight text-[#8E9995]">{label}</dt>
    <dd className="mt-2 flex items-end justify-between gap-3">
      <span className="font-ui text-[1.75rem] font-bold leading-none tracking-[-0.02em] text-[#F5F7F6]">{children}</span>
      {aside}
    </dd>
  </div>
);

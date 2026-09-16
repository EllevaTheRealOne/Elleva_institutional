import React from "react";
import { cn } from "@/lib/utils";

export type SlideTone = "dark" | "teal" | "light";

interface SlideProps {
  id: string;
  tone: SlideTone;
  className?: string;
  /** Hide the wordmark and the dashes, for slides that draw their own ground. */
  bare?: boolean;
  children: React.ReactNode;
}

/**
 * One slide of the deck, as a page section.
 *
 * Every slide in the source deck shares the same chrome: the spaced ELLEVA
 * wordmark in the bottom-left corner and two dashes in the bottom-right.
 * The tone picks the ground — near-black, turquoise or white — and the type
 * colours follow it through the `.bp-*` classes.
 */
export const Slide: React.FC<SlideProps> = ({
  id,
  tone,
  className,
  bare = false,
  children,
}) => {
  return (
    <section
      id={id}
      className={cn("bp-slide", `bp-${tone}`, "py-20 sm:py-24 lg:py-28", className)}
    >
      <div className="bp-chrome mx-auto w-full max-w-7xl px-6 sm:px-10">
        {children}

        {!bare && (
          <div className="mt-14 flex items-center justify-between sm:mt-20">
            <span className="bp-wordmark">Elleva</span>
            <span className="bp-dashes" aria-hidden="true">
              <span />
              <span />
            </span>
          </div>
        )}
      </div>
    </section>
  );
};

interface SlideHeaderProps {
  eyebrow?: string;
  title: React.ReactNode;
  className?: string;
  align?: "left" | "center";
  size?: "md" | "xl";
  children?: React.ReactNode;
}

/** Eyebrow + headline, in the deck's proportions. */
export const SlideHeader: React.FC<SlideHeaderProps> = ({
  eyebrow,
  title,
  className,
  align = "left",
  size = "md",
  children,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow && <div className="bp-eyebrow">{eyebrow}</div>}
      <h2 className={cn("bp-h1", size === "xl" && "bp-h1-xl")}>{title}</h2>
      {children}
    </div>
  );
};

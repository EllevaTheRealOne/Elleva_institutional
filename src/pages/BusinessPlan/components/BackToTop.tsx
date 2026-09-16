import React from "react";
import { useTranslation } from "react-i18next";
import { ArrowUp } from "lucide-react";

/**
 * A fixed control that returns the visitor to the top of the page.
 *
 * Always on screen. On wide screens it is a pill with a label; on phones it
 * shrinks to a small, translucent disc in the corner so it never sits on the
 * copy the reader is scrolling through.
 */
export const BackToTop: React.FC = () => {
  const { t } = useTranslation("nav");
  const label = t("footer.backToTop");

  const scrollToTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={label}
      title={label}
      className="bp-back-to-top fixed z-[9000] flex cursor-pointer items-center justify-center gap-2 rounded-full border transition-all duration-200 hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--bp-cyan)]"
    >
      <ArrowUp className="size-4 sm:size-4" strokeWidth={2.5} />
      <span className="hidden font-[Montserrat] text-[0.65rem] font-semibold uppercase tracking-[0.2em] sm:inline">
        {label}
      </span>
    </button>
  );
};

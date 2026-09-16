import React from "react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";
import heroBackdrop from "@/assets/business-plan/hero-backdrop.webp";
import { scrollToSection } from "@/layout/utils/scrollToSection";

/**
 * The deck's cover: the three-dimensional mark on the black ground, exactly
 * as drawn. The image carries the composition; the page adds only the
 * eyebrow, an accessible heading and a cue to scroll.
 */
export const Hero: React.FC = () => {
  const { t } = useTranslation("business-plan");

  return (
    <section
      id="hero"
      className="bp-slide bp-dark relative flex min-h-[92vh] items-end overflow-hidden"
      style={{
        backgroundImage: `url(${heroBackdrop})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="sr-only">{t("hero.title")}</h1>

      <div className="bp-chrome mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 pb-24 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col items-center gap-5 text-center"
        >
          <span className="bp-eyebrow">{t("hero.eyebrow")}</span>
          <button
            type="button"
            onClick={() => scrollToSection("#overview")}
            className="bp-small inline-flex cursor-pointer items-center gap-2 rounded-full border border-[rgba(26,230,214,0.4)] px-4 py-2 text-[var(--bp-cyan)] transition-colors hover:bg-[rgba(26,230,214,0.1)]"
          >
            {t("hero.scrollCue")}
            <ChevronDown className="size-4" />
          </button>
        </motion.div>
        {/* No wordmark or dashes here: the cover image already carries both. */}
      </div>
    </section>
  );
};

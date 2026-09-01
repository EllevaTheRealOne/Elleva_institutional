import React from "react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

interface HeroProps {
  isDark?: boolean;
  onRequestAccess?: () => void;
}

type HeroStat = { value: string; label: string };

/**
 * The opening section.
 *
 * Left-aligned rather than centred, and built as a sequence: an eyebrow, the
 * headline, the claim, then the three figures the rest of the page goes on to
 * argue. The composition is asymmetric on purpose — the
 * drawn scene occupies the right, so the type is given the left and never
 * fights it for the middle of the screen.
 */
export const Hero: React.FC<HeroProps> = ({ isDark = false }) => {
  const { t } = useTranslation(["home", "common"]);
  const stats = t("hero.stats", { returnObjects: true }) as HeroStat[];
  const title = t("hero.title");

  // The two words that name the category carry the accent; the rest of the
  // headline stays white. Colour is doing work here, not decorating.
  const accent = t("hero.accent", { defaultValue: "Autônoma de IA" });
  const [before, after] = title.includes(accent)
    ? [title.slice(0, title.indexOf(accent)), title.slice(title.indexOf(accent) + accent.length)]
    : [title, ""];

  return (
    <section
      id="hero"
      className={`relative min-h-screen flex items-center overflow-hidden py-28 sm:py-32 transition-colors duration-300 ${
        isDark ? "bg-[#050607] text-[#F5F7F6]" : "bg-[#F7F8F6] text-[#0A0D0C]"
      }`}
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="type-micro mb-5 uppercase tracking-[0.2em] text-[#8E9995]"
          >
            {t("hero.eyebrow")}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.06 }}
            className="type-hero-title"
          >
            {before}
            <span className="bg-gradient-to-r from-[#0C5F5A] to-[#189890] bg-clip-text text-transparent">
              {accent}
            </span>
            {after}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16 }}
            className={`type-body mt-7 max-w-2xl ${isDark ? "text-[#8E9995]" : "text-[#4E5653]"}`}
          >
            {t("hero.description")}
          </motion.p>

          {Array.isArray(stats) && (
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.09 }}
                >
                  <div className="type-hero-metric tabular-nums">{s.value}</div>
                  <div className="type-micro mt-2 uppercase tracking-[0.14em] text-[#8E9995]">
                    {s.label}
                  </div>
                  {/* The rule draws itself in after the figure has landed. */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.9, delay: 0.42 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-4 h-px origin-left bg-gradient-to-r from-[#0C5F5A] to-[#189890]"
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

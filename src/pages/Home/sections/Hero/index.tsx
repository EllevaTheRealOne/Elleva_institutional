import React from "react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

interface HeroProps {
  isDark?: boolean;
  onRequestAccess?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  isDark = false,
  onRequestAccess,
}) => {
  const { t } = useTranslation(["home", "common"]);



  return (
    <section
      id="hero"
      className={`relative pt-28 pb-14 sm:pt-36 sm:pb-20 overflow-hidden h-screen flex items-center justify-center transition-colors duration-300 ${
        isDark ? "bg-[#050607] text-[#F5F7F6]" : "bg-[#F7F8F6] text-[#0A0D0C]"
      }`}
    >
      {/* Dot pattern background */}
      <div
        className={`absolute inset-0 pointer-events-none ${
          isDark
            ? "dot-pattern-dark opacity-40"
            : "dot-pattern-light opacity-60"
        }`}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">
        <div className="flex flex-col gap-8 lg:gap-10">
          {/* Left Column: Narrative */}
          <div className="w-full flex flex-col justify-center gap-6">
            <div className="space-y-4 text-center max-w-3xl mx-auto">
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="type-hero-title w-full"
              >
                {t("hero.title")}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className={`type-body w-full ${
                  isDark ? "text-[#8E9995]" : "text-[#4E5653]"
                }`}
              >
                {t("hero.description")}
              </motion.p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};


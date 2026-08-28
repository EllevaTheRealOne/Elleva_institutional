import React, { useState } from "react";
import { ShieldCheck, CheckCircle2, Lock } from "lucide-react";
import { useTranslation } from "react-i18next";

interface FinalCTAProps {
  isDark?: boolean;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ isDark = false }) => {
  const { t } = useTranslation(["home", "common"]);

  return (
    <footer
      id="final-cta"
      className={`py-24 sm:py-32 border-t transition-colors duration-300 ${
        isDark
          ? "bg-[#050607] border-[rgba(245,247,246,0.08)] text-[#F5F7F6]"
          : "bg-[#F1F3F1] border-[rgba(10,13,12,0.08)] text-[#0A0D0C]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Main Institutional CTA Banner */}
        <div
          className={`p-8 sm:p-14 rounded-2xl border text-center relative overflow-hidden transition-all ${
            isDark
              ? "bg-[#0A0D0F] border-[rgba(245,247,246,0.1)] shadow-2xl"
              : "bg-white border-[rgba(10,13,12,0.1)] shadow-md"
          }`}
        >
          <h2 className="type-cta mb-4">{t("finalCTA.title")}</h2>

          <p
            className={`type-body max-w-2xl mx-auto mb-10 ${
              isDark ? "text-[#8E9995]" : "text-[#4E5653]"
            }`}
          >
            {t("finalCTA.description")}
          </p>
        </div>
      </div>
    </footer>
  );
};

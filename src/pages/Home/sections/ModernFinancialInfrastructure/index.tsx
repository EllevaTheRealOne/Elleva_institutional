import React from "react";
import { useTranslation } from "react-i18next";
import { ModernFinancialInfrastructureFlow } from "./components/Flow";

interface ModernFinancialInfrastructureProps {
  isDark?: boolean;
}

export const ModernFinancialInfrastructure: React.FC<
  ModernFinancialInfrastructureProps
> = ({ isDark = false }) => {
  const { t } = useTranslation(["home", "common"]);

  return (
    <section
      id="financial-infrastructure"
      className={`py-20 sm:py-28 border-t border-black/[0.04] dark:border-white/5 transition-colors duration-300 ${
        isDark ? "bg-[#050607] text-[#F5F7F6]" : "bg-[#F7F8F6] text-[#0A0D0C]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="type-section-title mb-4">
            {t("infrastructure.title")}
          </h2>
          <p
            className={`type-body ${isDark ? "text-[#8E9995]" : "text-[#4E5653]"}`}
          >
            {t("infrastructure.description")}
          </p>
        </div>

        {/* React Flow Layered Stack */}
        <div className="mb-10" id="institutional-connectivity">
          <ModernFinancialInfrastructureFlow isDark={isDark} />
        </div>

        {/* 3 Tier Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            id="infrastructure-portfolios"
            className={`p-6 rounded-xl border ${
              isDark
                ? "bg-[#0A0D0F] border-[rgba(245,247,246,0.08)]"
                : "bg-white border-[rgba(10,13,12,0.08)] shadow-xs"
            }`}
          >
            <div className="text-[10px] font-mono font-bold text-[#189890] uppercase mb-1">
              {t("infrastructure.tier1BadgeLabel")}
            </div>
            <h4 className="font-display font-bold text-base mb-2">
              {t("infrastructure.tier1Heading")}
            </h4>
            <p
              className={`font-body text-xs leading-relaxed ${isDark ? "text-[#8E9995]" : "text-[#4E5653]"}`}
            >
              {t("infrastructure.tier1Summary")}
            </p>
          </div>

          <div
            id="infrastructure-compliance"
            className={`p-6 rounded-xl border ${
              isDark
                ? "bg-[#0A0D0F] border-[#189890]/40"
                : "bg-white border-[#189890] shadow-xs"
            }`}
          >
            <div className="text-[10px] font-mono font-bold text-[#189890] uppercase mb-1">
              {t("infrastructure.tier2BadgeLabel")}
            </div>
            <h4 className="font-display font-bold text-base mb-2 text-[#189890]">
              {t("infrastructure.tier2Heading")}
            </h4>
            <p
              className={`font-body text-xs leading-relaxed ${isDark ? "text-[#8E9995]" : "text-[#4E5653]"}`}
            >
              {t("infrastructure.tier2Summary")}
            </p>
          </div>

          <div
            id="infrastructure-custody"
            className={`p-6 rounded-xl border ${
              isDark
                ? "bg-[#0A0D0F] border-[rgba(245,247,246,0.08)]"
                : "bg-white border-[rgba(10,13,12,0.08)] shadow-xs"
            }`}
          >
            <div className="text-[10px] font-mono font-bold text-[#189890] uppercase mb-1">
              {t("infrastructure.tier3BadgeLabel")}
            </div>
            <h4 className="font-display font-bold text-base mb-2">
              {t("infrastructure.tier3Heading")}
            </h4>
            <p
              className={`font-body text-xs leading-relaxed ${isDark ? "text-[#8E9995]" : "text-[#4E5653]"}`}
            >
              {t("infrastructure.tier3Summary")}
            </p>
            <div className="flex flex-wrap gap-2 mt-3 text-[10px] font-mono text-[#8E9995]">
              <span id="infrastructure-banks">
                {t("infrastructure.tags.banks")}
              </span>{" "}
              •{" "}
              <span id="infrastructure-brokers">
                {t("infrastructure.tags.brokers")}
              </span>{" "}
              •{" "}
              <span id="infrastructure-settlement">
                {t("infrastructure.tags.settlement")}
              </span>{" "}
              •{" "}
              <span id="infrastructure-liquidity">
                {t("infrastructure.tags.liquidity")}
              </span>{" "}
              •{" "}
              <span id="infrastructure-market-data">
                {t("infrastructure.tags.marketData")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

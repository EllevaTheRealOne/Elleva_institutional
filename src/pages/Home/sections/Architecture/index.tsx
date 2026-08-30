import React from "react";
import {
  Shield,
  Landmark,
  Zap,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { ArchitectureFlow } from "./components/Flow";

interface ArchitectureProps {
  isDark?: boolean;
}

export const Architecture: React.FC<ArchitectureProps> = ({
  isDark = false,
}) => {
  const { t } = useTranslation(["home", "common"]);

  const modulesDetailed = [
    {
      id: "architecture-market-data",
      title: t("architecture.modules.marketData.title"),
      items: [
        t("architecture.modules.marketData.item1"),
        t("architecture.modules.marketData.item2"),
        t("architecture.modules.marketData.item3"),
        t("architecture.modules.marketData.item4"),
      ],
    },
    {
      id: "architecture-portfolios",
      title: t("architecture.modules.portfolios.title"),
      items: [
        t("architecture.modules.portfolios.item1"),
        t("architecture.modules.portfolios.item2"),
        t("architecture.modules.portfolios.item3"),
        t("architecture.modules.portfolios.item4"),
      ],
    },
    {
      id: "architecture-banks",
      title: t("architecture.modules.banks.title"),
      items: [
        t("architecture.modules.banks.item1"),
        t("architecture.modules.banks.item2"),
        t("architecture.modules.banks.item3"),
        t("architecture.modules.banks.item4"),
      ],
    },
    {
      id: "architecture-custody",
      title: t("architecture.modules.custody.title"),
      items: [
        t("architecture.modules.custody.item1"),
        t("architecture.modules.custody.item2"),
        t("architecture.modules.custody.item3"),
        t("architecture.modules.custody.item4"),
      ],
    },
    {
      id: "architecture-brokers",
      title: t("architecture.modules.brokers.title"),
      items: [
        t("architecture.modules.brokers.item1"),
        t("architecture.modules.brokers.item2"),
        t("architecture.modules.brokers.item3"),
        t("architecture.modules.brokers.item4"),
      ],
    },
    {
      id: "architecture-compliance",
      title: t("architecture.modules.compliance.title"),
      items: [
        t("architecture.modules.compliance.item1"),
        t("architecture.modules.compliance.item2"),
        t("architecture.modules.compliance.item3"),
        t("architecture.modules.compliance.item4"),
      ],
    },
    {
      id: "architecture-reporting",
      title: t("architecture.modules.reporting.title"),
      items: [
        t("architecture.modules.reporting.item1"),
        t("architecture.modules.reporting.item2"),
        t("architecture.modules.reporting.item3"),
        t("architecture.modules.reporting.item4"),
      ],
    },
    {
      id: "architecture-wealth",
      title: t("architecture.modules.wealth.title"),
      items: [
        t("architecture.modules.wealth.item1"),
        t("architecture.modules.wealth.item2"),
        t("architecture.modules.wealth.item3"),
        t("architecture.modules.wealth.item4"),
      ],
    },
  ];

  return (
    <section
      id="architecture"
      className={`py-20 sm:py-28 border-t border-black/[0.04] dark:border-white/5 transition-colors duration-300 ${
        isDark ? "bg-[#050607] text-[#F5F7F6]" : "bg-[#F7F8F6] text-[#0A0D0C]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="type-section-title mb-4">
            {t("architecture.title")}
          </h2>
          <p className={`type-body ${isDark ? "text-[#8E9995]" : "text-[#4E5653]"}`}>
            {t("architecture.description")}
          </p>
        </div>

        {/* React Flow Main Diagram */}
        <div className="mb-14">
          <ArchitectureFlow isDark={isDark} />
        </div>

        {/* Detailed Module Taxonomy Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {modulesDetailed.map((mod) => (
            <div
              key={mod.title}
              id={mod.id}
              className={`p-5 rounded-xl border ${
                isDark ? "bg-[#0A0D0F] border-[rgba(245,247,246,0.08)]" : "bg-white border-[rgba(10,13,12,0.08)] shadow-xs"
              }`}
            >
              <h4 className="font-display font-bold text-sm text-[#189890] mb-3">
                {mod.title}
              </h4>
              <ul className="space-y-2">
                {mod.items.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs">
                    <span className="w-1 h-1 rounded-full bg-[#189890] shrink-0" />
                    <span className={isDark ? "text-[#8E9995]" : "text-[#4E5653]"}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer Concepts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div
            className={`p-5 rounded-xl border text-center ${
              isDark ? "bg-[#0E1214] border-white/5" : "bg-[#F1F3F1] border-black/[0.06]"
            }`}
          >
            <Shield className="w-5 h-5 text-[#189890] mx-auto mb-2" />
            <div className="font-display font-bold text-sm mb-1">{t("architecture.pillars.custodyTitle")}</div>
            <div className={`text-xs ${isDark ? "text-[#8E9995]" : "text-[#4E5653]"}`}>
              {t("architecture.pillars.custodyDesc")}
            </div>
          </div>

          <div
            className={`p-5 rounded-xl border text-center ${
              isDark ? "bg-[#0E1214] border-white/5" : "bg-[#F1F3F1] border-black/[0.06]"
            }`}
          >
            <Landmark className="w-5 h-5 text-[#189890] mx-auto mb-2" />
            <div className="font-display font-bold text-sm mb-1">{t("architecture.pillars.institutionsTitle")}</div>
            <div className={`text-xs ${isDark ? "text-[#8E9995]" : "text-[#4E5653]"}`}>
              {t("architecture.pillars.institutionsDesc")}
            </div>
          </div>

          <div
            className={`p-5 rounded-xl border text-center ${
              isDark ? "bg-[#0E1214] border-white/5" : "bg-[#F1F3F1] border-black/[0.06]"
            }`}
          >
            <Zap className="w-5 h-5 text-[#189890] mx-auto mb-2" />
            <div className="font-display font-bold text-sm mb-1">{t("architecture.pillars.capacityTitle")}</div>
            <div className={`text-xs ${isDark ? "text-[#8E9995]" : "text-[#4E5653]"}`}>
              {t("architecture.pillars.capacityDesc")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

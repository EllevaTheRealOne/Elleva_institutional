import React from "react";
import { useTranslation } from "react-i18next";
import { NewCategoryFlow } from "./components/Flow";

interface NewCategoryProps {
  isDark?: boolean;
}

export const NewCategory: React.FC<NewCategoryProps> = ({ isDark = false }) => {
  const { t } = useTranslation(["home", "common"]);

  const peripheralModules = [
    {
      label: t("newCategory.modules.data"),
      desc: t("newCategory.modules.dataDesc"),
    },
    {
      label: t("newCategory.modules.banks"),
      desc: t("newCategory.modules.banksDesc"),
    },
    {
      label: t("newCategory.modules.brokers"),
      desc: t("newCategory.modules.brokersDesc"),
    },
    {
      label: t("newCategory.modules.custody"),
      desc: t("newCategory.modules.custodyDesc"),
    },
    {
      label: t("newCategory.modules.compliance"),
      desc: t("newCategory.modules.complianceDesc"),
    },
    {
      label: t("newCategory.modules.portfolios"),
      desc: t("newCategory.modules.portfoliosDesc"),
    },
  ];

  return (
    <section
      id="new-category"
      className={`py-20 sm:py-28 border-t border-black/[0.04] dark:border-white/5 transition-colors duration-300 ${
        isDark ? "bg-[#050607] text-[#F5F7F6]" : "bg-[#F7F8F6] text-[#0A0D0C]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="type-section-title mb-4">{t("newCategory.title")}</h2>
          <p
            className={`type-body ${isDark ? "text-[#8E9995]" : "text-[#4E5653]"}`}
          >
            {t("newCategory.description")}
          </p>
        </div>

        {/* React Flow Conceptual Map */}
        <div className="mb-10">
          <NewCategoryFlow isDark={isDark} />
        </div>

        {/* Peripheral Modules Explanation */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {peripheralModules.map((item) => (
            <div
              key={item.label}
              className={`p-3.5 rounded-lg border text-center ${
                isDark
                  ? "bg-[#0A0D0F] border-[rgba(245,247,246,0.06)]"
                  : "bg-white border-[rgba(10,13,12,0.06)] shadow-xs"
              }`}
            >
              <div className="text-[11px] font-ui font-bold text-[#189890]">
                {item.label}
              </div>
              <div
                className={`text-[10px] mt-0.5 ${isDark ? "text-[#8E9995]" : "text-[#4E5653]"}`}
              >
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

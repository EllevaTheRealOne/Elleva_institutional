import React from "react";
import { useTranslation } from "react-i18next";
import { EllevaLoopFlow } from "./components/Flow";

interface EllevaLoopProps {
  isDark?: boolean;
}

export const EllevaLoop: React.FC<EllevaLoopProps> = ({ isDark = false }) => {
  const { t } = useTranslation(["home", "common"]);

  const loopSteps = [
    t("ellevaLoop.steps.s1"),
    t("ellevaLoop.steps.s2"),
    t("ellevaLoop.steps.s3"),
    t("ellevaLoop.steps.s4"),
    t("ellevaLoop.steps.s5"),
    t("ellevaLoop.steps.s6"),
    t("ellevaLoop.steps.s1"),
  ];

  return (
    <section
      id="elleva-loop"
      className={`py-20 sm:py-28 border-t border-black/[0.04] dark:border-white/5 transition-colors duration-300 ${
        isDark ? "bg-[#050607] text-[#F5F7F6]" : "bg-[#F7F8F6] text-[#0A0D0C]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="type-section-title mb-4">{t("ellevaLoop.title")}</h2>
          <p
            className={`type-body ${isDark ? "text-[#8E9995]" : "text-[#4E5653]"}`}
          >
            {t("ellevaLoop.description")}
          </p>
        </div>

        {/* React Flow Loop Topology */}
        <div className="mb-12">
          <EllevaLoopFlow isDark={isDark} />
        </div>

        {/* Loop Progression Steps */}
        <div
          className={`p-6 sm:p-8 rounded-xl border ${
            isDark
              ? "bg-[#0A0D0F] border-[rgba(245,247,246,0.08)]"
              : "bg-white border-[rgba(10,13,12,0.08)] shadow-xs"
          }`}
        >
          <div className="text-[10px] font-ui uppercase tracking-widest text-[#8E9995] font-semibold mb-4 text-center">
            {t("ellevaLoop.flywheelTitle")}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-ui font-semibold">
            {loopSteps.map((step, idx) => (
              <React.Fragment key={idx}>
                <span
                  className={`px-3 py-1.5 rounded-sm border ${
                    idx === loopSteps.length - 1
                      ? "bg-[#189890]/15 border-[#189890] text-[#189890]"
                      : isDark
                        ? "bg-[#0E1214] border-white/5 text-[#F5F7F6]"
                        : "bg-[#F7F8F6] border-black/[0.06] text-[#0A0D0C]"
                  }`}
                >
                  {step}
                </span>
                {idx < loopSteps.length - 1 && (
                  <span className="text-[#189890] font-mono opacity-40">→</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

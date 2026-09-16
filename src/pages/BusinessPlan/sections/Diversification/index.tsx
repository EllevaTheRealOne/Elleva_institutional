import React from "react";
import { useTranslation } from "react-i18next";
import { Slide, SlideHeader } from "../../components/Slide";
import { Reveal } from "../../components/Reveal";

/** Slide 14 — portfolio diversification and the 50% concentration rule. */
export const Diversification: React.FC = () => {
  const { t } = useTranslation("business-plan");

  return (
    <Slide id="diversification" tone="teal">
      <Reveal>
        <SlideHeader eyebrow={t("diversification.eyebrow")} title={t("diversification.title")}>
          <p className="bp-body mt-2 max-w-2xl">{t("diversification.text")}</p>
        </SlideHeader>
      </Reveal>

      <Reveal className="mt-10" delay={0.1}>
        <div className="bp-card-dark p-7 sm:p-10">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span className="bp-num text-2xl sm:text-3xl">{t("diversification.rule.value")}</span>
            <h3 className="bp-h2 bp-accent">{t("diversification.rule.title")}</h3>
          </div>

          <p className="bp-body mt-5">{t("diversification.rule.text")}</p>

          {/* The split, drawn */}
          <div className="mt-7">
            <div className="flex h-3 overflow-hidden rounded-full bg-white/10">
              <span className="w-1/2 bg-[var(--bp-cyan)]" />
              <span className="w-1/2 bg-white/25" />
            </div>
            <div className="mt-2 flex flex-wrap justify-between gap-2">
              <span className="bp-small !text-[0.75rem] !text-[var(--bp-cyan)]">
                {t("diversification.rule.barSegment")}
              </span>
              <span className="bp-small !text-[0.75rem] !text-[var(--bp-dark-muted)]">
                {t("diversification.rule.barOthers")}
              </span>
            </div>
          </div>

          <div className="mt-8">
            <div className="font-[Montserrat] text-lg font-extrabold text-[var(--bp-cyan)]">
              {t("diversification.rule.exampleLabel")}
            </div>
            <p className="bp-body font-semibold">{t("diversification.rule.exampleLine1")}</p>
            <p className="bp-body font-semibold">{t("diversification.rule.exampleLine2")}</p>
            <p className="bp-body mt-5 font-extrabold">{t("diversification.rule.exampleClosing")}</p>
          </div>
        </div>
      </Reveal>
    </Slide>
  );
};

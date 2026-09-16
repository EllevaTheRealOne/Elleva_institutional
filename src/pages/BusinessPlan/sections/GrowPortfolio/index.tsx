import React from "react";
import { useTranslation } from "react-i18next";
import { Slide } from "../../components/Slide";
import { Reveal } from "../../components/Reveal";

/** Slide 13 — the statement that opens the portfolio-building levels. */
export const GrowPortfolio: React.FC = () => {
  const { t } = useTranslation("business-plan");

  return (
    <Slide id="grow" tone="light">
      <Reveal className="max-w-5xl">
        <div className="bp-eyebrow">{t("grow.eyebrow")}</div>
        <h2 className="bp-h1 bp-h1-xl mt-3">
          {t("grow.title")}
          <br />
          <span className="bp-accent">{t("grow.title2")}</span>
        </h2>
        <p className="bp-body mt-8 max-w-4xl !text-lg !text-[var(--bp-ink)] sm:!text-xl">
          {t("grow.textBefore")}
          <strong className="bp-accent font-extrabold uppercase">{t("grow.textAccent")}</strong>
          {t("grow.textAfter")}
        </p>
      </Reveal>
    </Slide>
  );
};

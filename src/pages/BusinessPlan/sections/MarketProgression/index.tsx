import React from "react";
import { useTranslation } from "react-i18next";
import { Layers } from "lucide-react";
import { Slide, SlideHeader } from "../../components/Slide";
import { Reveal } from "../../components/Reveal";
import { Accent } from "../../components/Accent";
import { MarketProgressionChart } from "./MarketProgressionChart";

/** Slide 4 — a market in constant evolution, with global AUM 2024 → 2030. */
export const MarketProgression: React.FC = () => {
  const { t } = useTranslation("business-plan");

  return (
    <Slide id="market" tone="dark">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
        <Reveal className="lg:col-span-7">
          <SlideHeader
            eyebrow={t("market.eyebrow")}
            title={
              <Accent
                text={t("market.title")}
                accent={t("market.titleAccent")}
                className="bp-accent block"
              />
            }
          >
            <span className="mt-2 block h-[3px] w-20 rounded-full bg-[var(--bp-cyan)]" aria-hidden="true" />
            <div className="mt-2">
              <p className="bp-lead uppercase">{t("market.lead")}</p>
              <p className="bp-lead bp-accent mt-1 uppercase !text-[clamp(0.9rem,0.3vw+0.8rem,1.1rem)]">
                {t("market.subLead")}
              </p>
            </div>
            <p className="bp-body max-w-xl">{t("market.text")}</p>

            <div className="bp-callout mt-4 flex max-w-xl items-center gap-4 px-5 py-4 sm:gap-5 sm:px-6">
              <Layers className="size-9 flex-none text-[var(--bp-cyan)] sm:size-10" aria-hidden="true" />
              <span className="h-10 w-px flex-none bg-[rgba(26,230,214,0.45)]" aria-hidden="true" />
              <p className="bp-body !font-bold">
                <Accent text={t("market.callout")} accent={t("market.calloutAccent")} />
              </p>
            </div>
          </SlideHeader>
        </Reveal>

        <Reveal className="h-full lg:col-span-5" delay={0.1}>
          <MarketProgressionChart />
        </Reveal>
      </div>
    </Slide>
  );
};

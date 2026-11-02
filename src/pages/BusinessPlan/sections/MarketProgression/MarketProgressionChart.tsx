import React from "react";
import { useTranslation } from "react-i18next";
import { Accent } from "../../components/Accent";

type AumPoint = { year: string; value: number; projected?: boolean };

/**
 * Global assets under management, in US$ trillion, as the deck quotes them
 * from PwC's Global Asset & Wealth Management Report 2025: the 2024 figure
 * and the projection for 2030. The source line is drawn with the chart.
 */
const AUM: AumPoint[] = [
  { year: "2024", value: 139 },
  { year: "2030", value: 200, projected: true },
];

const PEAK = Math.max(...AUM.map((point) => point.value));

// Grid placement per column, so each year's value and label stay together in
// the DOM (and are read together) while the plot and the labels sit on their
// own rows around the baseline.
const PLACE = [
  { plot: "col-start-1 row-start-1", label: "col-start-1 row-start-3" },
  { plot: "col-start-3 row-start-1", label: "col-start-3 row-start-3" },
];

/**
 * The two AUM columns, from one baseline, heights in proportion to the values,
 * every value written on its cap and the rising arrow between them, as on the
 * slide. Plain markup: two values need no charting library.
 */
export const MarketProgressionChart: React.FC = () => {
  const { t } = useTranslation("business-plan");

  return (
    <figure className="bp-card-glass bp-aum flex h-full flex-col px-5 py-7 sm:px-8 sm:py-9">
      <h3 className="bp-aum-title text-center">{t("market.chart.title")}</h3>
      <span className="mx-auto mt-3 block h-[3px] w-16 rounded-full bg-[var(--bp-cyan)]" aria-hidden="true" />

      <div className="mt-8 grid grid-cols-[1fr_auto_1fr] items-end sm:mt-10">
        {AUM.map((point, i) => (
          <React.Fragment key={point.year}>
            <div className={`${PLACE[i].plot} flex flex-col items-center justify-end`}>
              <span
                className={`bp-aum-value whitespace-nowrap ${
                  point.projected ? "text-[var(--bp-cyan)]" : "text-[var(--bp-white)]"
                }`}
              >
                {t("market.chart.value", { value: point.value })}
              </span>
              <span className="bp-aum-unit">{t("market.chart.unit")}</span>
              <span
                className="bp-aum-bar mt-3"
                style={{ height: `calc(var(--bp-aum-plot) * ${point.value / PEAK})` }}
                aria-hidden="true"
              />
            </div>

            <div className={`${PLACE[i].label} flex flex-col items-center self-start pt-3 text-center`}>
              <span className="bp-aum-year">{point.year}</span>
              {point.projected && <span className="bp-aum-note">{t("market.chart.projection")}</span>}
            </div>
          </React.Fragment>
        ))}

        <svg
          viewBox="0 0 64 64"
          className="col-start-2 row-start-1 mb-[calc(var(--bp-aum-plot)*0.62)] h-[calc(var(--bp-aum-plot)*0.42)] w-9 sm:w-14"
          fill="none"
          stroke="var(--bp-cyan)"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          <path d="M6 58 C 30 54, 46 36, 56 8" />
          <polyline points="46.6,13.8 56,8 58.2,18.8" />
        </svg>

        <span className="col-span-3 col-start-1 row-start-2 block h-px bg-[rgba(26,230,214,0.45)]" aria-hidden="true" />
      </div>

      <figcaption className="bp-small mt-auto pt-8 text-center italic !text-[var(--bp-dark-muted)]">
        <Accent
          text={t("market.chart.source")}
          accent={t("market.chart.sourceLabel")}
          className="font-bold text-[var(--bp-dark-text)]"
        />
      </figcaption>
    </figure>
  );
};

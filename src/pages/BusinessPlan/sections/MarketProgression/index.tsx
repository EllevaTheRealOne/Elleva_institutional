import React from "react";
import { useTranslation } from "react-i18next";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from "recharts";
import { Slide, SlideHeader } from "../../components/Slide";
import { Reveal } from "../../components/Reveal";
import { Accent } from "../../components/Accent";

// The curve as drawn on the slide: US$ 100 T in 2020 rising to the
// US$ 200 T projected for 2030.
const AUM_DATA = [
  { year: "2020", aum: 100 },
  { year: "2022", aum: 118 },
  { year: "2024", aum: 138 },
  { year: "2026", aum: 162 },
  { year: "2028", aum: 182 },
  { year: "2030", aum: 200 },
];

const CYAN = "#1ae6d6";
const MUTED = "#9fb0ae";

const EndDot: React.FC<{ cx?: number; cy?: number; index?: number }> = ({
  cx = 0,
  cy = 0,
  index = 0,
}) => {
  const last = index === AUM_DATA.length - 1;
  return last ? (
    <g>
      <circle cx={cx} cy={cy} r={9} fill="#050505" stroke={CYAN} strokeWidth={3} />
      <circle cx={cx} cy={cy} r={16} fill="none" stroke={CYAN} strokeOpacity={0.25} />
    </g>
  ) : (
    <circle cx={cx} cy={cy} r={4} fill={CYAN} />
  );
};

/** Slide 4 — market progression, with the AUM curve. */
export const MarketProgression: React.FC = () => {
  const { t } = useTranslation("business-plan");

  return (
    <Slide id="market" tone="dark">
      <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <SlideHeader
            eyebrow={t("market.eyebrow")}
            title={<Accent text={t("market.title")} accent={t("market.titleAccent")} />}
          >
            <p className="bp-lead mt-2">{t("market.lead")}</p>
            <p className="bp-body">{t("market.text")}</p>
          </SlideHeader>
        </Reveal>

        <Reveal className="lg:col-span-7" delay={0.1}>
          <div className="relative rounded-2xl border border-white/8 bg-black/30 p-5 sm:p-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h3 className="font-[Montserrat] text-lg font-bold text-[var(--bp-cyan)] sm:text-xl">
                  {t("market.chart.title")}
                </h3>
                <p className="bp-small !text-[var(--bp-dark-muted)]">{t("market.chart.subtitle")}</p>
              </div>
              <div className="text-right">
                <div className="bp-num text-2xl text-[var(--bp-cyan)] sm:text-3xl">
                  {t("market.chart.calloutValue")}
                </div>
                <div className="bp-small !text-[var(--bp-dark-muted)]">
                  {t("market.chart.calloutLabel")}
                </div>
              </div>
            </div>

            <div className="mt-6 h-72 w-full sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={AUM_DATA} margin={{ top: 20, right: 24, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke="rgba(255,255,255,0.08)" strokeDasharray="3 4" vertical={false} />
                  <XAxis
                    dataKey="year"
                    tick={{ fill: MUTED, fontSize: 12, fontFamily: "Montserrat" }}
                    axisLine={{ stroke: "rgba(255,255,255,0.15)" }}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[0, 250]}
                    ticks={[0, 50, 100, 150, 200, 250]}
                    tick={{ fill: MUTED, fontSize: 12, fontFamily: "Montserrat" }}
                    axisLine={{ stroke: "rgba(255,255,255,0.15)" }}
                    tickLine={false}
                    width={40}
                  />
                  <Tooltip
                    cursor={{ stroke: "rgba(26,230,214,0.3)" }}
                    formatter={(value) => [
                      `US$ ${value} ${t("market.chart.unit")}`,
                      t("market.chart.series"),
                    ]}
                    contentStyle={{
                      backgroundColor: "#0b0b0b",
                      border: "1px solid rgba(26,230,214,0.35)",
                      borderRadius: 8,
                      fontFamily: "Montserrat",
                      fontSize: 12,
                      color: "#f4f6f6",
                    }}
                  />
                  <ReferenceLine x="2030" stroke={CYAN} strokeDasharray="4 4" strokeOpacity={0.5} />
                  <Line
                    type="linear"
                    dataKey="aum"
                    stroke={CYAN}
                    strokeWidth={2.5}
                    dot={<EndDot />}
                    activeDot={{ r: 6, fill: CYAN }}
                    isAnimationActive
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Reveal>
      </div>
    </Slide>
  );
};

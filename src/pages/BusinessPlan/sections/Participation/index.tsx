import React from "react";
import { useTranslation } from "react-i18next";
import {
  CalendarDays,
  ChevronsRight,
  Coins,
  HandCoins,
  Infinity as InfinityIcon,
  createLucideIcon,
  type LucideIcon,
} from "lucide-react";
import { Slide, SlideHeader } from "../../components/Slide";
import { Reveal } from "../../components/Reveal";
import { Accent } from "../../components/Accent";

type Step = { index: string; title: string; text: string };
type Condition = { title: string; text: string };

/**
 * The slide's second step shows a laptop with a rising column chart; Lucide
 * has the laptop but not the chart on it, so the two are drawn together on
 * Lucide's own 24-unit grid and stroke.
 */
const LaptopChart = createLucideIcon("laptop-chart", [
  ["rect", { width: "18", height: "12", x: "3", y: "4", rx: "2", ry: "2", key: "screen" }],
  ["line", { x1: "2", x2: "22", y1: "20", y2: "20", key: "base" }],
  ["path", { d: "M8 13v-2", key: "bar-1" }],
  ["path", { d: "M12 13v-4", key: "bar-2" }],
  ["path", { d: "M16 13v-6", key: "bar-3" }],
]);

const STEP_ICONS: LucideIcon[] = [Coins, LaptopChart, HandCoins];
const CONDITION_ICONS: LucideIcon[] = [CalendarDays, InfinityIcon];

/**
 * How you take part — inserted after the brokers slide in v1.1 of the deck:
 * the Revenue-Based Financing contract, its three steps and its 4.0x
 * economic objective, with no fixed monthly return and no set term.
 */
export const Participation: React.FC = () => {
  const { t } = useTranslation("business-plan");
  const steps = t("participation.steps", { returnObjects: true }) as Step[];
  const conditions = t("participation.conditions", { returnObjects: true }) as Condition[];

  return (
    <Slide id="participation" tone="dark">
      <Reveal>
        <SlideHeader
          eyebrow={t("participation.eyebrow")}
          title={
            <Accent
              text={t("participation.title")}
              accent={t("participation.titleAccent")}
              className="bp-accent block"
            />
          }
          className="max-w-5xl [&_h2]:text-balance"
        >
          <p className="bp-lead mt-1 !font-medium">
            <Accent
              text={t("participation.subline")}
              accent={t("participation.term")}
              className="bp-term"
            />
          </p>
        </SlideHeader>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 items-stretch gap-3 lg:mt-14 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
        {Array.isArray(steps) &&
          steps.map((step, i) => {
            const Icon = STEP_ICONS[i] ?? Coins;
            return (
              <React.Fragment key={step.index}>
                {i > 0 && (
                  <span className="flex items-center justify-center text-[var(--bp-cyan)]" aria-hidden="true">
                    <ChevronsRight className="size-7 rotate-90 lg:rotate-0" />
                  </span>
                )}
                <Reveal delay={i * 0.08} className="h-full">
                  <div className="bp-card-glass flex h-full items-center gap-4 p-5 sm:gap-5 sm:p-6">
                    <Icon className="size-11 flex-none text-[var(--bp-cyan)] sm:size-12" strokeWidth={1.75} aria-hidden="true" />
                    <span className="w-px self-stretch bg-[rgba(26,230,214,0.45)]" aria-hidden="true" />
                    <div className="flex min-w-0 flex-col gap-1.5">
                      <span className="bp-num text-lg italic text-[var(--bp-white)]">{step.index}</span>
                      <h3 className="bp-step-title bp-accent">{step.title}</h3>
                      <p className="bp-small">{step.text}</p>
                    </div>
                  </div>
                </Reveal>
              </React.Fragment>
            );
          })}
      </div>

      <div className="mt-12 grid grid-cols-1 items-center gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-0">
        <Reveal className="lg:col-span-5 lg:pr-12" delay={0.1}>
          <div className="bp-objective mx-auto flex max-w-md flex-col items-center gap-1 px-6 py-5 text-center">
            <span className="bp-objective-label">{t("participation.objective.label")}</span>
            <span className="bp-objective-value">{t("participation.objective.value")}</span>
            <span className="bp-objective-label">{t("participation.objective.caption")}</span>
          </div>
        </Reveal>

        <Reveal
          className="flex flex-col gap-7 lg:col-span-7 lg:border-l lg:border-[rgba(26,230,214,0.45)] lg:py-2 lg:pl-12"
          delay={0.16}
        >
          {Array.isArray(conditions) &&
            conditions.map((condition, i) => {
              const Icon = CONDITION_ICONS[i] ?? CalendarDays;
              return (
                <div key={condition.title} className="flex items-start gap-5">
                  <Icon className="size-10 flex-none text-[var(--bp-cyan)] sm:size-11" strokeWidth={2} aria-hidden="true" />
                  <div>
                    <h3 className="bp-body !font-bold !text-[var(--bp-white)]">{condition.title}</h3>
                    <p className="bp-body">{condition.text}</p>
                  </div>
                </div>
              );
            })}
        </Reveal>
      </div>
    </Slide>
  );
};

import React from "react";
import { useTranslation } from "react-i18next";
import { User, TrendingUp, Star, Target, Crown } from "lucide-react";
import { Slide } from "../../components/Slide";
import { Reveal } from "../../components/Reveal";

type Level = { code: string; title: string; text: string };

const ICONS = [
  <User className="size-6" />,
  <TrendingUp className="size-6" />,
  <Star className="size-6" />,
  <Target className="size-6" />,
  <Crown className="size-6" />,
];

// Each panel stands a little higher than the one before it, the way the
// slide draws the framework as a rising staircase. The rise is in 2rem
// steps; the line below is drawn through the icon centres it produces.
const RISE = ["lg:mt-32", "lg:mt-24", "lg:mt-16", "lg:mt-8", "lg:mt-0"];
const RISE_PX = [128, 96, 64, 32, 0];
const ICON_HALF = 28; // the icon disc is 3.5rem
const PANEL_PX = 272; // lg:h-68
const STAIR_PX = RISE_PX[0] + PANEL_PX;
const LINE_POINTS = RISE_PX.map((rise, i) => `${(i + 0.5) * 100},${rise + ICON_HALF}`).join(" ");

/** Slide 12 — the partner development framework, E1 to E5. */
export const Framework: React.FC = () => {
  const { t } = useTranslation("business-plan");
  const levels = t("framework.levels", { returnObjects: true }) as Level[];

  return (
    <Slide id="framework" tone="dark">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <div className="bp-eyebrow">{t("framework.eyebrow")}</div>
          <h2 className="bp-h1 bp-h1-xl bp-accent mt-2">{t("framework.title")}</h2>
          <p className="bp-lead mt-6 max-w-md">{t("framework.lead")}</p>
          <p className="bp-body mt-3 max-w-md !text-[var(--bp-dark-muted)]">{t("framework.text")}</p>
        </Reveal>

        <Reveal className="lg:col-span-7 lg:col-start-6" delay={0.1}>
          <div
            className="relative grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5 lg:items-start lg:gap-3"
            style={{ ["--stair" as string]: `${STAIR_PX}px` }}
          >
            {/* The rising line joining the icons */}
            <svg
              className="pointer-events-none absolute inset-x-0 top-0 hidden w-full lg:block lg:h-[var(--stair)]"
              viewBox={`0 0 500 ${STAIR_PX}`}
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polyline
                points={LINE_POINTS}
                fill="none"
                stroke="#1ae6d6"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>

            {Array.isArray(levels) &&
              levels.map((level, i) => (
                <div key={level.code} className={`relative flex flex-col lg:h-68 ${RISE[i]}`}>
                  <span className="bp-disc bp-disc-outline relative z-10 mb-[-1.75rem] self-center !size-14">
                    {ICONS[i]}
                  </span>
                  <div className="bp-card-glass flex flex-1 flex-col gap-2 px-4 pb-5 pt-10">
                    <div className="bp-num text-4xl text-[var(--bp-cyan)]">{level.code}</div>
                    <div className="font-[Montserrat] text-sm font-extrabold uppercase leading-tight">
                      {level.title}
                    </div>
                    <p className="bp-small !text-[0.8rem] !text-[var(--bp-dark-muted)]">{level.text}</p>
                  </div>
                </div>
              ))}
          </div>

          <div className="mt-8 flex justify-end">
            <div className="bp-card-glass flex items-center gap-5 px-6 py-5">
              <svg viewBox="0 0 64 64" className="size-16 shrink-0" aria-hidden="true">
                <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(26,230,214,0.2)" strokeWidth="8" />
                <circle
                  cx="32"
                  cy="32"
                  r="26"
                  fill="none"
                  stroke="#1ae6d6"
                  strokeWidth="8"
                  strokeDasharray="163.4"
                  strokeDashoffset="49"
                  strokeLinecap="round"
                  transform="rotate(-90 32 32)"
                />
                <circle cx="32" cy="32" r="8" fill="none" stroke="#1ae6d6" strokeWidth="3" />
              </svg>
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="bp-num text-4xl text-[var(--bp-cyan)]">
                    {t("framework.profitShare.value")}
                  </span>
                  <span className="bp-eyebrow !text-[0.7rem] !tracking-[0.2em]">
                    {t("framework.profitShare.label")}
                  </span>
                </div>
                <p className="bp-small !text-[var(--bp-dark-muted)]">{t("framework.profitShare.text")}</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Slide>
  );
};

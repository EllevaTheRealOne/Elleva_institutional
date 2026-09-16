import React from "react";
import { useTranslation } from "react-i18next";
import { BarChart3 } from "lucide-react";
import { Slide, SlideHeader } from "../../components/Slide";
import { Reveal } from "../../components/Reveal";
import { Accent } from "../../components/Accent";
import portrait01 from "@/assets/business-plan/portrait-01.jpg";
import portrait02 from "@/assets/business-plan/portrait-02.jpg";
import portrait03 from "@/assets/business-plan/portrait-03.jpg";
import portrait04 from "@/assets/business-plan/portrait-04.jpg";
import portrait05 from "@/assets/business-plan/portrait-05.jpg";
import portrait06 from "@/assets/business-plan/portrait-06.jpg";
import portrait07 from "@/assets/business-plan/portrait-07.jpg";
import portrait08 from "@/assets/business-plan/portrait-08.jpg";

type SegmentKey =
  | "banking"
  | "technology"
  | "retail"
  | "industry"
  | "health"
  | "education"
  | "realEstate"
  | "insurance";

// Clockwise from the top, as on the slide. The portraits are the deck's own.
const SEGMENTS: { key: SegmentKey; photo: string }[] = [
  { key: "banking", photo: portrait04 },
  { key: "technology", photo: portrait05 },
  { key: "retail", photo: portrait06 },
  { key: "industry", photo: portrait07 },
  { key: "health", photo: portrait08 },
  { key: "education", photo: portrait01 },
  { key: "realEstate", photo: portrait02 },
  { key: "insurance", photo: portrait03 },
];

const RADIUS = 40; // percent of the ring box

const positionFor = (index: number) => {
  const angle = (index / SEGMENTS.length) * Math.PI * 2 - Math.PI / 2;
  return {
    left: `${50 + RADIUS * Math.cos(angle)}%`,
    top: `${50 + RADIUS * Math.sin(angle)}%`,
  };
};

const ClientCard: React.FC<{ photo: string; label: string; segment: string }> = ({
  photo,
  label,
  segment,
}) => (
  <div className="bp-card-light flex w-[7.25rem] flex-col items-center gap-1.5 px-2 py-3 text-center sm:w-[8.25rem]">
    <img
      src={photo}
      alt=""
      className="size-12 rounded-full object-cover sm:size-14"
      loading="lazy"
    />
    <div className="font-[Montserrat] text-xs font-semibold text-[var(--bp-ink)]">{label}</div>
    <div className="bp-eyebrow !text-[0.5rem] !tracking-[0.2em] !text-[var(--bp-cyan-deep)]">
      {segment}
    </div>
  </div>
);

/**
 * Slide 9 — Elleva Partners. The eight client segments orbit the program
 * on wide screens; below that they fall into a grid around it.
 */
export const Partners: React.FC = () => {
  const { t } = useTranslation("business-plan");

  const core = (
    <div className="bp-card-light flex w-[11rem] flex-col items-center gap-1.5 px-4 py-6 text-center shadow-[0_30px_60px_-30px_rgba(18,207,192,0.7)] sm:w-[13rem]">
      <BarChart3 className="size-6 text-[var(--bp-cyan-dark)]" />
      <div className="font-[Montserrat] text-xl font-bold uppercase tracking-[0.3em] text-[var(--bp-ink)]">
        {t("partners.core.name")}
      </div>
      <div className="bp-eyebrow !text-[0.6rem] !tracking-[0.35em] !text-[var(--bp-cyan-deep)]">
        {t("partners.core.sub")}
      </div>
      <div className="mt-1 h-px w-10 bg-[var(--bp-cyan-deep)]" />
      <div className="bp-eyebrow !text-[0.45rem] !tracking-[0.2em] !text-[var(--bp-ink-soft)]">
        {t("partners.core.program")}
      </div>
    </div>
  );

  return (
    <Slide id="partners" tone="light">
      <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <SlideHeader
            eyebrow={t("partners.eyebrow")}
            title={<Accent text={t("partners.title")} accent={t("partners.titleAccent")} />}
          >
            <p className="bp-body mt-2">{t("partners.text")}</p>

            <div className="mt-6 flex items-center gap-3">
              <span className="h-px w-12 bg-[var(--bp-cyan-deep)]" />
              <span className="bp-small font-semibold !text-[var(--bp-cyan-deep)]">
                {t("partners.born")}
              </span>
            </div>

            <div>
              <div className="font-[Montserrat] text-4xl font-extrabold uppercase tracking-tight sm:text-5xl">
                {t("partners.brand")}{" "}
                <span className="bp-accent">{t("partners.brandAccent")}</span>
              </div>
              <div className="bp-eyebrow mt-1 !tracking-[0.2em] !text-[var(--bp-cyan-deep)]">
                {t("partners.program")}
              </div>
            </div>

            <p className="bp-body">{t("partners.text2")}</p>
          </SlideHeader>
        </Reveal>

        <Reveal className="lg:col-span-7" delay={0.1}>
          {/* Orbit, from md up */}
          <div className="relative mx-auto hidden aspect-square w-full max-w-[640px] md:block">
            <svg className="bp-ring" viewBox="0 0 100 100" aria-hidden="true">
              {[22, 32, 42].map((r) => (
                <circle
                  key={r}
                  cx="50"
                  cy="50"
                  r={r}
                  fill="none"
                  stroke="rgba(18,207,192,0.4)"
                  strokeWidth="0.25"
                  strokeDasharray="0.8 1.2"
                />
              ))}
              {SEGMENTS.map((_, i) => {
                const a = (i / SEGMENTS.length) * Math.PI * 2 - Math.PI / 2;
                const x1 = 50 + 14 * Math.cos(a);
                const y1 = 50 + 14 * Math.sin(a);
                const x2 = 50 + 32 * Math.cos(a);
                const y2 = 50 + 32 * Math.sin(a);
                return (
                  <g key={i} stroke="rgba(18,207,192,0.7)" strokeWidth="0.3">
                    <line x1={x1} y1={y1} x2={x2} y2={y2} />
                    <circle cx={x2} cy={y2} r="0.9" fill="#fff" />
                  </g>
                );
              })}
            </svg>

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">{core}</div>

            {SEGMENTS.map((s, i) => (
              <div
                key={s.key}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={positionFor(i)}
              >
                <ClientCard
                  photo={s.photo}
                  label={t("partners.clientLabel")}
                  segment={t(`partners.segments.${s.key}`)}
                />
              </div>
            ))}
          </div>

          {/* Grid, below md */}
          <div className="flex flex-col items-center gap-6 md:hidden">
            {core}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {SEGMENTS.map((s) => (
                <ClientCard
                  key={s.key}
                  photo={s.photo}
                  label={t("partners.clientLabel")}
                  segment={t(`partners.segments.${s.key}`)}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Slide>
  );
};

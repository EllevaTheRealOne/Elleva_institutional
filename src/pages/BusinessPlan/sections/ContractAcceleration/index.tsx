import React from "react";
import { useTranslation } from "react-i18next";
import { User, Database, TrendingUp, Target } from "lucide-react";
import { Slide } from "../../components/Slide";
import { Reveal } from "../../components/Reveal";

type Step = { number: string; title: string; text: string };

const ICONS = [
  <User className="size-5" />,
  <Database className="size-5" />,
  <TrendingUp className="size-5" />,
  <Target className="size-5" />,
];

const Gauge: React.FC<{ badge: string; value: string; label: string }> = ({
  badge,
  value,
  label,
}) => (
  <div className="relative mx-auto flex size-64 items-center justify-center sm:size-72">
    <svg viewBox="0 0 200 200" className="absolute inset-0 size-full" aria-hidden="true">
      <defs>
        <linearGradient id="bp-gauge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5cf7ea" />
          <stop offset="100%" stopColor="#08c9bb" />
        </linearGradient>
      </defs>
      <circle cx="100" cy="100" r="86" fill="none" stroke="rgba(18,207,192,0.18)" strokeWidth="14" />
      <circle
        cx="100"
        cy="100"
        r="86"
        fill="none"
        stroke="url(#bp-gauge)"
        strokeWidth="14"
        strokeLinecap="round"
        strokeDasharray="540.4"
        strokeDashoffset="95"
        transform="rotate(-90 100 100)"
      />
      {/* Arrow head at the end of the sweep */}
      <polygon points="100,4 112,20 88,20" fill="#08c9bb" transform="rotate(-8 100 100)" />
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
        <line
          key={deg}
          x1="100"
          y1="28"
          x2="100"
          y2="34"
          stroke="rgba(10,10,10,0.35)"
          strokeWidth="2"
          transform={`rotate(${deg} 100 100)`}
        />
      ))}
    </svg>
    <div className="relative flex flex-col items-center text-center">
      <span className="bp-pill mb-2 border border-[rgba(18,207,192,0.5)] bg-white text-[var(--bp-cyan-deep)]">
        {badge}
      </span>
      <span className="bp-num text-5xl text-[var(--bp-cyan-deep)] sm:text-6xl">{value}</span>
      <span className="bp-eyebrow mt-1 !text-[0.55rem] !tracking-[0.3em] !text-[var(--bp-ink)]">
        {label}
      </span>
    </div>
  </div>
);

/** Slide 15 — the Elleva Partners differential: contract acceleration. */
export const ContractAcceleration: React.FC = () => {
  const { t } = useTranslation("business-plan");
  const steps = t("acceleration.steps", { returnObjects: true }) as Step[];

  return (
    <Slide id="contract-acceleration" tone="light">
      <Reveal className="mx-auto max-w-4xl text-center">
        <div className="bp-eyebrow">{t("acceleration.eyebrow")}</div>
        <h2 className="bp-h1 bp-h1-xl mt-2">{t("acceleration.title")}</h2>
        <p className="bp-lead mt-6 !text-[var(--bp-ink)]">{t("acceleration.lead")}</p>
        <p className="bp-body mt-2">{t("acceleration.text")}</p>

        <div className="mt-8 flex flex-col items-center gap-4">
          <span className="bp-small font-semibold !text-[var(--bp-cyan-deep)]">
            {t("acceleration.mechanismLabel")}
          </span>
          <span className="bp-glow-pill">{t("acceleration.mechanism")}</span>
        </div>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-4 lg:gap-4">
          {Array.isArray(steps) &&
            steps.map((step, i) => (
              <Reveal key={step.number} delay={i * 0.07} className="bp-connector text-[var(--bp-cyan-deep)]">
                <div className="bp-card-light flex h-full flex-col gap-4 p-5">
                  <div className="flex items-center gap-3">
                    <span className="bp-disc bp-disc-cyan !size-11">{ICONS[i]}</span>
                    <span className="bp-num text-xl text-[var(--bp-cyan-deep)]">{step.number}</span>
                  </div>
                  <div>
                    <h3 className="font-[Montserrat] text-base font-bold text-[var(--bp-ink)]">
                      {step.title}
                    </h3>
                    <p className="bp-small mt-1 !text-[0.8rem]">{step.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
        </div>

        <Reveal className="lg:col-span-4" delay={0.2}>
          <Gauge
            badge={t("acceleration.gauge.badge")}
            value={t("acceleration.gauge.value")}
            label={t("acceleration.gauge.label")}
          />
        </Reveal>
      </div>

      <Reveal className="mx-auto mt-14 max-w-3xl text-center" delay={0.1}>
        <p className="bp-body !text-lg !text-[var(--bp-ink)]">
          {t("acceleration.closingBefore")}
          <strong className="bp-accent font-bold">{t("acceleration.closingAccent")}</strong>
          {t("acceleration.closingAfter")}
        </p>
      </Reveal>
    </Slide>
  );
};

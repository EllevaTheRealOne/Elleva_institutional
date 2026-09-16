import React from "react";
import { useTranslation } from "react-i18next";
import { UserPlus, Star, Handshake, TrendingUp, ArrowUpRight } from "lucide-react";
import { Slide, SlideHeader } from "../../components/Slide";
import { Reveal } from "../../components/Reveal";
import { Accent } from "../../components/Accent";

type Step = { number: string; title: string; text: string };

const ICONS = [
  <UserPlus className="size-6" />,
  <Star className="size-6" />,
  <Handshake className="size-6" />,
  <TrendingUp className="size-6" />,
  <ArrowUpRight className="size-6" />,
];

/** Slide 10 — from client to partner, in five steps. */
export const Journey: React.FC = () => {
  const { t } = useTranslation("business-plan");
  const steps = t("journey.steps", { returnObjects: true }) as Step[];

  return (
    <Slide id="journey" tone="light">
      <Reveal>
        <SlideHeader
          eyebrow={t("journey.eyebrow")}
          title={<Accent text={t("journey.title")} accent={t("journey.titleAccent")} />}
          align="center"
          className="mx-auto max-w-5xl"
        />
      </Reveal>

      <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
        {Array.isArray(steps) &&
          steps.map((step, i) => (
            <Reveal key={step.number} delay={i * 0.07} className="bp-connector text-[var(--bp-black)]">
              <div className="relative pt-4">
                <span className="absolute left-1/2 top-0 -translate-x-1/2 rounded-full bg-white px-3 py-1 font-[Montserrat] text-[0.65rem] font-bold tracking-[0.2em] shadow-md">
                  {step.number}
                </span>
                <div className="bp-card-light flex h-full flex-col items-center gap-4 px-5 pb-7 pt-9 text-center">
                  <span className="bp-disc bp-disc-black">{ICONS[i]}</span>
                  <h3 className="font-[Montserrat] text-base font-extrabold uppercase tracking-wide text-[var(--bp-ink)]">
                    {step.title}
                  </h3>
                  <p className="bp-small">{step.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
      </div>
    </Slide>
  );
};

import React from "react";
import { useTranslation } from "react-i18next";
import { Shield, CreditCard, BarChart3 } from "lucide-react";
import { Slide } from "../../components/Slide";
import { Reveal } from "../../components/Reveal";
import { Accent } from "../../components/Accent";

type Step = { number: string; title: string; titleAccent: string; text: string };

const ICONS = [
  <Shield className="size-14" strokeWidth={1.5} />,
  <CreditCard className="size-14" strokeWidth={1.5} />,
  <BarChart3 className="size-14" strokeWidth={1.5} />,
];

/** Slide 16 — your next steps. */
export const NextSteps: React.FC = () => {
  const { t } = useTranslation("business-plan");
  const steps = t("nextSteps.steps", { returnObjects: true }) as Step[];

  return (
    <Slide id="next-steps" tone="teal">
      <Reveal className="text-center">
        <div className="bp-eyebrow">{t("nextSteps.eyebrow")}</div>
        <h2 className="bp-h1 bp-h1-xl">{t("nextSteps.title")}</h2>
        <div className="bp-eyebrow mt-2 !tracking-[0.35em]">{t("nextSteps.sub")}</div>
      </Reveal>

      <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
        {Array.isArray(steps) &&
          steps.map((step, i) => (
            <Reveal key={step.number} delay={i * 0.08}>
              <div className="relative pt-4">
                <span className="absolute left-1/2 top-0 -translate-x-1/2 rounded-md bg-[#d9dedd] px-6 py-1 font-[Montserrat] text-sm font-extrabold text-[var(--bp-black)]">
                  {step.number}
                </span>
                <div className="bp-card-dark flex h-full flex-col items-center gap-5 px-6 pb-8 pt-12 text-center">
                  <span className="text-[var(--bp-cyan)]">{ICONS[i]}</span>
                  <h3 className="font-[Montserrat] text-2xl font-extrabold leading-tight">
                    <Accent text={step.title} accent={step.titleAccent} />
                  </h3>
                  <span className="h-px w-full bg-[var(--bp-cyan)]/60" />
                  <p className="bp-body">{step.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
      </div>
    </Slide>
  );
};

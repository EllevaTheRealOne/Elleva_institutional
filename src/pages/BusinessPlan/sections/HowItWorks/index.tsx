import React from "react";
import { useTranslation } from "react-i18next";
import { Search, Brain, Send, Monitor } from "lucide-react";
import { Slide, SlideHeader } from "../../components/Slide";
import { Reveal } from "../../components/Reveal";
import { Accent } from "../../components/Accent";

type Step = { number: string; title: string; sub: string };

const ICONS = [
  <Search className="size-6" />,
  <Brain className="size-6" />,
  <Send className="size-6" />,
  <Monitor className="size-6" />,
];

/** Slide 5 — the four steps, as four white cards joined by a rule. */
export const HowItWorks: React.FC = () => {
  const { t } = useTranslation("business-plan");
  const steps = t("howItWorks.steps", { returnObjects: true }) as Step[];

  return (
    <Slide id="how-it-works" tone="light">
      <Reveal>
        <SlideHeader
          eyebrow={t("howItWorks.eyebrow")}
          title={<Accent text={t("howItWorks.title")} accent={t("howItWorks.titleAccent")} />}
          align="center"
          className="mx-auto max-w-4xl"
        />
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
        {Array.isArray(steps) &&
          steps.map((step, i) => (
            <Reveal key={step.number} delay={i * 0.08} className="bp-connector text-[var(--bp-cyan-deep)]">
              <div className="bp-card-light flex h-full flex-col gap-5 p-6 sm:p-7">
                <div className="flex items-center gap-4">
                  <span className="bp-disc bp-disc-cyan">{ICONS[i]}</span>
                  <span className="bp-num text-2xl text-[var(--bp-cyan-deep)]">{step.number}</span>
                </div>
                <div>
                  <h3 className="font-[Montserrat] text-xl font-bold text-[var(--bp-ink)]">{step.title}</h3>
                  <p className="bp-small mt-1">{step.sub}</p>
                </div>
              </div>
            </Reveal>
          ))}
      </div>

      <Reveal className="mt-14 text-center" delay={0.2}>
        <div className="bp-h2 bp-accent">{t("howItWorks.footerAccent")}</div>
        <p className="bp-body mt-1 !text-[var(--bp-ink)]">{t("howItWorks.footer")}</p>
      </Reveal>
    </Slide>
  );
};

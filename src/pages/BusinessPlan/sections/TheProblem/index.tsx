import React from "react";
import { useTranslation } from "react-i18next";
import { Slide, SlideHeader } from "../../components/Slide";
import { Reveal } from "../../components/Reveal";

type ProblemCard = { index: string; title: string; text: string };

/** Slide 3 — the problem, as three black cards on the turquoise ground. */
export const TheProblem: React.FC = () => {
  const { t } = useTranslation("business-plan");
  const cards = t("problem.cards", { returnObjects: true }) as ProblemCard[];

  return (
    <Slide id="problem" tone="teal">
      <Reveal>
        <SlideHeader
          eyebrow={t("problem.eyebrow")}
          title={t("problem.title")}
          align="center"
          className="mx-auto max-w-3xl"
        />
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
        {Array.isArray(cards) &&
          cards.map((card, i) => (
            <Reveal key={card.index} delay={i * 0.08}>
              <div className="bp-card-dark flex h-full flex-col gap-5 p-7 sm:p-8">
                <span className="bp-num text-sm text-[var(--bp-dark-text)]">{card.index}</span>
                <h3 className="bp-h2 bp-accent">{card.title}</h3>
                <p className="bp-body">{card.text}</p>
              </div>
            </Reveal>
          ))}
      </div>
    </Slide>
  );
};

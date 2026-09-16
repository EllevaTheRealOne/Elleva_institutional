import React from "react";
import { useTranslation } from "react-i18next";
import { Slide, SlideHeader } from "../../components/Slide";
import { Reveal } from "../../components/Reveal";
import logoInfinox from "@/assets/business-plan/logo-infinox.png";
import logoRoboforex from "@/assets/business-plan/logo-roboforex.png";

const BrokerCard: React.FC<{
  logo: string;
  name: string;
  tagline: string;
  line1: string;
  line1Sub: string;
  line2: string;
  line2Sub: string;
}> = ({ logo, name, tagline, line1, line1Sub, line2, line2Sub }) => (
  <div className="bp-card-dark flex h-full flex-col gap-6 p-7 sm:p-9">
    <div>
      <img src={logo} alt={name} className="h-9 w-auto object-contain sm:h-10" />
      <div className="bp-eyebrow mt-2 !text-[0.6rem] !tracking-[0.18em] !text-[var(--bp-dark-text)]">
        {tagline}
      </div>
      <div className="mt-3 h-[2px] w-40 bg-[var(--bp-cyan)]" />
    </div>

    <div className="flex flex-col gap-5">
      <div>
        <div className="bp-h2 bp-accent">{line1}</div>
        <p className="bp-small mt-1">{line1Sub}</p>
      </div>
      <div>
        <div className="bp-h2 bp-accent">{line2}</div>
        <p className="bp-small mt-1">{line2Sub}</p>
      </div>
    </div>
  </div>
);

/** Slide 6 — the brokers where the operations happen. */
export const Brokers: React.FC = () => {
  const { t } = useTranslation("business-plan");

  return (
    <Slide id="brokers" tone="teal">
      <Reveal>
        <SlideHeader
          eyebrow={t("brokers.eyebrow")}
          title={t("brokers.title")}
          align="center"
          className="mx-auto max-w-4xl"
        />
      </Reveal>

      <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
        <Reveal>
          <BrokerCard
            logo={logoInfinox}
            name={t("brokers.infinox.name")}
            tagline={t("brokers.infinox.tagline")}
            line1={t("brokers.infinox.line1")}
            line1Sub={t("brokers.infinox.line1Sub")}
            line2={t("brokers.infinox.line2")}
            line2Sub={t("brokers.infinox.line2Sub")}
          />
        </Reveal>
        <Reveal delay={0.08}>
          <BrokerCard
            logo={logoRoboforex}
            name={t("brokers.roboforex.name")}
            tagline={t("brokers.roboforex.tagline")}
            line1={t("brokers.roboforex.line1")}
            line1Sub={t("brokers.roboforex.line1Sub")}
            line2={t("brokers.roboforex.line2")}
            line2Sub={t("brokers.roboforex.line2Sub")}
          />
        </Reveal>
      </div>
    </Slide>
  );
};

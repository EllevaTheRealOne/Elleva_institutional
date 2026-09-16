import React from "react";
import { useTranslation } from "react-i18next";
import {
  UserPlus,
  Link2,
  Wallet,
  ArrowRight,
  Users,
  Database,
  PieChart,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import { Slide } from "../../components/Slide";
import { Reveal } from "../../components/Reveal";

type Indicator = { title: string; text: string };

const INDICATOR_ICONS = [
  <Users className="size-5" />,
  <Database className="size-5" />,
  <PieChart className="size-5" />,
  <RefreshCw className="size-5" />,
  <ShieldCheck className="size-5" />,
];

/** Slide 11 — what a Connected Client is, and the portfolio in numbers. */
export const ConnectedClient: React.FC = () => {
  const { t } = useTranslation("business-plan");
  const indicators = t("connectedClient.numbers.indicators", {
    returnObjects: true,
  }) as Indicator[];

  return (
    <Slide id="connected-client" tone="teal">
      <Reveal>
        <h2 className="bp-h1 max-w-2xl">{t("connectedClient.title")}</h2>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-6">
        <Reveal className="flex gap-4 lg:col-span-4">
          <span className="bp-disc bp-disc-black">
            <UserPlus className="size-6" />
          </span>
          <div>
            <h3 className="font-[Montserrat] text-lg font-bold leading-tight text-[var(--bp-black)]">
              {t("connectedClient.relationship.title")}
            </h3>
            <p className="bp-small mt-2 !text-[rgba(10,10,10,0.8)]">
              {t("connectedClient.relationship.textBefore")}
              <strong className="font-bold text-[var(--bp-black)]">
                {t("connectedClient.relationship.textAccent")}
              </strong>
              {t("connectedClient.relationship.textAfter")}
            </p>
          </div>
        </Reveal>

        <Reveal className="flex gap-4 lg:col-span-4" delay={0.08}>
          <ArrowRight className="mt-4 hidden size-6 shrink-0 text-[var(--bp-black)] lg:block" />
          <span className="bp-disc bp-disc-black">
            <Link2 className="size-6" />
          </span>
          <div className="flex-1">
            <h3 className="font-[Montserrat] text-base font-bold leading-tight text-[var(--bp-black)]">
              {t("connectedClient.contribution.title")}
            </h3>
            <div className="bp-card-light mt-4 flex items-center gap-4 px-6 py-5">
              <Wallet className="size-7 text-[var(--bp-ink)]" />
              <span className="h-8 w-px bg-[rgba(10,10,10,0.15)]" />
              <span className="font-[Montserrat] text-lg font-extrabold uppercase leading-tight text-[var(--bp-ink)]">
                {t("connectedClient.contribution.card")}
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-4" delay={0.16}>
          <div className="bp-card-light h-full p-6 sm:p-7">
            <span className="bp-pill bg-[rgba(10,10,10,0.06)] text-[var(--bp-ink)]">
              {t("connectedClient.highlight.badge")}
            </span>
            <h3 className="mt-4 font-[Montserrat] text-lg font-bold leading-snug text-[var(--bp-ink)]">
              {t("connectedClient.highlight.title")}
            </h3>
            <p className="bp-small mt-3">{t("connectedClient.highlight.text")}</p>
          </div>
        </Reveal>
      </div>

      <Reveal className="mt-12" delay={0.1}>
        <div className="bp-card-dark grid grid-cols-1 gap-6 p-6 sm:p-8 lg:grid-cols-[1.1fr_repeat(5,1fr)] lg:gap-4">
          <div className="flex flex-col justify-center gap-3 lg:pr-4">
            <div className="bp-eyebrow !text-[0.6rem] !tracking-[0.2em]">
              {t("connectedClient.numbers.eyebrow")}
            </div>
            <div className="font-[Montserrat] text-3xl font-bold leading-tight sm:text-4xl">
              {t("connectedClient.numbers.title")}
            </div>
          </div>

          {Array.isArray(indicators) &&
            indicators.map((ind, i) => (
              <div
                key={ind.title}
                className="flex flex-col items-center gap-3 rounded-xl border border-white/8 bg-white/[0.03] p-5 text-center"
              >
                <span className="bp-disc bp-disc-outline !size-12">{INDICATOR_ICONS[i]}</span>
                <div className="font-[Montserrat] text-sm font-extrabold uppercase leading-tight">
                  {ind.title}
                </div>
                <p className="bp-small !text-[0.78rem] !text-[var(--bp-dark-muted)]">{ind.text}</p>
              </div>
            ))}
        </div>
      </Reveal>
    </Slide>
  );
};

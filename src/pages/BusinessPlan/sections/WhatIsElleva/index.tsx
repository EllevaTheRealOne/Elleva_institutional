import React from "react";
import { useTranslation } from "react-i18next";
import {
  BarChart3,
  Landmark,
  TrendingUp,
  ShieldCheck,
  ClipboardCheck,
  PieChart,
} from "lucide-react";
import { Slide, SlideHeader } from "../../components/Slide";
import { Reveal } from "../../components/Reveal";
import { Accent } from "../../components/Accent";
import { cn } from "@/lib/utils";

type NodeKey =
  | "marketData"
  | "banks"
  | "brokers"
  | "custody"
  | "compliance"
  | "portfolios";

const LEFT: { key: NodeKey; icon: React.ReactNode }[] = [
  { key: "marketData", icon: <BarChart3 className="size-6" /> },
  { key: "banks", icon: <Landmark className="size-6" /> },
  { key: "brokers", icon: <TrendingUp className="size-6" /> },
];

const RIGHT: { key: NodeKey; icon: React.ReactNode }[] = [
  { key: "custody", icon: <ShieldCheck className="size-6" /> },
  { key: "compliance", icon: <ClipboardCheck className="size-6" /> },
  { key: "portfolios", icon: <PieChart className="size-6" /> },
];

const NodeCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  sub: string;
  side: "left" | "right";
}> = ({ icon, title, sub, side }) => (
  <div className="relative">
    <div className="bp-card-light flex flex-col gap-2 p-4 sm:p-5">
      <span className="text-[var(--bp-cyan-dark)]">{icon}</span>
      <div className="font-[Montserrat] text-sm font-700 font-bold leading-tight">{title}</div>
      <div className="bp-small !text-[0.78rem] leading-snug">{sub}</div>
    </div>
    <span
      aria-hidden="true"
      className={cn(
        "absolute top-1/2 hidden h-[2px] w-6 -translate-y-1/2 bg-[var(--bp-cyan-deep)] lg:block",
        side === "left" ? "-right-6" : "-left-6",
      )}
    />
    <span
      aria-hidden="true"
      className={cn(
        "absolute top-1/2 hidden size-2 -translate-y-1/2 rounded-full border-2 border-[var(--bp-cyan-deep)] bg-white lg:block",
        side === "left" ? "-right-7" : "-left-7",
      )}
    />
  </div>
);

/**
 * Slide 2 — what Elleva is, beside the radial diagram: the operational layer
 * in the centre, the six counterparts around it, and the loop underneath.
 */
export const WhatIsElleva: React.FC = () => {
  const { t } = useTranslation("business-plan");
  const loop = t("whatIs.loop", { returnObjects: true }) as string[];

  return (
    <Slide id="overview" tone="light">
      <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <SlideHeader
            eyebrow={t("whatIs.eyebrow")}
            title={<Accent text={t("whatIs.title")} accent={t("whatIs.titleAccent")} />}
          >
            <p className="bp-body mt-2">{t("whatIs.p1")}</p>
            <p className="bp-body">{t("whatIs.p2")}</p>
            <p className="bp-body">
              <strong className="bp-accent font-bold">{t("whatIs.p3Accent")}</strong>{" "}
              {t("whatIs.p3")}
            </p>
          </SlideHeader>
        </Reveal>

        <Reveal className="lg:col-span-7" delay={0.1}>
          <div className="bp-card-light relative overflow-hidden p-5 sm:p-8">
            {/* Concentric rings behind the diagram */}
            <svg
              className="bp-ring"
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              {[18, 30, 42].map((r) => (
                <circle
                  key={r}
                  cx="50"
                  cy="46"
                  r={r}
                  fill="none"
                  stroke="rgba(18,207,192,0.35)"
                  strokeWidth="0.3"
                  strokeDasharray="0.8 1.2"
                />
              ))}
            </svg>

            <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_auto_1fr] lg:gap-8">
              <div className="flex flex-col gap-4 lg:justify-center">
                {LEFT.map((n) => (
                  <NodeCard
                    key={n.key}
                    icon={n.icon}
                    title={t(`whatIs.nodes.${n.key}.title`)}
                    sub={t(`whatIs.nodes.${n.key}.sub`)}
                    side="left"
                  />
                ))}
              </div>

              <div className="order-first flex items-center justify-center sm:col-span-2 lg:order-none lg:col-span-1">
                <div className="bp-card-light flex w-full max-w-[220px] flex-col items-center gap-2 px-6 py-8 text-center shadow-[0_30px_60px_-30px_rgba(18,207,192,0.6)]">
                  <span className="text-[var(--bp-cyan-dark)]">
                    <BarChart3 className="size-7" />
                  </span>
                  <div className="font-[Montserrat] text-xl font-bold uppercase tracking-[0.3em]">
                    {t("whatIs.core.name")}
                  </div>
                  <div className="h-[2px] w-10 bg-[var(--bp-cyan-deep)]" />
                  <div className="bp-eyebrow !text-[0.55rem] !tracking-[0.25em] !text-[var(--bp-cyan-dark)]">
                    {t("whatIs.core.sub")}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 lg:justify-center">
                {RIGHT.map((n) => (
                  <NodeCard
                    key={n.key}
                    icon={n.icon}
                    title={t(`whatIs.nodes.${n.key}.title`)}
                    sub={t(`whatIs.nodes.${n.key}.sub`)}
                    side="right"
                  />
                ))}
              </div>
            </div>

            <div className="relative mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-[rgba(10,10,10,0.08)] pt-5">
              {loop.map((step, i) => (
                <React.Fragment key={step}>
                  <span className="bp-eyebrow !text-[0.6rem] !tracking-[0.3em] !text-[var(--bp-ink)]">
                    {step}
                  </span>
                  {i < loop.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="size-1.5 rounded-full bg-[var(--bp-cyan-deep)]"
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Slide>
  );
};

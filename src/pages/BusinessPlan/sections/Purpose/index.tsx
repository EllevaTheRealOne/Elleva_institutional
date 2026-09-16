import React from "react";
import { useTranslation } from "react-i18next";
import { Building2, Users, ArrowUpRight } from "lucide-react";
import { Slide, SlideHeader } from "../../components/Slide";
import { Reveal } from "../../components/Reveal";
import { cn } from "@/lib/utils";

const Side: React.FC<{
  pill: string;
  icon: React.ReactNode;
  title: string;
  sub: string;
  align: "left" | "right";
}> = ({ pill, icon, title, sub, align }) => (
  <div
    className={cn(
      "flex flex-col items-center gap-4 text-center",
      align === "left" ? "lg:items-start lg:text-left" : "lg:items-end lg:text-right",
    )}
  >
    <span className="bp-pill bg-white text-[var(--bp-black)] shadow-md">{pill}</span>
    <span className="bp-disc bp-disc-black">{icon}</span>
    <div>
      <div className="font-[Montserrat] text-2xl font-bold text-[var(--bp-black)]">{title}</div>
      <div className="bp-body !text-[rgba(10,10,10,0.7)]">{sub}</div>
    </div>
  </div>
);

/** Slide 8 — the purpose: two starting points, one entry door. */
export const Purpose: React.FC = () => {
  const { t } = useTranslation("business-plan");

  return (
    <Slide id="purpose" tone="teal">
      <Reveal>
        <SlideHeader
          eyebrow={t("purpose.eyebrow")}
          title={t("purpose.title")}
          align="center"
          className="mx-auto max-w-4xl"
        />
      </Reveal>

      <div className="relative mt-16 grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_auto_1fr] lg:gap-6">
        {/* The rule the three blocks sit on */}
        <span
          aria-hidden="true"
          className="absolute left-[12%] right-[12%] top-1/2 hidden h-[2px] -translate-y-1/2 bg-[rgba(10,10,10,0.55)] lg:block"
        />

        <Reveal className="relative">
          <Side
            pill={t("purpose.left.pill")}
            icon={<Building2 className="size-6" />}
            title={t("purpose.left.title")}
            sub={t("purpose.left.sub")}
            align="left"
          />
        </Reveal>

        <Reveal className="relative flex justify-center" delay={0.08}>
          <div className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-10 top-1/2 hidden size-4 -translate-y-1/2 rounded-full border-[3px] border-white bg-[var(--bp-black)] lg:block"
            />
            <span
              aria-hidden="true"
              className="absolute -right-10 top-1/2 hidden size-4 -translate-y-1/2 rounded-full border-[3px] border-white bg-[var(--bp-black)] lg:block"
            />
            <div className="bp-card-light flex min-w-[260px] flex-col items-center gap-2 px-10 py-8 text-center">
              <ArrowUpRight className="size-8 text-[var(--bp-black)]" />
              <div className="font-[Montserrat] text-3xl font-bold uppercase tracking-[0.2em] text-[var(--bp-black)]">
                {t("purpose.center.name")}
              </div>
              <div className="bp-eyebrow !text-[0.6rem] !tracking-[0.3em] !text-[rgba(10,10,10,0.55)]">
                {t("purpose.center.sub")}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="relative" delay={0.16}>
          <Side
            pill={t("purpose.right.pill")}
            icon={<Users className="size-6" />}
            title={t("purpose.right.title")}
            sub={t("purpose.right.sub")}
            align="right"
          />
        </Reveal>
      </div>

      <Reveal className="mt-16 text-center" delay={0.2}>
        <p className="bp-lead">{t("purpose.closingLead")}</p>
        <p className="bp-body">{t("purpose.closing")}</p>
      </Reveal>
    </Slide>
  );
};

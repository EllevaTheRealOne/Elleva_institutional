import React from "react";
import { useTranslation } from "react-i18next";
import { Slide } from "../../components/Slide";
import { Reveal } from "../../components/Reveal";
import heroBackdrop from "@/assets/business-plan/hero-backdrop.webp";

/** Slides 17 and 18 — the closing statement, then the mark again. */
export const Closing: React.FC = () => {
  const { t } = useTranslation("business-plan");

  return (
    <>
      <Slide id="closing" tone="dark" className="!py-32 sm:!py-44">
        <Reveal className="text-center">
          <p className="bp-h1 mx-auto max-w-5xl">
            {t("closing.line1")}
            <br />
            <span className="bp-accent">{t("closing.line2")}</span>
            <br />
            {t("closing.line3")}
          </p>
        </Reveal>
      </Slide>

      <div
        aria-hidden="true"
        className="h-[42vh] min-h-[280px] w-full bg-[#050505]"
        style={{
          backgroundImage: `url(${heroBackdrop})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </>
  );
};

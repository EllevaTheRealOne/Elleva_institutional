import React from "react";
import { useTranslation } from "react-i18next";
import { SlideHeader } from "../../components/Slide";
import { Reveal } from "../../components/Reveal";
import { Accent } from "../../components/Accent";
import phone from "@/assets/business-plan/back-office-phone.webp";

/**
 * Slide 7 — the client back office. The phone is the deck's own render,
 * cut from the slide and dissolved into the ground on its open edges; it is
 * pinned to the bottom of the section as it is on the slide.
 */
export const BackOffice: React.FC = () => {
  const { t } = useTranslation("business-plan");

  return (
    <section id="back-office" className="bp-slide bp-dark">
      <div className="bp-chrome mx-auto w-full max-w-7xl px-6 sm:px-10">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12">
          <Reveal className="py-20 sm:py-24 lg:col-span-6 lg:py-32">
            <SlideHeader
              eyebrow={t("backOffice.eyebrow")}
              title={<Accent text={t("backOffice.title")} accent={t("backOffice.titleAccent")} />}
            >
              <p className="bp-lead mt-2">{t("backOffice.lead")}</p>
              <p className="bp-body max-w-lg">{t("backOffice.text")}</p>
            </SlideHeader>

            <div className="mt-16 flex items-center justify-between lg:mt-24">
              <span className="bp-wordmark">Elleva</span>
              <span className="bp-dashes" aria-hidden="true">
                <span />
                <span />
              </span>
            </div>
          </Reveal>

          <div className="relative -mx-6 min-h-[420px] sm:-mx-10 sm:min-h-[560px] lg:col-span-6 lg:mx-0 lg:min-h-0">
            <img
              src={phone}
              alt={t("backOffice.imageAlt")}
              className="absolute bottom-0 right-0 h-full w-auto max-w-none object-contain object-right-bottom lg:h-[min(100%,760px)]"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

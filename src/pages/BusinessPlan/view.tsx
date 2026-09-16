import React from "react";
import { useTranslation } from "react-i18next";
import { usePageMeta } from "@/hooks/use-page-meta";
import { PATH_PAGE } from "@/constants/routes/routes.constants";
import "./business-plan.css";
import { Hero } from "./sections/Hero";
import { WhatIsElleva } from "./sections/WhatIsElleva";
import { TheProblem } from "./sections/TheProblem";
import { MarketProgression } from "./sections/MarketProgression";
import { HowItWorks } from "./sections/HowItWorks";
import { Brokers } from "./sections/Brokers";
import { BackOffice } from "./sections/BackOffice";
import { Purpose } from "./sections/Purpose";
import { Partners } from "./sections/Partners";
import { Journey } from "./sections/Journey";
import { ConnectedClient } from "./sections/ConnectedClient";
import { Framework } from "./sections/Framework";
import { GrowPortfolio } from "./sections/GrowPortfolio";
import { Diversification } from "./sections/Diversification";
import { ContractAcceleration } from "./sections/ContractAcceleration";
import { NextSteps } from "./sections/NextSteps";
import { Closing } from "./sections/Closing";
import { BackToTop } from "./components/BackToTop";

/**
 * The Business Plan, one section per slide of the "ELLEVA versão 1.0" deck,
 * in the deck's order and in the deck's art direction (see business-plan.css).
 */
export const BusinessPlanView: React.FC = () => {
  const { t } = useTranslation("business-plan");

  usePageMeta({
    title: t("meta.title"),
    description: t("meta.description"),
    path: PATH_PAGE.businessPlan,
  });

  return (
    <div className="bp">
      <Hero />
      <WhatIsElleva />
      <TheProblem />
      <MarketProgression />
      <HowItWorks />
      <Brokers />
      <BackOffice />
      <Purpose />
      <Partners />
      <Journey />
      <ConnectedClient />
      <Framework />
      <GrowPortfolio />
      <Diversification />
      <ContractAcceleration />
      <NextSteps />
      <Closing />
      <BackToTop />
    </div>
  );
};

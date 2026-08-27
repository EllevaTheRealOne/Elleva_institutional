import React from "react";
import { Hero } from "./sections/Hero";
import { TheProblem } from "./sections/TheProblem";
import { NewCategory } from "./sections/NewCategory";
import { MarketOpportunity } from "./sections/MarketOpportunity";
import { TheProduct } from "./sections/TheProduct";
import { InvestmentIntelligence } from "./sections/InvestmentIntelligence";
import { Architecture } from "./sections/Architecture";
import { InvestmentExperience } from "./sections/InvestmentExperience";
import { GlobalMarkets } from "./sections/GlobalMarkets";
import { TheNewSoftware } from "./sections/TheNewSoftware";
import { BusinessModel } from "./sections/BusinessModel";
import { EllevaLoop } from "./sections/EllevaLoop";
import { Defensibility } from "./sections/Defensibility";
import { StrategicPillars } from "./sections/StrategicPillars";
import { Technology } from "./sections/Technology";
import { ModernFinancialInfrastructure } from "./sections/ModernFinancialInfrastructure";
import { OperationalAdvantage } from "./sections/OperationalAdvantage";
import { Trust } from "./sections/Trust";
import { Ecosystem } from "./sections/Ecosystem";
import { FAQ } from "./sections/FAQ";
import { FinalCTA } from "./sections/FinalCTA";
import { useTheme } from "@/context/theme";

export const HomeView: React.FC = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const getSectionDark = (sectionNum: number) => {
    if (isDark) return true;
    const darkSectionsInLightMode = [3, 6, 8, 12, 13, 15, 18, 21];
    return darkSectionsInLightMode.includes(sectionNum);
  };

  return (
    <>
      {/* 01 Hero */}
      <Hero isDark={getSectionDark(1)} />

      {/* 02 The Problem */}
      <TheProblem isDark={getSectionDark(2)} />

      {/* 03 A New Category */}
      <NewCategory isDark={getSectionDark(3)} />

      {/* 04 Market Opportunity */}
      <MarketOpportunity isDark={getSectionDark(4)} />

      {/* 05 The Product */}
      <TheProduct isDark={getSectionDark(5)} />

      {/* 06 Investment Intelligence */}
      <InvestmentIntelligence isDark={getSectionDark(6)} />

      {/* 07 Architecture */}
      <Architecture isDark={getSectionDark(7)} />

      {/* 08 Investment Experience */}
      <InvestmentExperience isDark={getSectionDark(8)} />

      {/* 09 Global Markets */}
      <GlobalMarkets isDark={getSectionDark(9)} />

      {/* 10 The New Software */}
      <TheNewSoftware isDark={getSectionDark(10)} />

      {/* 11 Business Model */}
      <BusinessModel isDark={getSectionDark(11)} />

      {/* 12 Elleva Loop */}
      <EllevaLoop isDark={getSectionDark(12)} />

      {/* 13 Defensibility */}
      <Defensibility isDark={getSectionDark(13)} />

      {/* 14 Strategic Pillars */}
      <StrategicPillars isDark={getSectionDark(14)} />

      {/* 15 Technology */}
      <Technology isDark={getSectionDark(15)} />

      {/* 16 Modern Financial Infrastructure */}
      <ModernFinancialInfrastructure isDark={getSectionDark(16)} />

      {/* 17 Operational Advantage */}
      <OperationalAdvantage isDark={getSectionDark(17)} />

      {/* 18 Trust */}
      <Trust isDark={getSectionDark(18)} />

      {/* 19 Ecosystem */}
      <Ecosystem isDark={getSectionDark(19)} />

      {/* 20 FAQ */}
      <FAQ isDark={getSectionDark(20)} />

      {/* 21 Final CTA */}
      <FinalCTA isDark={getSectionDark(21)} />
    </>
  );
};

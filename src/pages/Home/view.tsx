import React from "react";
import { Hero } from "./sections/Hero";
import { TheProblem } from "./sections/TheProblem";
import { SectionBackdrop } from "@/components/backdrop/SectionBackdrop";
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

export const HomeView: React.FC = () => {
  // Every section is dark. The page used to alternate white and dark bands in
  // light mode; the white ones are gone, so the ground is continuous.
  const getSectionDark = (_sectionNum: number) => true;

  return (
    <>
      {/* 01 Hero */}
      <SectionBackdrop index={1}>
        <Hero isDark={getSectionDark(1)} />
      </SectionBackdrop>

      {/* 02 The Problem */}
      <SectionBackdrop index={2}>
        <TheProblem isDark={getSectionDark(2)} />
      </SectionBackdrop>

      {/* 03 A New Category */}
      <SectionBackdrop index={3}>
        <NewCategory isDark={getSectionDark(3)} />
      </SectionBackdrop>

      {/* 04 Market Opportunity */}
      <SectionBackdrop index={4}>
        <MarketOpportunity isDark={getSectionDark(4)} />
      </SectionBackdrop>

      {/* 05 The Product */}
      <SectionBackdrop index={5}>
        <TheProduct isDark={getSectionDark(5)} />
      </SectionBackdrop>

      {/* 06 Investment Intelligence */}
      <SectionBackdrop index={6}>
        <InvestmentIntelligence isDark={getSectionDark(6)} />
      </SectionBackdrop>

      {/* 07 Architecture */}
      <SectionBackdrop index={7}>
        <Architecture isDark={getSectionDark(7)} />
      </SectionBackdrop>

      {/* 08 Investment Experience */}
      <SectionBackdrop index={8}>
        <InvestmentExperience isDark={getSectionDark(8)} />
      </SectionBackdrop>

      {/* 09 Global Markets */}
      <SectionBackdrop index={9}>
        <GlobalMarkets isDark={getSectionDark(9)} />
      </SectionBackdrop>

      {/* 10 The New Software */}
      <SectionBackdrop index={10}>
        <TheNewSoftware isDark={getSectionDark(10)} />
      </SectionBackdrop>

      {/* 11 Business Model */}
      <SectionBackdrop index={11}>
        <BusinessModel isDark={getSectionDark(11)} />
      </SectionBackdrop>

      {/* 12 Elleva Loop */}
      <SectionBackdrop index={12}>
        <EllevaLoop isDark={getSectionDark(12)} />
      </SectionBackdrop>

      {/* 13 Defensibility */}
      <SectionBackdrop index={13}>
        <Defensibility isDark={getSectionDark(13)} />
      </SectionBackdrop>

      {/* 14 Strategic Pillars */}
      <SectionBackdrop index={14}>
        <StrategicPillars isDark={getSectionDark(14)} />
      </SectionBackdrop>

      {/* 15 Technology */}
      <SectionBackdrop index={15}>
        <Technology isDark={getSectionDark(15)} />
      </SectionBackdrop>

      {/* 16 Modern Financial Infrastructure */}
      <SectionBackdrop index={16}>
        <ModernFinancialInfrastructure isDark={getSectionDark(16)} />
      </SectionBackdrop>

      {/* 17 Operational Advantage */}
      <SectionBackdrop index={17}>
        <OperationalAdvantage isDark={getSectionDark(17)} />
      </SectionBackdrop>

      {/* 18 Trust */}
      <SectionBackdrop index={18}>
        <Trust isDark={getSectionDark(18)} />
      </SectionBackdrop>

      {/* 19 Ecosystem */}
      <SectionBackdrop index={19}>
        <Ecosystem isDark={getSectionDark(19)} />
      </SectionBackdrop>

      {/* 20 FAQ */}
      <SectionBackdrop index={20}>
        <FAQ isDark={getSectionDark(20)} />
      </SectionBackdrop>

      {/* 21 Final CTA */}
      <SectionBackdrop index={21}>
        <FinalCTA isDark={getSectionDark(21)} />
      </SectionBackdrop>
    </>
  );
};

import React, { Suspense, lazy, useEffect, useRef, useState } from "react";
import { Hero } from "./sections/Hero";
import { TheProblem } from "./sections/TheProblem";
import { SectionBackdrop } from "@/components/backdrop/SectionBackdrop";
import { NewCategory } from "./sections/NewCategory";
import { MarketOpportunity } from "./sections/MarketOpportunity";
import { TheProduct } from "./sections/TheProduct";
const InvestmentIntelligence = lazy(() => import("./sections/InvestmentIntelligence").then(m => ({ default: m.InvestmentIntelligence })));
const Architecture = lazy(() => import("./sections/Architecture").then(m => ({ default: m.Architecture })));
const InvestmentExperience = lazy(() => import("./sections/InvestmentExperience").then(m => ({ default: m.InvestmentExperience })));
const GlobalMarkets = lazy(() => import("./sections/GlobalMarkets").then(m => ({ default: m.GlobalMarkets })));
const TheNewSoftware = lazy(() => import("./sections/TheNewSoftware").then(m => ({ default: m.TheNewSoftware })));
import { BusinessModel } from "./sections/BusinessModel";
const EllevaLoop = lazy(() => import("./sections/EllevaLoop").then(m => ({ default: m.EllevaLoop })));
import { Defensibility } from "./sections/Defensibility";
import { StrategicPillars } from "./sections/StrategicPillars";
import { Technology } from "./sections/Technology";
const ModernFinancialInfrastructure = lazy(() => import("./sections/ModernFinancialInfrastructure").then(m => ({ default: m.ModernFinancialInfrastructure })));
import { OperationalAdvantage } from "./sections/OperationalAdvantage";
import { Trust } from "./sections/Trust";
import { GlobalPresence } from "./sections/GlobalPresence";
import { Ecosystem } from "./sections/Ecosystem";
import { FAQ } from "./sections/FAQ";
import { FinalCTA } from "./sections/FinalCTA";
import { usePageMeta } from "@/hooks/use-page-meta";
import { PATH_PAGE } from "@/constants/routes/routes.constants";

// Defers below-the-fold modules until close to the viewport; keeps the section placeholder stable.
function DeferredSection({ children, minHeight = 500 }: { children: React.ReactNode; minHeight?: number }) {
 const ref = useRef<HTMLDivElement>(null);
 const [ready, setReady] = useState(false);
 useEffect(() => {
  if (ready || !ref.current) return;
  if (!("IntersectionObserver" in window)) { setReady(true); return; }
  const observer = new IntersectionObserver(entries => {
    if (entries.some(entry => entry.isIntersecting)) { setReady(true); observer.disconnect(); }
  }, { rootMargin: "700px 0px" });
  observer.observe(ref.current);
  return () => observer.disconnect();
 }, [ready]);
 return <div ref={ref} style={!ready ? { minHeight } : undefined}>
  {ready && <Suspense fallback={<div style={{ minHeight }} aria-label="Loading section" />} >{children}</Suspense>}
 </div>;
}

export const HomeView: React.FC = () => {
  usePageMeta({
    title: "Elleva | Global Investment Platform",
    description:
      "Elleva is a global investment platform combining research, portfolio intelligence, execution and monitoring in a unified investment experience.",
    path: PATH_PAGE.home,
  });

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
        <DeferredSection><InvestmentIntelligence isDark={getSectionDark(6)} /></DeferredSection>
      </SectionBackdrop>

      {/* 07 Architecture */}
      <SectionBackdrop index={7}>
        <DeferredSection><Architecture isDark={getSectionDark(7)} /></DeferredSection>
      </SectionBackdrop>

      {/* 08 Investment Experience */}
      <SectionBackdrop index={8}>
        <DeferredSection><InvestmentExperience isDark={getSectionDark(8)} /></DeferredSection>
      </SectionBackdrop>

      {/* 09 Global Markets */}
      <SectionBackdrop index={9}>
        <DeferredSection><GlobalMarkets isDark={getSectionDark(9)} /></DeferredSection>
      </SectionBackdrop>

      {/* 10 The New Software */}
      <SectionBackdrop index={10}>
        <DeferredSection><TheNewSoftware isDark={getSectionDark(10)} /></DeferredSection>
      </SectionBackdrop>

      {/* 11 Business Model */}
      <SectionBackdrop index={11}>
        <BusinessModel isDark={getSectionDark(11)} />
      </SectionBackdrop>

      {/* 12 Elleva Loop */}
      <SectionBackdrop index={12}>
        <DeferredSection><EllevaLoop isDark={getSectionDark(12)} /></DeferredSection>
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
        <DeferredSection><ModernFinancialInfrastructure isDark={getSectionDark(16)} /></DeferredSection>
      </SectionBackdrop>

      {/* 17 Operational Advantage */}
      <SectionBackdrop index={17}>
        <OperationalAdvantage isDark={getSectionDark(17)} />
      </SectionBackdrop>

      {/* 18 Trust */}
      <SectionBackdrop index={18}>
        <Trust isDark={getSectionDark(18)} />
      </SectionBackdrop>

      {/* 19 Global Presence */}
      <SectionBackdrop index={19}>
        <GlobalPresence isDark={getSectionDark(19)} />
      </SectionBackdrop>

      {/* 20 Ecosystem */}
      <SectionBackdrop index={20}>
        <Ecosystem isDark={getSectionDark(20)} />
      </SectionBackdrop>

      {/* 21 FAQ */}
      <SectionBackdrop index={21}>
        <FAQ isDark={getSectionDark(21)} />
      </SectionBackdrop>

      {/* 22 Final CTA */}
      <SectionBackdrop index={22}>
        <FinalCTA isDark={getSectionDark(22)} />
      </SectionBackdrop>
    </>
  );
};

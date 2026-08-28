import React from "react";
import {
  ArrowRight,
  Layers,
  Database,
  Landmark,
  Building,
  Lock,
  ShieldCheck,
  PieChart,
  Activity,
} from "lucide-react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { FlowWrapper } from "@/components/flow/FlowWrapper";
import { CentralCoreNode, ModuleNode } from "@/components/flow/CustomNodes";
import { createArchitectureEdge } from "@/components/flow/edgeUtils";
import { Node, Edge } from "@xyflow/react";

interface HeroProps {
  isDark?: boolean;
  onRequestAccess?: () => void;
}

const nodeTypes = {
  centralCore: CentralCoreNode,
  moduleNode: ModuleNode,
};

export const Hero: React.FC<HeroProps> = ({
  isDark = false,
  onRequestAccess,
}) => {
  const { t } = useTranslation(["home", "common"]);

  // React Flow nodes for Hero - perfectly aligned on horizontal and vertical corridors
  const heroNodes: Node[] = [
    // Center: ELLEVA CAMADA OPERACIONAL AUTÔNOMA
    {
      id: "hero-core",
      type: "centralCore",
      position: { x: 310, y: 140 },
      data: {
        title: "ELLEVA",
        subtitle: t("hero.nodes.coreSubtitle"),
        caption: t("hero.nodes.coreCaption"),
        isDark,
        minWidth: "260px",
        DecorativeOrbits: true,
      },
    },
    // Left Column: Dados de Mercado, Bancos, Corretoras (X=50)
    {
      id: "hero-mod-data",
      type: "moduleNode",
      position: { x: 50, y: 40 },
      data: {
        label: t("hero.nodes.marketData"),
        subtext: t("hero.nodes.marketDataSub"),
        icon: <Database className="w-3.5 h-3.5" />,
        isDark,
      },
    },
    {
      id: "hero-mod-banks",
      type: "moduleNode",
      position: { x: 50, y: 150 },
      data: {
        label: t("hero.nodes.banks"),
        subtext: t("hero.nodes.banksSub"),
        icon: <Landmark className="w-3.5 h-3.5" />,
        isDark,
      },
    },
    {
      id: "hero-mod-brokers",
      type: "moduleNode",
      position: { x: 50, y: 260 },
      data: {
        label: t("hero.nodes.brokers"),
        subtext: t("hero.nodes.brokersSub"),
        icon: <Building className="w-3.5 h-3.5" />,
        isDark,
      },
    },
    // Right Column: Custódia, Compliance, Portfólios (X=650)
    {
      id: "hero-mod-custody",
      type: "moduleNode",
      position: { x: 650, y: 40 },
      data: {
        label: t("hero.nodes.custody"),
        subtext: t("hero.nodes.custodySub"),
        icon: <Lock className="w-3.5 h-3.5" />,
        isDark,
      },
    },
    {
      id: "hero-mod-compliance",
      type: "moduleNode",
      position: { x: 650, y: 150 },
      data: {
        label: t("hero.nodes.compliance"),
        subtext: t("hero.nodes.complianceSub"),
        icon: <ShieldCheck className="w-3.5 h-3.5" />,
        isDark,
      },
    },
    {
      id: "hero-mod-portfolios",
      type: "moduleNode",
      position: { x: 650, y: 260 },
      data: {
        label: t("hero.nodes.portfolios"),
        subtext: t("hero.nodes.portfoliosSub"),
        icon: <PieChart className="w-3.5 h-3.5" />,
        isDark,
      },
    },
  ];

  // Refined orthogonal routing with dedicated handle IDs to prevent overlap or diagonal crosses
  const heroEdges: Edge[] = [
    // Left Column -> Core (dedicated left entry points)
    createArchitectureEdge({
      id: "eh-data-core",
      source: "hero-mod-data",
      target: "hero-core",
      sourceHandle: "right-src",
      targetHandle: "left-top",
      isDark,
    }),
    createArchitectureEdge({
      id: "eh-banks-core",
      source: "hero-mod-banks",
      target: "hero-core",
      sourceHandle: "right-src",
      targetHandle: "left-middle",
      isDark,
    }),
    createArchitectureEdge({
      id: "eh-brokers-core",
      source: "hero-mod-brokers",
      target: "hero-core",
      sourceHandle: "right-src",
      targetHandle: "left-bottom",
      isDark,
    }),
    // Core -> Right Column (dedicated right exit points)
    createArchitectureEdge({
      id: "eh-core-custody",
      source: "hero-core",
      target: "hero-mod-custody",
      sourceHandle: "right-top-src",
      targetHandle: "left",
      isDark,
    }),
    createArchitectureEdge({
      id: "eh-core-compliance",
      source: "hero-core",
      target: "hero-mod-compliance",
      sourceHandle: "right-middle-src",
      targetHandle: "left",
      isDark,
    }),
    createArchitectureEdge({
      id: "eh-core-portfolios",
      source: "hero-core",
      target: "hero-mod-portfolios",
      sourceHandle: "right-bottom-src",
      targetHandle: "left",
      isDark,
    }),
  ];

  const operatingPhases = [
    {
      name: t("operatingLoop.steps.research.name"),
      role: t("operatingLoop.steps.research.role"),
    },
    {
      name: t("operatingLoop.steps.decide.name"),
      role: t("operatingLoop.steps.decide.role"),
    },
    {
      name: t("operatingLoop.steps.execute.name"),
      role: t("operatingLoop.steps.execute.role"),
    },
    {
      name: t("operatingLoop.steps.monitor.name"),
      role: t("operatingLoop.steps.monitor.role"),
    },
  ];

  return (
    <section
      id="hero"
      className={`relative pt-28 pb-14 sm:pt-36 sm:pb-20 overflow-hidden transition-colors duration-300 ${
        isDark ? "bg-[#050607] text-[#F5F7F6]" : "bg-[#F7F8F6] text-[#0A0D0C]"
      }`}
    >
      {/* Dot pattern background */}
      <div
        className={`absolute inset-0 pointer-events-none ${
          isDark
            ? "dot-pattern-dark opacity-40"
            : "dot-pattern-light opacity-60"
        }`}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Narrative */}
          <div className="lg:col-span-5 flex flex-col justify-center gap-6">
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="type-hero-title max-w-2xl"
              >
                {t("hero.title")}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className={`type-body max-w-xl ${
                  isDark ? "text-[#8E9995]" : "text-[#4E5653]"
                }`}
              >
                {t("hero.description")}
              </motion.p>
            </div>

            {/* Quick Multiplier Pill stats */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex gap-4"
            >
              <div
                className={`p-4 rounded-xl flex-1 transition-all ${
                  isDark
                    ? "node-card-dark accent-glow"
                    : "node-card accent-glow"
                }`}
              >
                <div
                  className={`type-section-eyebrow mb-1 ${isDark ? "text-[#8E9995]" : "text-[#4E5653]"}`}
                >
                  {t("hero.stats.operationalLeverage")}
                </div>
                <div className="type-metric text-[#189890]">14.2x</div>
                <div className="type-micro text-[#8E9995] mt-1">
                  {t("hero.stats.operationalLeverageSub")}
                </div>
              </div>

              <div
                className={`p-4 rounded-xl flex-1 transition-all ${
                  isDark ? "node-card-dark" : "node-card"
                }`}
              >
                <div
                  className={`type-section-eyebrow mb-1 ${isDark ? "text-[#8E9995]" : "text-[#4E5653]"}`}
                >
                  {t("hero.stats.globalConnectivity")}
                </div>
                <div className="type-metric">24/7</div>
                <div className="type-micro text-[#8E9995] mt-1">
                  {t("hero.stats.globalConnectivitySub")}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: React Flow Topology */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <FlowWrapper
                nodes={heroNodes}
                edges={heroEdges}
                nodeTypes={nodeTypes}
                isDark={isDark}
                heightClass="h-[360px] sm:h-[400px]"
                badgeLabel={t("hero.topologyBadge")}
                fitPadding={0.12}
                DecorativeOrbits
              />
            </motion.div>
          </div>
        </div>

        {/* Operating Cycle Strip */}
        <div
          id="hero-operating-cycle"
          className={`mt-10 sm:mt-12 py-5 px-6 sm:px-8 rounded-xl border flex flex-col md:flex-row items-center justify-between gap-6 transition-all ${
            isDark
              ? "bg-[#0A0D0F] border-[rgba(245,247,246,0.08)]"
              : "bg-white border-[rgba(10,13,12,0.06)] shadow-xs"
          }`}
        >
          <div className="flex flex-col gap-1.5 items-center md:items-start w-full md:w-auto">
            <span className="text-[10px] font-ui uppercase tracking-widest text-[#8E9995] font-semibold">
              {t("hero.loopTitle")}
            </span>
            <div className="flex flex-wrap gap-3 sm:gap-6 items-center justify-center">
              {operatingPhases.map((phase, idx) => (
                <React.Fragment key={phase.name}>
                  <a
                    href="#product"
                    className="font-ui text-xs sm:text-sm font-semibold tracking-wider cycle-step transition-colors hover:text-[#189890]"
                  >
                    {phase.name}
                  </a>
                  {idx < operatingPhases.length - 1 && (
                    <span className="text-[#189890] opacity-40 inline-flex items-center">
                      <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-6 sm:gap-8 justify-between md:justify-end w-full md:w-auto">
            <div className="text-right">
              <div className="text-[10px] font-ui uppercase tracking-widest text-[#8E9995] font-semibold mb-0.5">
                {t("hero.operationalAdvantage")}
              </div>
              <div className="flex items-center gap-2 justify-end">
                <span className="text-xs font-ui font-bold text-[#189890]">
                  +28.4%
                </span>
                <span className="text-[10px] text-[#8E9995]">
                  {t("hero.efficiencyDelta")}
                </span>
              </div>
            </div>

            <div className="h-8 w-[1px] bg-[rgba(10,13,12,0.08)] dark:bg-[rgba(245,247,246,0.1)] hidden sm:block" />

            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#189890]" />
              <span
                className={`text-[11px] font-ui font-medium ${isDark ? "text-[#8E9995]" : "text-[#4E5653]"}`}
              >
                {t("hero.continuousFiduciary")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

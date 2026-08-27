import React from "react";
import { useTranslation } from "react-i18next";
import { FlowWrapper } from "@/components/flow/FlowWrapper";
import {
  CentralCoreNode,
  PipelineStageNode,
} from "@/components/flow/CustomNodes";
import { Node, Edge, MarkerType } from "@xyflow/react";

interface ModernFinancialInfrastructureProps {
  isDark?: boolean;
}

const nodeTypes = {
  centralCore: CentralCoreNode,
  pipelineStage: PipelineStageNode,
};

export const ModernFinancialInfrastructure: React.FC<
  ModernFinancialInfrastructureProps
> = ({ isDark = false }) => {
  const { t } = useTranslation(["home", "common"]);
  const edgeColor = isDark ? "#189890" : "#0C5F5A";

  // 3-Tier Layered Stack in React Flow:
  // Top: CLIENT INTELLIGENCE & GOVERNANCE
  // Middle: ELLEVA AUTONOMOUS LAYER
  // Bottom: INSTITUTIONAL INFRASTRUCTURE
  const stackNodes: Node[] = [
    // Layer 1 (Top)
    {
      id: "stack-top-1",
      type: "pipelineStage",
      position: { x: 180, y: 30 },
      data: {
        stageNumber: t("infrastructure.tier1Badge"),
        label: t("infrastructure.tier1LeftTitle"),
        description: t("infrastructure.tier1LeftDesc"),
        isDark,
      },
    },
    {
      id: "stack-top-2",
      type: "pipelineStage",
      position: { x: 540, y: 30 },
      data: {
        stageNumber: t("infrastructure.tier1Badge"),
        label: t("infrastructure.tier1RightTitle"),
        description: t("infrastructure.tier1RightDesc"),
        isDark,
      },
    },

    // Layer 2 (Middle - Elleva Autonomous Layer)
    {
      id: "stack-middle",
      type: "centralCore",
      position: { x: 300, y: 170 },
      data: {
        title: "ELLEVA AUTONOMOUS LAYER",
        subtitle: t("infrastructure.middleSubtitle"),
        caption: t("infrastructure.middleCaption"),
        isDark,
        minWidth: "340px",
      },
    },

    // Layer 3 (Bottom - Institutional Infrastructure)
    {
      id: "stack-bot-1",
      type: "pipelineStage",
      position: { x: 80, y: 340 },
      data: {
        stageNumber: t("infrastructure.tier3Badge"),
        label: t("infrastructure.tier3CustodyTitle"),
        description: t("infrastructure.tier3CustodyDesc"),
        isDark,
      },
    },
    {
      id: "stack-bot-2",
      type: "pipelineStage",
      position: { x: 370, y: 340 },
      data: {
        stageNumber: t("infrastructure.tier3Badge"),
        label: t("infrastructure.tier3BanksTitle"),
        description: t("infrastructure.tier3BanksDesc"),
        isDark,
      },
    },
    {
      id: "stack-bot-3",
      type: "pipelineStage",
      position: { x: 660, y: 340 },
      data: {
        stageNumber: t("infrastructure.tier3Badge"),
        label: t("infrastructure.tier3BrokersTitle"),
        description: t("infrastructure.tier3BrokersDesc"),
        isDark,
      },
    },
  ];

  const stackEdges: Edge[] = [
    {
      id: "es-top1-mid",
      source: "stack-top-1",
      target: "stack-middle",
      type: "default",
      animated: true,
      style: { stroke: edgeColor, strokeWidth: 1.8 },
      markerEnd: { type: MarkerType.ArrowClosed, color: edgeColor },
    },
    {
      id: "es-top2-mid",
      source: "stack-top-2",
      target: "stack-middle",
      type: "default",
      animated: true,
      style: { stroke: edgeColor, strokeWidth: 1.8 },
      markerEnd: { type: MarkerType.ArrowClosed, color: edgeColor },
    },
    {
      id: "es-mid-bot1",
      source: "stack-middle",
      target: "stack-bot-1",
      type: "default",
      animated: true,
      style: { stroke: edgeColor, strokeWidth: 1.8 },
      markerEnd: { type: MarkerType.ArrowClosed, color: edgeColor },
    },
    {
      id: "es-mid-bot2",
      source: "stack-middle",
      target: "stack-bot-2",
      type: "default",
      animated: true,
      style: { stroke: edgeColor, strokeWidth: 1.8 },
      markerEnd: { type: MarkerType.ArrowClosed, color: edgeColor },
    },
    {
      id: "es-mid-bot3",
      source: "stack-middle",
      target: "stack-bot-3",
      type: "default",
      animated: true,
      style: { stroke: edgeColor, strokeWidth: 1.8 },
      markerEnd: { type: MarkerType.ArrowClosed, color: edgeColor },
    },
  ];

  return (
    <section
      id="financial-infrastructure"
      className={`py-20 sm:py-28 border-t border-black/[0.04] dark:border-white/5 transition-colors duration-300 ${
        isDark ? "bg-[#050607] text-[#F5F7F6]" : "bg-[#F7F8F6] text-[#0A0D0C]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="type-section-title mb-4">
            {t("infrastructure.title")}
          </h2>
          <p
            className={`type-body ${isDark ? "text-[#8E9995]" : "text-[#4E5653]"}`}
          >
            {t("infrastructure.description")}
          </p>
        </div>

        {/* React Flow Layered Stack */}
        <div className="mb-10" id="institutional-connectivity">
          <FlowWrapper
            nodes={stackNodes}
            edges={stackEdges}
            nodeTypes={nodeTypes}
            isDark={isDark}
            heightClass="h-[480px] sm:h-[520px]"
            badgeLabel={t("infrastructure.flowBadge")}
            fitPadding={0.15}
          />
        </div>

        {/* 3 Tier Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            id="infrastructure-portfolios"
            className={`p-6 rounded-xl border ${
              isDark
                ? "bg-[#0A0D0F] border-[rgba(245,247,246,0.08)]"
                : "bg-white border-[rgba(10,13,12,0.08)] shadow-xs"
            }`}
          >
            <div className="text-[10px] font-mono font-bold text-[#189890] uppercase mb-1">
              {t("infrastructure.tier1BadgeLabel")}
            </div>
            <h4 className="font-display font-bold text-base mb-2">
              {t("infrastructure.tier1Heading")}
            </h4>
            <p
              className={`font-body text-xs leading-relaxed ${isDark ? "text-[#8E9995]" : "text-[#4E5653]"}`}
            >
              {t("infrastructure.tier1Summary")}
            </p>
          </div>

          <div
            id="infrastructure-compliance"
            className={`p-6 rounded-xl border ${
              isDark
                ? "bg-[#0A0D0F] border-[#189890]/40"
                : "bg-white border-[#189890] shadow-xs"
            }`}
          >
            <div className="text-[10px] font-mono font-bold text-[#189890] uppercase mb-1">
              {t("infrastructure.tier2BadgeLabel")}
            </div>
            <h4 className="font-display font-bold text-base mb-2 text-[#189890]">
              {t("infrastructure.tier2Heading")}
            </h4>
            <p
              className={`font-body text-xs leading-relaxed ${isDark ? "text-[#8E9995]" : "text-[#4E5653]"}`}
            >
              {t("infrastructure.tier2Summary")}
            </p>
          </div>

          <div
            id="infrastructure-custody"
            className={`p-6 rounded-xl border ${
              isDark
                ? "bg-[#0A0D0F] border-[rgba(245,247,246,0.08)]"
                : "bg-white border-[rgba(10,13,12,0.08)] shadow-xs"
            }`}
          >
            <div className="text-[10px] font-mono font-bold text-[#189890] uppercase mb-1">
              {t("infrastructure.tier3BadgeLabel")}
            </div>
            <h4 className="font-display font-bold text-base mb-2">
              {t("infrastructure.tier3Heading")}
            </h4>
            <p
              className={`font-body text-xs leading-relaxed ${isDark ? "text-[#8E9995]" : "text-[#4E5653]"}`}
            >
              {t("infrastructure.tier3Summary")}
            </p>
            <div className="flex flex-wrap gap-2 mt-3 text-[10px] font-mono text-[#8E9995]">
              <span id="infrastructure-banks">
                {t("infrastructure.tags.banks")}
              </span>{" "}
              •{" "}
              <span id="infrastructure-brokers">
                {t("infrastructure.tags.brokers")}
              </span>{" "}
              •{" "}
              <span id="infrastructure-settlement">
                {t("infrastructure.tags.settlement")}
              </span>{" "}
              •{" "}
              <span id="infrastructure-liquidity">
                {t("infrastructure.tags.liquidity")}
              </span>{" "}
              •{" "}
              <span id="infrastructure-market-data">
                {t("infrastructure.tags.marketData")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React from "react";
import {
  Database,
  Landmark,
  Building,
  Lock,
  ShieldCheck,
  PieChart,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { FlowWrapper } from "@/components/flow/FlowWrapper";
import {
  CentralCoreNode,
  ModuleNode,
  PipelineStageNode,
} from "@/components/flow/CustomNodes";
import { createArchitectureEdge } from "@/components/flow/edgeUtils";
import { Node, Edge } from "@xyflow/react";

interface NewCategoryProps {
  isDark?: boolean;
}

const nodeTypes = {
  centralCore: CentralCoreNode,
  moduleNode: ModuleNode,
  pipelineStage: PipelineStageNode,
};

export const NewCategory: React.FC<NewCategoryProps> = ({ isDark = false }) => {
  const { t } = useTranslation(["home", "common"]);

  // Institutional architecture topology:
  // CAPITAL (top) -> ELLEVA (center) -> FINANCIAL SYSTEM (bottom)
  // Left Column (Data, Banks, Brokers) -> Elleva
  // Right Column (Custody, Compliance, Portfolios) -> Elleva
  const flowNodes: Node[] = [
    // Top: CAPITAL (X: 350, Y: 15)
    {
      id: "cat-capital",
      type: "pipelineStage",
      position: { x: 350, y: 15 },
      data: {
        stageNumber: t("newCategory.flow.capitalStage"),
        label: t("newCategory.flow.capitalLabel"),
        description: t("newCategory.flow.capitalDesc"),
        isDark,
        minWidth: "220px",
      },
    },
    // Center: ELLEVA INTELLIGENCE + ORCHESTRATION (X: 330, Y: 140)
    {
      id: "cat-elleva",
      type: "centralCore",
      position: { x: 330, y: 140 },
      data: {
        title: "ELLEVA",
        subtitle: t("newCategory.flow.ellevaSubtitle"),
        caption: t("newCategory.flow.ellevaCaption"),
        isDark,
        minWidth: "260px",
      },
    },
    // Bottom: FINANCIAL SYSTEM (X: 330, Y: 300)
    {
      id: "cat-system",
      type: "pipelineStage",
      position: { x: 330, y: 300 },
      data: {
        stageNumber: t("newCategory.flow.systemStage"),
        label: t("newCategory.flow.systemLabel"),
        description: t("newCategory.flow.systemDesc"),
        isDark,
        minWidth: "260px",
      },
    },
    // Left Column: DATA, BANKS, BROKERS (X: 70)
    {
      id: "cat-data",
      type: "moduleNode",
      position: { x: 70, y: 40 },
      data: {
        label: t("newCategory.modules.data"),
        subtext: t("newCategory.modules.dataSub"),
        icon: <Database className="w-3.5 h-3.5" />,
        isDark,
      },
    },
    {
      id: "cat-banks",
      type: "moduleNode",
      position: { x: 70, y: 150 },
      data: {
        label: t("newCategory.modules.banks"),
        subtext: t("newCategory.modules.banksSub"),
        icon: <Landmark className="w-3.5 h-3.5" />,
        isDark,
      },
    },
    {
      id: "cat-brokers",
      type: "moduleNode",
      position: { x: 70, y: 260 },
      data: {
        label: t("newCategory.modules.brokers"),
        subtext: t("newCategory.modules.brokersSub"),
        icon: <Building className="w-3.5 h-3.5" />,
        isDark,
      },
    },
    // Right Column: CUSTODY, COMPLIANCE, PORTFOLIOS (X: 680)
    {
      id: "cat-custody",
      type: "moduleNode",
      position: { x: 680, y: 40 },
      data: {
        label: t("newCategory.modules.custody"),
        subtext: t("newCategory.modules.custodySub"),
        icon: <Lock className="w-3.5 h-3.5" />,
        isDark,
      },
    },
    {
      id: "cat-compliance",
      type: "moduleNode",
      position: { x: 680, y: 150 },
      data: {
        label: t("newCategory.modules.compliance"),
        subtext: t("newCategory.modules.complianceSub"),
        icon: <ShieldCheck className="w-3.5 h-3.5" />,
        isDark,
      },
    },
    {
      id: "cat-portfolios",
      type: "moduleNode",
      position: { x: 680, y: 260 },
      data: {
        label: t("newCategory.modules.portfolios"),
        subtext: t("newCategory.modules.portfoliosSub"),
        icon: <PieChart className="w-3.5 h-3.5" />,
        isDark,
      },
    },
  ];

  // Refined architectural edges:
  // Dominant vertical backbone: CAPITAL -> ELLEVA -> FINANCIAL SYSTEM
  // Discrete, balanced horizontal routing corridors for side modules
  const flowEdges: Edge[] = [
    // Dominant vertical highway: CAPITAL -> ELLEVA
    createArchitectureEdge({
      id: "ec-cap-ell",
      source: "cat-capital",
      target: "cat-elleva",
      sourceHandle: "bottom-src",
      targetHandle: "top-center",
      type: "default",
      strokeWidth: 2,
      isDark,
    }),
    // Dominant vertical highway: ELLEVA -> FINANCIAL SYSTEM
    createArchitectureEdge({
      id: "ec-ell-sys",
      source: "cat-elleva",
      target: "cat-system",
      sourceHandle: "bottom-center-src",
      targetHandle: "top",
      type: "default",
      strokeWidth: 2,
      isDark,
    }),
    // Left Peripherals -> Elleva (dedicated left handles)
    createArchitectureEdge({
      id: "ec-data-ell",
      source: "cat-data",
      target: "cat-elleva",
      sourceHandle: "right-src",
      targetHandle: "left-top",
      strokeWidth: 1.4,
      isDark,
    }),
    createArchitectureEdge({
      id: "ec-banks-ell",
      source: "cat-banks",
      target: "cat-elleva",
      sourceHandle: "right-src",
      targetHandle: "left-middle",
      strokeWidth: 1.4,
      isDark,
    }),
    createArchitectureEdge({
      id: "ec-brokers-ell",
      source: "cat-brokers",
      target: "cat-elleva",
      sourceHandle: "right-src",
      targetHandle: "left-bottom",
      strokeWidth: 1.4,
      isDark,
    }),
    // Right Peripherals -> Elleva (dedicated right handles)
    createArchitectureEdge({
      id: "ec-cust-ell",
      source: "cat-custody",
      target: "cat-elleva",
      sourceHandle: "left-src",
      targetHandle: "right-top",
      strokeWidth: 1.4,
      isDark,
    }),
    createArchitectureEdge({
      id: "ec-comp-ell",
      source: "cat-compliance",
      target: "cat-elleva",
      sourceHandle: "left-src",
      targetHandle: "right-middle",
      strokeWidth: 1.4,
      isDark,
    }),
    createArchitectureEdge({
      id: "ec-port-ell",
      source: "cat-portfolios",
      target: "cat-elleva",
      sourceHandle: "left-src",
      targetHandle: "right-bottom",
      strokeWidth: 1.4,
      isDark,
    }),
  ];

  const peripheralModules = [
    {
      label: t("newCategory.modules.data"),
      desc: t("newCategory.modules.dataDesc"),
    },
    {
      label: t("newCategory.modules.banks"),
      desc: t("newCategory.modules.banksDesc"),
    },
    {
      label: t("newCategory.modules.brokers"),
      desc: t("newCategory.modules.brokersDesc"),
    },
    {
      label: t("newCategory.modules.custody"),
      desc: t("newCategory.modules.custodyDesc"),
    },
    {
      label: t("newCategory.modules.compliance"),
      desc: t("newCategory.modules.complianceDesc"),
    },
    {
      label: t("newCategory.modules.portfolios"),
      desc: t("newCategory.modules.portfoliosDesc"),
    },
  ];

  return (
    <section
      id="new-category"
      className={`py-20 sm:py-28 border-t border-black/[0.04] dark:border-white/5 transition-colors duration-300 ${
        isDark ? "bg-[#050607] text-[#F5F7F6]" : "bg-[#F7F8F6] text-[#0A0D0C]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="type-section-title mb-4">{t("newCategory.title")}</h2>
          <p
            className={`type-body ${isDark ? "text-[#8E9995]" : "text-[#4E5653]"}`}
          >
            {t("newCategory.description")}
          </p>
        </div>

        {/* React Flow Conceptual Map */}
        <div className="mb-10">
          <FlowWrapper
            nodes={flowNodes}
            edges={flowEdges}
            nodeTypes={nodeTypes}
            isDark={isDark}
            heightClass="h-[440px] sm:h-[480px]"
            badgeLabel={t("newCategory.topologyBadge")}
            fitPadding={0.15}
          />
        </div>

        {/* Peripheral Modules Explanation */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {peripheralModules.map((item) => (
            <div
              key={item.label}
              className={`p-3.5 rounded-lg border text-center ${
                isDark
                  ? "bg-[#0A0D0F] border-[rgba(245,247,246,0.06)]"
                  : "bg-white border-[rgba(10,13,12,0.06)] shadow-xs"
              }`}
            >
              <div className="text-[11px] font-ui font-bold text-[#189890]">
                {item.label}
              </div>
              <div
                className={`text-[10px] mt-0.5 ${isDark ? "text-[#8E9995]" : "text-[#4E5653]"}`}
              >
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

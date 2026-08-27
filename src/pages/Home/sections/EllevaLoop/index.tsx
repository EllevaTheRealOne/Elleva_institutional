import React from "react";
import { useTranslation } from "react-i18next";
import { FlowWrapper } from "@/components/flow/FlowWrapper";
import {
  CentralCoreNode,
  PipelineStageNode,
} from "@/components/flow/CustomNodes";
import { createArchitectureEdge } from "@/components/flow/edgeUtils";
import { Node, Edge } from "@xyflow/react";

interface EllevaLoopProps {
  isDark?: boolean;
}

const nodeTypes = {
  centralCore: CentralCoreNode,
  pipelineStage: PipelineStageNode,
};

const loopLayout = {
  center: { x: 460, y: 250 },
  radius: 190,
  cardWidth: 180,
  cardHeight: 80,
};

export const EllevaLoop: React.FC<EllevaLoopProps> = ({ isDark = false }) => {
  const { t } = useTranslation(["home", "common"]);

  const cardPosition = (x: number, y: number) => ({
    x: x - loopLayout.cardWidth / 2,
    y: y - loopLayout.cardHeight / 2,
  });

  // Six stages at equal angular intervals around the central orchestration node.
  const loopNodes: Node[] = [
    {
      id: "loop-center",
      type: "centralCore",
      position: { x: loopLayout.center.x - 110, y: loopLayout.center.y - 40 },
      data: {
        title: t("ellevaLoop.nodes.center.title"),
        subtitle: t("ellevaLoop.nodes.center.subtitle"),
        caption: t("ellevaLoop.nodes.center.caption"),
        isDark,
        minWidth: "220px",
      },
    },
    {
      id: "loop-1",
      type: "pipelineStage",
      position: cardPosition(
        loopLayout.center.x,
        loopLayout.center.y - loopLayout.radius,
      ),
      data: {
        // stageNumber: '01',
        label: t("ellevaLoop.nodes.stage1.label"),
        description: t("ellevaLoop.nodes.stage1.desc"),
        isDark,
        minWidth: "180px",
      },
    },
    {
      id: "loop-2",
      type: "pipelineStage",
      position: cardPosition(
        loopLayout.center.x + (loopLayout.radius * Math.sqrt(3)) / 2,
        loopLayout.center.y - loopLayout.radius / 2,
      ),
      data: {
        // stageNumber: '02',
        label: t("ellevaLoop.nodes.stage2.label"),
        description: t("ellevaLoop.nodes.stage2.desc"),
        isDark,
        minWidth: "180px",
      },
    },
    {
      id: "loop-3",
      type: "pipelineStage",
      position: cardPosition(
        loopLayout.center.x + (loopLayout.radius * Math.sqrt(3)) / 2,
        loopLayout.center.y + loopLayout.radius / 2,
      ),
      data: {
        // stageNumber: '03',
        label: t("ellevaLoop.nodes.stage3.label"),
        description: t("ellevaLoop.nodes.stage3.desc"),
        isDark,
        minWidth: "180px",
      },
    },
    {
      id: "loop-4",
      type: "pipelineStage",
      position: cardPosition(
        loopLayout.center.x,
        loopLayout.center.y + loopLayout.radius,
      ),
      data: {
        // stageNumber: '04',
        label: t("ellevaLoop.nodes.stage4.label"),
        description: t("ellevaLoop.nodes.stage4.desc"),
        isDark,
        minWidth: "180px",
      },
    },
    {
      id: "loop-5",
      type: "pipelineStage",
      position: cardPosition(
        loopLayout.center.x - (loopLayout.radius * Math.sqrt(3)) / 2,
        loopLayout.center.y + loopLayout.radius / 2,
      ),
      data: {
        // stageNumber: '05',
        label: t("ellevaLoop.nodes.stage5.label"),
        description: t("ellevaLoop.nodes.stage5.desc"),
        isDark,
        minWidth: "180px",
      },
    },
    {
      id: "loop-6",
      type: "pipelineStage",
      position: cardPosition(
        loopLayout.center.x - (loopLayout.radius * Math.sqrt(3)) / 2,
        loopLayout.center.y - loopLayout.radius / 2,
      ),
      data: {
        // stageNumber: '06',
        label: t("ellevaLoop.nodes.stage6.label"),
        description: t("ellevaLoop.nodes.stage6.desc"),
        isDark,
        minWidth: "180px",
      },
    },
  ];

  // Directional handles keep each Bezier segment flowing around the circle.
  const loopEdges: Edge[] = [
    // 1 (Top Center) -> 2 (Top Right)
    createArchitectureEdge({
      id: "el-1-2",
      source: "loop-1",
      target: "loop-2",
      sourceHandle: "right-src",
      targetHandle: "left",
      strokeWidth: 1.6,
      isDark,
    }),
    // 2 (Top Right) -> 3 (Bottom Right)
    createArchitectureEdge({
      id: "el-2-3",
      source: "loop-2",
      target: "loop-3",
      sourceHandle: "bottom-src",
      targetHandle: "left",
      type: "default",
      strokeWidth: 1.6,
      isDark,
    }),
    // 3 (Bottom Right) -> 4 (Bottom Center)
    createArchitectureEdge({
      id: "el-3-4",
      source: "loop-3",
      target: "loop-4",
      sourceHandle: "left-src",
      targetHandle: "right",
      strokeWidth: 1.6,
      isDark,
    }),
    // 4 (Bottom Center) -> 5 (Bottom Left)
    createArchitectureEdge({
      id: "el-4-5",
      source: "loop-4",
      target: "loop-5",
      sourceHandle: "left-src",
      targetHandle: "right",
      strokeWidth: 1.6,
      isDark,
    }),
    // 5 (Bottom Left) -> 6 (Top Left)
    createArchitectureEdge({
      id: "el-5-6",
      source: "loop-5",
      target: "loop-6",
      sourceHandle: "top-src",
      targetHandle: "right",
      type: "default",
      strokeWidth: 1.6,
      isDark,
    }),
    // 6 (Top Left) -> 1 (Top Center)
    createArchitectureEdge({
      id: "el-6-1",
      source: "loop-6",
      target: "loop-1",
      sourceHandle: "right-src",
      targetHandle: "left",
      strokeWidth: 1.6,
      isDark,
    }),
  ];

  const loopSteps = [
    t("ellevaLoop.steps.s1"),
    t("ellevaLoop.steps.s2"),
    t("ellevaLoop.steps.s3"),
    t("ellevaLoop.steps.s4"),
    t("ellevaLoop.steps.s5"),
    t("ellevaLoop.steps.s6"),
    t("ellevaLoop.steps.s1"),
  ];

  return (
    <section
      id="elleva-loop"
      className={`py-20 sm:py-28 border-t border-black/[0.04] dark:border-white/5 transition-colors duration-300 ${
        isDark ? "bg-[#050607] text-[#F5F7F6]" : "bg-[#F7F8F6] text-[#0A0D0C]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="type-section-title mb-4">{t("ellevaLoop.title")}</h2>
          <p
            className={`type-body ${isDark ? "text-[#8E9995]" : "text-[#4E5653]"}`}
          >
            {t("ellevaLoop.description")}
          </p>
        </div>

        {/* React Flow Loop Topology */}
        <div className="mb-12">
          <FlowWrapper
            nodes={loopNodes}
            edges={loopEdges}
            nodeTypes={nodeTypes}
            isDark={isDark}
            heightClass="h-[460px] sm:h-[500px]"
            badgeLabel={t("ellevaLoop.badge")}
            fitPadding={0.12}
          />
        </div>

        {/* Loop Progression Steps */}
        <div
          className={`p-6 sm:p-8 rounded-xl border ${
            isDark
              ? "bg-[#0A0D0F] border-[rgba(245,247,246,0.08)]"
              : "bg-white border-[rgba(10,13,12,0.08)] shadow-xs"
          }`}
        >
          <div className="text-[10px] font-ui uppercase tracking-widest text-[#8E9995] font-semibold mb-4 text-center">
            {t("ellevaLoop.flywheelTitle")}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-ui font-semibold">
            {loopSteps.map((step, idx) => (
              <React.Fragment key={idx}>
                <span
                  className={`px-3 py-1.5 rounded-sm border ${
                    idx === loopSteps.length - 1
                      ? "bg-[#189890]/15 border-[#189890] text-[#189890]"
                      : isDark
                        ? "bg-[#0E1214] border-white/5 text-[#F5F7F6]"
                        : "bg-[#F7F8F6] border-black/[0.06] text-[#0A0D0C]"
                  }`}
                >
                  {step}
                </span>
                {idx < loopSteps.length - 1 && (
                  <span className="text-[#189890] font-mono opacity-40">→</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

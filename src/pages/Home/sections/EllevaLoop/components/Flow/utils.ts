import { Node, Edge } from "@xyflow/react";
import { createLoopEdge } from "./edge";
import {
  LOOP_POSITIONS,
  LOOP_CARD_WIDTH,
  LOOP_CORE_WIDTH,
} from "./constants";

export function getLoopNodes(
  t: (key: string) => string,
  isDark: boolean,
): Node[] {
  return [
    // Center: Motor Elleva / KERNEL CONTÍNUO (No direct edge connections)
    {
      id: "loop-center",
      type: "centralCore",
      position: LOOP_POSITIONS.center,
      data: {
        title: t("ellevaLoop.nodes.center.title"),
        subtitle: t("ellevaLoop.nodes.center.subtitle"),
        caption: t("ellevaLoop.nodes.center.caption"),
        isDark,
        width: LOOP_CORE_WIDTH,
      },
    },

    // Outer Circular Loop - 6 Stages
    // 1. Pesquisa (Top Center)
    {
      id: "loop-1",
      type: "pipelineStage",
      position: LOOP_POSITIONS.stage1,
      data: {
        label: t("ellevaLoop.nodes.stage1.label"),
        description: t("ellevaLoop.nodes.stage1.desc"),
        isDark,
        width: LOOP_CARD_WIDTH,
      },
    },
    // 2. Decidir (Top Right)
    {
      id: "loop-2",
      type: "pipelineStage",
      position: LOOP_POSITIONS.stage2,
      data: {
        label: t("ellevaLoop.nodes.stage2.label"),
        description: t("ellevaLoop.nodes.stage2.desc"),
        isDark,
        width: LOOP_CARD_WIDTH,
      },
    },
    // 3. Verificação de Risco (Bottom Right)
    {
      id: "loop-3",
      type: "pipelineStage",
      position: LOOP_POSITIONS.stage3,
      data: {
        label: t("ellevaLoop.nodes.stage3.label"),
        description: t("ellevaLoop.nodes.stage3.desc"),
        isDark,
        width: LOOP_CARD_WIDTH,
      },
    },
    // 4. Executar (Bottom Center)
    {
      id: "loop-4",
      type: "pipelineStage",
      position: LOOP_POSITIONS.stage4,
      data: {
        label: t("ellevaLoop.nodes.stage4.label"),
        description: t("ellevaLoop.nodes.stage4.desc"),
        isDark,
        width: LOOP_CARD_WIDTH,
      },
    },
    // 5. Liquidar (Bottom Left)
    {
      id: "loop-5",
      type: "pipelineStage",
      position: LOOP_POSITIONS.stage5,
      data: {
        label: t("ellevaLoop.nodes.stage5.label"),
        description: t("ellevaLoop.nodes.stage5.desc"),
        isDark,
        width: LOOP_CARD_WIDTH,
      },
    },
    // 6. Monitorar (Top Left)
    {
      id: "loop-6",
      type: "pipelineStage",
      position: LOOP_POSITIONS.stage6,
      data: {
        label: t("ellevaLoop.nodes.stage6.label"),
        description: t("ellevaLoop.nodes.stage6.desc"),
        isDark,
        width: LOOP_CARD_WIDTH,
      },
    },
  ];
}

export function getLoopEdges(isDark: boolean): Edge[] {
  return [
    // 1 (Top Center: Pesquisa) -> 2 (Top Right: Decidir)
    createLoopEdge({
      id: "el-1-2",
      source: "loop-1",
      target: "loop-2",
      sourceHandle: "bottom-src",
      targetHandle: "left",
      type: "loopCurved",
      strokeWidth: 1.5,
      dashed: true,
      animated: true,
      arrow: true,
      isDark,
    }),

    // 2 (Top Right: Decidir) -> 3 (Bottom Right: Verificação de Risco)
    createLoopEdge({
      id: "el-2-3",
      source: "loop-2",
      target: "loop-3",
      sourceHandle: "left-src",
      targetHandle: "left",
      type: "loopCurved",
      strokeWidth: 1.5,
      dashed: true,
      animated: true,
      arrow: true,
      isDark,
    }),

    // 3 (Bottom Right: Verificação de Risco) -> 4 (Bottom Center: Executar)
    createLoopEdge({
      id: "el-3-4",
      source: "loop-3",
      target: "loop-4",
      sourceHandle: "left-src",
      targetHandle: "top",
      type: "loopCurved",
      strokeWidth: 1.5,
      dashed: true,
      animated: true,
      arrow: true,
      isDark,
    }),

    // 4 (Bottom Center: Executar) -> 5 (Bottom Left: Liquidar)
    createLoopEdge({
      id: "el-4-5",
      source: "loop-4",
      target: "loop-5",
      sourceHandle: "top-src",
      targetHandle: "right",
      type: "loopCurved",
      strokeWidth: 1.5,
      dashed: true,
      animated: true,
      arrow: true,
      isDark,
    }),

    // 5 (Bottom Left: Liquidar) -> 6 (Top Left: Monitorar)
    createLoopEdge({
      id: "el-5-6",
      source: "loop-5",
      target: "loop-6",
      sourceHandle: "right-src",
      targetHandle: "right",
      type: "loopCurved",
      strokeWidth: 1.5,
      dashed: true,
      animated: true,
      arrow: true,
      isDark,
    }),

    // 6 (Top Left: Monitorar) -> 1 (Top Center: Pesquisa)
    createLoopEdge({
      id: "el-6-1",
      source: "loop-6",
      target: "loop-1",
      sourceHandle: "right-src",
      targetHandle: "bottom",
      type: "loopCurved",
      strokeWidth: 1.5,
      dashed: true,
      animated: true,
      arrow: true,
      isDark,
    }),
  ];
}


import { Node, Edge } from "@xyflow/react";
import { createInfraEdge } from "./edge";
import {
  INFRA_POSITIONS,
  INFRA_CARD_TOP_WIDTH,
  INFRA_CARD_TOP_HEIGHT,
  INFRA_CORE_WIDTH,
  INFRA_CORE_HEIGHT,
  INFRA_CARD_BOT_WIDTH,
  INFRA_CARD_BOT_HEIGHT,
} from "./constants";

export function getInfraNodes(
  t: (key: string) => string,
  isDark: boolean,
): Node[] {
  return [
    // Layer 1 (Top - 2 cards adjusted size)
    {
      id: "stack-top-1",
      type: "pipelineStage",
      position: INFRA_POSITIONS.top1,
      data: {
        stageNumber: t("infrastructure.tier1Badge"),
        label: t("infrastructure.tier1LeftTitle"),
        description: t("infrastructure.tier1LeftDesc"),
        isDark,
        width: INFRA_CARD_TOP_WIDTH,
        minHeight: `${INFRA_CARD_TOP_HEIGHT}px`,
      },
    },
    {
      id: "stack-top-2",
      type: "pipelineStage",
      position: INFRA_POSITIONS.top2,
      data: {
        stageNumber: t("infrastructure.tier1Badge"),
        label: t("infrastructure.tier1RightTitle"),
        description: t("infrastructure.tier1RightDesc"),
        isDark,
        width: INFRA_CARD_TOP_WIDTH,
        minHeight: `${INFRA_CARD_TOP_HEIGHT}px`,
      },
    },

    // Layer 2 (Middle - Elleva Autonomous Layer)
    {
      id: "stack-middle",
      type: "centralCore",
      position: INFRA_POSITIONS.middle,
      data: {
        title: "ELLEVA AUTONOMOUS LAYER",
        subtitle: t("infrastructure.middleSubtitle"),
        caption: t("infrastructure.middleCaption"),
        isDark,
        width: INFRA_CORE_WIDTH,
        minHeight: `${INFRA_CORE_HEIGHT}px`,
      },
    },

    // Layer 3 (Bottom - 3 cards adjusted size)
    {
      id: "stack-bot-1",
      type: "pipelineStage",
      position: INFRA_POSITIONS.bot1,
      data: {
        stageNumber: t("infrastructure.tier3Badge"),
        label: t("infrastructure.tier3CustodyTitle"),
        description: t("infrastructure.tier3CustodyDesc"),
        isDark,
        width: INFRA_CARD_BOT_WIDTH,
        minHeight: `${INFRA_CARD_BOT_HEIGHT}px`,
      },
    },
    {
      id: "stack-bot-2",
      type: "pipelineStage",
      position: INFRA_POSITIONS.bot2,
      data: {
        stageNumber: t("infrastructure.tier3Badge"),
        label: t("infrastructure.tier3BanksTitle"),
        description: t("infrastructure.tier3BanksDesc"),
        isDark,
        width: INFRA_CARD_BOT_WIDTH,
        minHeight: `${INFRA_CARD_BOT_HEIGHT}px`,
      },
    },
    {
      id: "stack-bot-3",
      type: "pipelineStage",
      position: INFRA_POSITIONS.bot3,
      data: {
        stageNumber: t("infrastructure.tier3Badge"),
        label: t("infrastructure.tier3BrokersTitle"),
        description: t("infrastructure.tier3BrokersDesc"),
        isDark,
        width: INFRA_CARD_BOT_WIDTH,
        minHeight: `${INFRA_CARD_BOT_HEIGHT}px`,
      },
    },
  ];
}

export function getInfraEdges(isDark: boolean): Edge[] {
  return [
    createInfraEdge({
      id: "es-top1-mid",
      source: "stack-top-1",
      target: "stack-middle",
      isDark,
      dashed: true,
    }),
    createInfraEdge({
      id: "es-top2-mid",
      source: "stack-top-2",
      target: "stack-middle",
      isDark,
      dashed: true,
    }),
    createInfraEdge({
      id: "es-mid-bot1",
      source: "stack-middle",
      target: "stack-bot-1",
      isDark,
      dashed: true,
    }),
    createInfraEdge({
      id: "es-mid-bot2",
      source: "stack-middle",
      target: "stack-bot-2",
      isDark,
      dashed: true,
    }),
    createInfraEdge({
      id: "es-mid-bot3",
      source: "stack-middle",
      target: "stack-bot-3",
      isDark,
      dashed: true,
    }),
  ];
}


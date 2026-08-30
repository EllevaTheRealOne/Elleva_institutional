import React from "react";
import { Node, Edge } from "@xyflow/react";
import {
  Database,
  Landmark,
  Building,
  Lock,
  ShieldCheck,
  PieChart,
} from "lucide-react";
import { createNewCategoryEdge } from "./edge";
import { NEW_CATEGORY_POSITIONS, NEW_CATEGORY_CARD_WIDTHS } from "./constants";

export function getNewCategoryNodes(
  t: (key: string) => string,
  isDark: boolean,
): Node[] {
  const { capital, elleva, system, left, right } = NEW_CATEGORY_POSITIONS;

  return [
    // Top: CAPITAL (Center Column)
    {
      id: "cat-capital",
      type: "pipelineStage",
      position: capital,
      data: {
        stageNumber: t("newCategory.flow.capitalStage"),
        label: t("newCategory.flow.capitalLabel"),
        description: t("newCategory.flow.capitalDesc"),
        isDark,
        width: NEW_CATEGORY_CARD_WIDTHS.center,
      },
    },

    // Center: ELLEVA INTELLIGENCE + ORCHESTRATION (Center Column)
    {
      id: "cat-elleva",
      type: "centralCore",
      position: elleva,
      data: {
        title: "ELLEVA",
        subtitle: t("newCategory.flow.ellevaSubtitle"),
        caption: t("newCategory.flow.ellevaCaption"),
        isDark,
        width: NEW_CATEGORY_CARD_WIDTHS.center,
      },
    },

    // Bottom: FINANCIAL SYSTEM (Center Column)
    {
      id: "cat-system",
      type: "pipelineStage",
      position: system,
      data: {
        stageNumber: t("newCategory.flow.systemStage"),
        label: t("newCategory.flow.systemLabel"),
        description: t("newCategory.flow.systemDesc"),
        isDark,
        width: NEW_CATEGORY_CARD_WIDTHS.center,
      },
    },

    // Left Column: DATA, BANKS, BROKERS (Fixed Width)
    {
      id: "cat-data",
      type: "moduleNode",
      position: left.data,
      data: {
        label: t("newCategory.modules.data"),
        subtext: t("newCategory.modules.dataSub"),
        icon: React.createElement(Database, { className: "w-3.5 h-3.5" }),
        isDark,
        width: NEW_CATEGORY_CARD_WIDTHS.side,
      },
    },
    {
      id: "cat-banks",
      type: "moduleNode",
      position: left.banks,
      data: {
        label: t("newCategory.modules.banks"),
        subtext: t("newCategory.modules.banksSub"),
        icon: React.createElement(Landmark, { className: "w-3.5 h-3.5" }),
        isDark,
        width: NEW_CATEGORY_CARD_WIDTHS.side,
      },
    },
    {
      id: "cat-brokers",
      type: "moduleNode",
      position: left.brokers,
      data: {
        label: t("newCategory.modules.brokers"),
        subtext: t("newCategory.modules.brokersSub"),
        icon: React.createElement(Building, { className: "w-3.5 h-3.5" }),
        isDark,
        width: NEW_CATEGORY_CARD_WIDTHS.side,
      },
    },

    // Right Column: CUSTODY, COMPLIANCE, PORTFOLIOS (Fixed Width)
    {
      id: "cat-custody",
      type: "moduleNode",
      position: right.custody,
      data: {
        label: t("newCategory.modules.custody"),
        subtext: t("newCategory.modules.custodySub"),
        icon: React.createElement(Lock, { className: "w-3.5 h-3.5" }),
        isDark,
        width: NEW_CATEGORY_CARD_WIDTHS.side,
      },
    },
    {
      id: "cat-compliance",
      type: "moduleNode",
      position: right.compliance,
      data: {
        label: t("newCategory.modules.compliance"),
        subtext: t("newCategory.modules.complianceSub"),
        icon: React.createElement(ShieldCheck, { className: "w-3.5 h-3.5" }),
        isDark,
        width: NEW_CATEGORY_CARD_WIDTHS.side,
      },
    },
    {
      id: "cat-portfolios",
      type: "moduleNode",
      position: right.portfolios,
      data: {
        label: t("newCategory.modules.portfolios"),
        subtext: t("newCategory.modules.portfoliosSub"),
        icon: React.createElement(PieChart, { className: "w-3.5 h-3.5" }),
        isDark,
        width: NEW_CATEGORY_CARD_WIDTHS.side,
      },
    },
  ];
}

export function getNewCategoryEdges(isDark: boolean): Edge[] {
  return [
    // Top Highway (vertical reta e maior): CAPITAL -> ELLEVA
    createNewCategoryEdge({
      id: "ec-cap-ell",
      source: "cat-capital",
      target: "cat-elleva",
      sourceHandle: "bottom-src",
      targetHandle: "top-center",
      type: "straight",
      strokeWidth: 2,
      dashed: true,
      arrow: true,
      isDark,
    }),
    // Bottom Highway (vertical reta e maior): ELLEVA -> FINANCIAL SYSTEM
    createNewCategoryEdge({
      id: "ec-ell-sys",
      source: "cat-elleva",
      target: "cat-system",
      sourceHandle: "bottom-center-src",
      targetHandle: "top",
      type: "straight",
      strokeWidth: 2,
      dashed: true,
      arrow: true,
      isDark,
    }),
    // Left Peripherals -> Elleva (curvas suaves e distâncias simétricas)
    createNewCategoryEdge({
      id: "ec-data-ell",
      source: "cat-data",
      target: "cat-elleva",
      sourceHandle: "right-src",
      targetHandle: "left-top",
      type: "default",
      strokeWidth: 1.5,
      dashed: true,
      arrow: true,
      isDark,
    }),
    createNewCategoryEdge({
      id: "ec-banks-ell",
      source: "cat-banks",
      target: "cat-elleva",
      sourceHandle: "right-src",
      targetHandle: "left-middle",
      type: "straight",
      strokeWidth: 1.5,
      dashed: true,
      arrow: true,
      isDark,
    }),
    createNewCategoryEdge({
      id: "ec-brokers-ell",
      source: "cat-brokers",
      target: "cat-elleva",
      sourceHandle: "right-src",
      targetHandle: "left-bottom",
      type: "default",
      strokeWidth: 1.5,
      dashed: true,
      arrow: true,
      isDark,
    }),
    // Right Peripherals -> Elleva (curvas suaves e distâncias simétricas)
    createNewCategoryEdge({
      id: "ec-cust-ell",
      source: "cat-custody",
      target: "cat-elleva",
      sourceHandle: "left-src",
      targetHandle: "right-top",
      type: "default",
      strokeWidth: 1.5,
      dashed: true,
      arrow: true,
      isDark,
    }),
    createNewCategoryEdge({
      id: "ec-comp-ell",
      source: "cat-compliance",
      target: "cat-elleva",
      sourceHandle: "left-src",
      targetHandle: "right-middle",
      type: "straight",
      strokeWidth: 1.5,
      dashed: true,
      arrow: true,
      isDark,
    }),
    createNewCategoryEdge({
      id: "ec-port-ell",
      source: "cat-portfolios",
      target: "cat-elleva",
      sourceHandle: "left-src",
      targetHandle: "right-bottom",
      type: "default",
      strokeWidth: 1.5,
      dashed: true,
      arrow: true,
      isDark,
    }),
  ];
}

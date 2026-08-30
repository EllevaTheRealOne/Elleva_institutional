import React from "react";
import { Node, Edge } from "@xyflow/react";
import {
  Database,
  PieChart,
  Landmark,
  Lock,
  Building,
  ShieldCheck,
  FileSpreadsheet,
  Users,
} from "lucide-react";
import { createArchitectureEdge } from "./edge";
import {
  ARCH_CORE_POSITION,
  ARCH_LEFT_POSITIONS,
  ARCH_RIGHT_POSITIONS,
  ARCH_SIDE_WIDTH,
  ARCH_CORE_WIDTH,
} from "./constants";

export function getArchitectureNodes(
  t: (key: string) => string,
  isDark: boolean,
): Node[] {
  return [
    // Center: ELLEVA CAMADA DE INTELIGÊNCIA E ORQUESTRAÇÃO
    {
      id: "arch-core",
      type: "centralCore",
      position: ARCH_CORE_POSITION,
      data: {
        title: "ELLEVA",
        subtitle: t("architecture.flow.coreSubtitle"),
        caption: t("architecture.flow.coreCaption"),
        isDark,
        width: ARCH_CORE_WIDTH,
      },
    },

    // Left Column: Dados de Mercado, Mandatos e Portfólios, Custódia Qualificada, Verificação Custodial
    {
      id: "arch-data",
      type: "moduleNode",
      position: ARCH_LEFT_POSITIONS.data,
      data: {
        label: t("architecture.flow.marketDataLabel"),
        subtext: t("architecture.flow.marketDataSub"),
        icon: React.createElement(Database, { className: "w-3.5 h-3.5" }),
        isDark,
        width: ARCH_SIDE_WIDTH,
      },
    },
    {
      id: "arch-portfolios",
      type: "moduleNode",
      position: ARCH_LEFT_POSITIONS.portfolios,
      data: {
        label: t("architecture.flow.portfoliosLabel"),
        subtext: t("architecture.flow.portfoliosSub"),
        icon: React.createElement(PieChart, { className: "w-3.5 h-3.5" }),
        isDark,
        width: ARCH_SIDE_WIDTH,
      },
    },
    {
      id: "arch-banks",
      type: "moduleNode",
      position: ARCH_LEFT_POSITIONS.banks,
      data: {
        label: t("architecture.flow.banksLabel"),
        subtext: t("architecture.flow.banksSub"),
        icon: React.createElement(Landmark, { className: "w-3.5 h-3.5" }),
        isDark,
        width: ARCH_SIDE_WIDTH,
      },
    },
    {
      id: "arch-custody",
      type: "moduleNode",
      position: ARCH_LEFT_POSITIONS.custody,
      data: {
        label: t("architecture.flow.custodyLabel"),
        subtext: t("architecture.flow.custodySub"),
        icon: React.createElement(Lock, { className: "w-3.5 h-3.5" }),
        isDark,
        width: ARCH_SIDE_WIDTH,
      },
    },

    // Right Column: Corretoras e Ambientes, Motor de Compliance, Auditoria e Telemetria, Family Offices e Wealth
    {
      id: "arch-brokers",
      type: "moduleNode",
      position: ARCH_RIGHT_POSITIONS.brokers,
      data: {
        label: t("architecture.flow.brokersLabel"),
        subtext: t("architecture.flow.brokersSub"),
        icon: React.createElement(Building, { className: "w-3.5 h-3.5" }),
        isDark,
        width: ARCH_SIDE_WIDTH,
      },
    },
    {
      id: "arch-compliance",
      type: "moduleNode",
      position: ARCH_RIGHT_POSITIONS.compliance,
      data: {
        label: t("architecture.flow.complianceLabel"),
        subtext: t("architecture.flow.complianceSub"),
        icon: React.createElement(ShieldCheck, { className: "w-3.5 h-3.5" }),
        isDark,
        width: ARCH_SIDE_WIDTH,
      },
    },
    {
      id: "arch-reports",
      type: "moduleNode",
      position: ARCH_RIGHT_POSITIONS.reports,
      data: {
        label: t("architecture.flow.reportsLabel"),
        subtext: t("architecture.flow.reportsSub"),
        icon: React.createElement(FileSpreadsheet, { className: "w-3.5 h-3.5" }),
        isDark,
        width: ARCH_SIDE_WIDTH,
      },
    },
    {
      id: "arch-family-offices",
      type: "moduleNode",
      position: ARCH_RIGHT_POSITIONS.familyOffices,
      data: {
        label: t("architecture.flow.familyOfficesLabel"),
        subtext: t("architecture.flow.familyOfficesSub"),
        icon: React.createElement(Users, { className: "w-3.5 h-3.5" }),
        isDark,
        width: ARCH_SIDE_WIDTH,
      },
    },
  ];
}

export function getArchitectureEdges(isDark: boolean): Edge[] {
  return [
    // 4 Left Inflow Lines -> Dedicated Left Handles on Elleva Core
    createArchitectureEdge({
      id: "ea-data",
      source: "arch-data",
      target: "arch-core",
      sourceHandle: "right-src",
      targetHandle: "left-top",
      type: "default",
      strokeWidth: 1.5,
      dashed: true,
      arrow: true,
      isDark,
    }),
    createArchitectureEdge({
      id: "ea-port",
      source: "arch-portfolios",
      target: "arch-core",
      sourceHandle: "right-src",
      targetHandle: "left-mid-top",
      type: "default",
      strokeWidth: 1.5,
      dashed: true,
      arrow: true,
      isDark,
    }),
    createArchitectureEdge({
      id: "ea-banks",
      source: "arch-banks",
      target: "arch-core",
      sourceHandle: "right-src",
      targetHandle: "left-mid-bottom",
      type: "default",
      strokeWidth: 1.5,
      dashed: true,
      arrow: true,
      isDark,
    }),
    createArchitectureEdge({
      id: "ea-cust",
      source: "arch-custody",
      target: "arch-core",
      sourceHandle: "right-src",
      targetHandle: "left-bottom",
      type: "default",
      strokeWidth: 1.5,
      dashed: true,
      arrow: true,
      isDark,
    }),

    // 4 Elleva Core Outflow Lines -> Dedicated Right Module Nodes
    createArchitectureEdge({
      id: "ea-brok",
      source: "arch-core",
      target: "arch-brokers",
      sourceHandle: "right-top-src",
      targetHandle: "left",
      type: "default",
      strokeWidth: 1.5,
      dashed: true,
      arrow: true,
      isDark,
    }),
    createArchitectureEdge({
      id: "ea-comp",
      source: "arch-core",
      target: "arch-compliance",
      sourceHandle: "right-mid-top-src",
      targetHandle: "left",
      type: "default",
      strokeWidth: 1.5,
      dashed: true,
      arrow: true,
      isDark,
    }),
    createArchitectureEdge({
      id: "ea-rep",
      source: "arch-core",
      target: "arch-reports",
      sourceHandle: "right-mid-bottom-src",
      targetHandle: "left",
      type: "default",
      strokeWidth: 1.5,
      dashed: true,
      arrow: true,
      isDark,
    }),
    createArchitectureEdge({
      id: "ea-fo",
      source: "arch-core",
      target: "arch-family-offices",
      sourceHandle: "right-bottom-src",
      targetHandle: "left",
      type: "default",
      strokeWidth: 1.5,
      dashed: true,
      arrow: true,
      isDark,
    }),
  ];
}

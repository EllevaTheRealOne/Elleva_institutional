import React from "react";
import { BaseEdge, EdgeProps, EdgeTypes, MarkerType, Edge } from "@xyflow/react";

export interface LoopEdgeOptions {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
  isDark?: boolean;
  animated?: boolean;
  type?: string;
  strokeWidth?: number;
  dashed?: boolean;
  arrow?: boolean;
}

export const LoopCurvedEdge: React.FC<EdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  style,
  markerEnd,
}) => {
  let edgePath = "";

  if (id === "el-1-2") {
    // 1. Pesquisa (bottom) -> 2. Decidir (left)
    // Swoop down-right in an organic concave arc
    const dx = targetX - sourceX;
    const dy = targetY - sourceY;
    const cp1X = sourceX + dx * 0.28;
    const cp1Y = sourceY + dy * 0.9;
    const cp2X = sourceX + dx * 0.72;
    const cp2Y = targetY;
    edgePath = `M ${sourceX} ${sourceY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${targetX} ${targetY}`;
  } else if (id === "el-2-3") {
    // 2. Decidir (left) -> 3. Verificação de Risco (left)
    // Inward arc to the left (bowing towards center box)
    const dy = targetY - sourceY;
    const cp1X = sourceX - 100;
    const cp1Y = sourceY + dy * 0.2;
    const cp2X = targetX - 100;
    const cp2Y = targetY - dy * 0.2;
    edgePath = `M ${sourceX} ${sourceY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${targetX} ${targetY}`;
  } else if (id === "el-3-4") {
    // 3. Verificação de Risco (left) -> 4. Executar (top)
    // Swoop down-left in an organic concave arc
    const dx = targetX - sourceX;
    const dy = targetY - sourceY;
    const cp1X = sourceX + dx * 0.28;
    const cp1Y = sourceY;
    const cp2X = sourceX + dx * 0.72;
    const cp2Y = sourceY + dy * 0.1;
    edgePath = `M ${sourceX} ${sourceY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${targetX} ${targetY}`;
  } else if (id === "el-4-5") {
    // 4. Executar (top) -> 5. Liquidar (right)
    // Swoop up-left in an organic concave arc
    const dx = targetX - sourceX;
    const dy = targetY - sourceY;
    const cp1X = sourceX + dx * 0.28;
    const cp1Y = sourceY + dy * 0.9;
    const cp2X = sourceX + dx * 0.72;
    const cp2Y = targetY;
    edgePath = `M ${sourceX} ${sourceY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${targetX} ${targetY}`;
  } else if (id === "el-5-6") {
    // 5. Liquidar (right) -> 6. Monitorar (right)
    // Inward arc to the right (bowing towards center box)
    const dy = targetY - sourceY;
    const cp1X = sourceX + 100;
    const cp1Y = sourceY + dy * 0.2;
    const cp2X = targetX + 100;
    const cp2Y = targetY - dy * 0.2;
    edgePath = `M ${sourceX} ${sourceY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${targetX} ${targetY}`;
  } else if (id === "el-6-1") {
    // 6. Monitorar (right) -> 1. Pesquisa (bottom)
    // Swoop up-right in an organic concave arc
    const dx = targetX - sourceX;
    const dy = targetY - sourceY;
    const cp1X = sourceX + dx * 0.28;
    const cp1Y = sourceY;
    const cp2X = sourceX + dx * 0.72;
    const cp2Y = sourceY + dy * 0.1;
    edgePath = `M ${sourceX} ${sourceY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${targetX} ${targetY}`;
  } else {
    edgePath = `M ${sourceX} ${sourceY} L ${targetX} ${targetY}`;
  }

  return <BaseEdge id={id} path={edgePath} style={style} markerEnd={markerEnd} />;
};

export const loopEdgeTypes: EdgeTypes = {
  loopCurved: LoopCurvedEdge,
  default: LoopCurvedEdge,
};

export function createLoopEdge({
  id,
  source,
  target,
  sourceHandle,
  targetHandle,
  isDark = false,
  animated = true,
  type = "loopCurved",
  strokeWidth = 1.5,
  dashed = true,
  arrow = true,
}: LoopEdgeOptions): Edge {
  const color = isDark ? "#189890" : "#0C5F5A";
  const baseStyle = {
    stroke: color,
    strokeWidth,
    strokeDasharray: dashed ? "4 4" : undefined,
  };
  const markerEnd = arrow
    ? {
        type: MarkerType.ArrowClosed,
        color,
        width: 12,
        height: 12,
      }
    : undefined;

  return {
    id,
    source,
    target,
    sourceHandle,
    targetHandle,
    type,
    animated,
    style: baseStyle,
    markerEnd,
  };
}


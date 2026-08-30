import { BuiltInEdge, MarkerType } from "@xyflow/react";

export interface InfraEdgeOptions {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
  isDark?: boolean;
  animated?: boolean;
  type?: "default" | "smoothstep" | "straight" | "step";
  strokeWidth?: number;
  dashed?: boolean;
  arrow?: boolean;
}

export function createInfraEdge({
  id,
  source,
  target,
  sourceHandle,
  targetHandle,
  isDark = false,
  animated = true,
  type = "default",
  strokeWidth = 1.8,
  dashed = false,
  arrow = true,
}: InfraEdgeOptions): BuiltInEdge {
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

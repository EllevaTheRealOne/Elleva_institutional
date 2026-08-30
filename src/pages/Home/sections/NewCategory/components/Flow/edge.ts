import { BuiltInEdge, MarkerType } from "@xyflow/react";

export interface NewCategoryEdgeOptions {
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

export function createNewCategoryEdge({
  id,
  source,
  target,
  sourceHandle,
  targetHandle,
  isDark = false,
  animated = true,
  type = "default",
  strokeWidth = 1.6,
  dashed = true,
  arrow = true,
}: NewCategoryEdgeOptions): BuiltInEdge {
  const color = isDark ? "#189890" : "#0C5F5A";
  const baseStyle = {
    stroke: color,
    strokeWidth,
    strokeDasharray: dashed ? "5 5" : undefined,
  };
  const markerEnd = arrow
    ? {
        type: MarkerType.ArrowClosed,
        color,
        width: 14,
        height: 14,
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

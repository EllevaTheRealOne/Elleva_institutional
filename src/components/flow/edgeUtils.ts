import { BuiltInEdge, MarkerType } from '@xyflow/react';

export interface ArchitectureEdgeOptions {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
  isDark?: boolean;
  animated?: boolean;
  type?: 'default' | 'smoothstep' | 'straight' | 'step';
  strokeWidth?: number;
  dashed?: boolean;
  arrow?: boolean;
  borderRadius?: number;
  offset?: number;
}

/**
 * Creates an engineered, institutional architecture edge with strict handle bindings,
 * clean Bezier routing, and crisp subtle arrowheads.
 */
export function createArchitectureEdge({
  id,
  source,
  target,
  sourceHandle,
  targetHandle,
  isDark = false,
  animated = true,
  type = 'default',
  strokeWidth = 1.5,
  dashed = false,
  arrow = true,
  borderRadius = 6,
  offset = 18,
}: ArchitectureEdgeOptions): BuiltInEdge {
  const color = isDark ? '#189890' : '#0C5F5A';
  const baseStyle = {
    stroke: color,
    strokeWidth,
    strokeDasharray: dashed ? '4 4' : undefined,
  };
  const markerEnd = arrow
    ? {
        type: MarkerType.ArrowClosed,
        color,
        width: 12,
        height: 12,
      }
    : undefined;

  if (type === 'straight') {
    return {
      id,
      source,
      target,
      sourceHandle,
      targetHandle,
      type: 'straight',
      animated,
      style: baseStyle,
      markerEnd,
    };
  }

  if (type === 'step') {
    return {
      id,
      source,
      target,
      sourceHandle,
      targetHandle,
      type: 'step',
      animated,
      style: baseStyle,
      markerEnd,
    };
  }

  return {
    id,
    source,
    target,
    sourceHandle,
    targetHandle,
    type: 'default',
    animated,
    style: baseStyle,
    markerEnd,
  };
}

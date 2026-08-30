import React, { useCallback, useRef, useState, useEffect } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
  Node,
  Edge,
  NodeTypes,
  EdgeTypes,
  Background,
  BackgroundVariant,
  Viewport,
  useNodesState,
} from "@xyflow/react";
import { RotateCcw } from "lucide-react";
import { useTranslation } from "react-i18next";

interface FlowCanvasInnerProps {
  nodes: Node[];
  edges: Edge[];
  nodeTypes?: NodeTypes;
  edgeTypes?: EdgeTypes;
  isDark?: boolean;
  minZoom?: number;
  maxZoom?: number;
  badgeLabel?: string;
  fitPadding?: number;
}

const FlowCanvasInner: React.FC<FlowCanvasInnerProps> = ({
  nodes,
  edges,
  nodeTypes,
  edgeTypes,
  isDark = false,
  minZoom = 0.2,
  maxZoom = 1.25,
  badgeLabel,
  fitPadding = 0.12,
}) => {
  const { t } = useTranslation("common");
  const { fitView, setViewport, getViewport } = useReactFlow();
  const [interactiveNodes, setInteractiveNodes, onNodesChange] =
    useNodesState(nodes);
  const containerRef = useRef<HTMLDivElement>(null);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nodeResetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const initialNodesRef = useRef(
    nodes.map((node) => ({ ...node, position: { ...node.position } })),
  );
  const initialViewportRef = useRef<Viewport | null>(null);
  const isResettingRef = useRef(false);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    setInteractiveNodes((currentInteractiveNodes) => {
      const currentPositionsMap = new Map(
        currentInteractiveNodes.map((n) => [n.id, n.position]),
      );

      return nodes.map((node) => ({
        ...node,
        position: currentPositionsMap.get(node.id) || node.position,
      }));
    });

    initialNodesRef.current = nodes.map((node) => ({
      ...node,
      position: { ...node.position },
    }));
  }, [nodes, setInteractiveNodes]);

  const performFit = useCallback(
    (options?: { duration?: number }) => {
      const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
      const padding = isMobile ? 0.05 : fitPadding;
      fitView({
        duration: options?.duration ?? 0,
        padding,
        minZoom: isMobile ? 0.2 : minZoom,
      });
      requestAnimationFrame(() => {
        initialViewportRef.current = getViewport();
      });
    },
    [fitView, getViewport, fitPadding, minZoom],
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let frame: number | null = null;
    const scheduleFit = () => {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => performFit({ duration: 0 }));
    };

    const observer = new ResizeObserver(scheduleFit);
    observer.observe(container);
    scheduleFit();

    return () => {
      observer.disconnect();
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [performFit]);

  const scheduleViewportReset = useCallback(() => {
    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
      resetTimerRef.current = null;
    }

    resetTimerRef.current = setTimeout(() => {
      if (initialViewportRef.current) {
        isResettingRef.current = true;
        setViewport(initialViewportRef.current, { duration: 700 });
        setTimeout(() => {
          isResettingRef.current = false;
          setIsInteracting(false);
        }, 750);
      } else {
        performFit();
        setIsInteracting(false);
      }
    }, 1500);
  }, [setViewport, performFit]);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }
      if (nodeResetTimerRef.current) {
        clearTimeout(nodeResetTimerRef.current);
      }
    };
  }, []);

  const handleMoveStart = useCallback(() => {
    if (isResettingRef.current) return;
    setIsInteracting(true);
    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
      resetTimerRef.current = null;
    }
  }, []);

  const handleMoveEnd = useCallback(() => {
    if (isResettingRef.current) return;
    scheduleViewportReset();
  }, [scheduleViewportReset]);

  const scheduleNodeReset = useCallback(() => {
    if (nodeResetTimerRef.current) {
      clearTimeout(nodeResetTimerRef.current);
    }

    nodeResetTimerRef.current = setTimeout(() => {
      setInteractiveNodes(
        initialNodesRef.current.map((node) => ({
          ...node,
          position: { ...node.position },
        })),
      );
      setIsInteracting(false);
    }, 1500);
  }, [setInteractiveNodes]);

  const handleNodeDragStart = useCallback(() => {
    if (nodeResetTimerRef.current) {
      clearTimeout(nodeResetTimerRef.current);
      nodeResetTimerRef.current = null;
    }
    setIsInteracting(true);
  }, []);

  const handleNodeDragStop = useCallback(() => {
    scheduleNodeReset();
  }, [scheduleNodeReset]);

  const handleManualReset = () => {
    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
      resetTimerRef.current = null;
    }
    if (initialViewportRef.current) {
      isResettingRef.current = true;
      setViewport(initialViewportRef.current, { duration: 700 });
      setTimeout(() => {
        isResettingRef.current = false;
        setIsInteracting(false);
      }, 750);
    } else {
      performFit();
      setIsInteracting(false);
    }
    if (nodeResetTimerRef.current) {
      clearTimeout(nodeResetTimerRef.current);
      nodeResetTimerRef.current = null;
    }
    setInteractiveNodes(
      initialNodesRef.current.map((node) => ({
        ...node,
        position: { ...node.position },
      })),
    );
  };

  return (
    <div ref={containerRef} className="relative w-full h-full touch-pan-y">
      {badgeLabel && (
        <div className="absolute top-3 left-3 z-10 pointer-events-none max-w-[80%] sm:max-w-none">
          <div
            className={`px-2.5 py-1 rounded-sm border text-[10px] font-mono flex items-center gap-2 ${
              isDark
                ? "bg-[#0A0D0F]/90 border-[rgba(245,247,246,0.1)] text-[#F5F7F6]"
                : "bg-white/90 border-[rgba(10,13,12,0.08)] text-[#0A0D0C] shadow-xs"
            }`}
          >
            <span
              className={`${
                isInteracting
                  ? "w-1.5 h-1.5 rounded-full flex-shrink-0 bg-[#189890] animate-ping"
                  : "w-0 h-0 hidden bg-transparent"
              }`}
            />
            <span className="truncate">
              {isInteracting ? t("flow.activeExploration") : badgeLabel}
            </span>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={handleManualReset}
        title={t("flow.recenterTitle")}
        aria-label={t("flow.recenterTitle")}
        className={`absolute bottom-3 right-3 z-10 p-2 rounded-sm border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#189890] ${
          isDark
            ? "bg-[#0E1214] border-[rgba(245,247,246,0.1)] text-[#8E9995] hover:text-white hover:border-[#189890]"
            : "bg-white border-[rgba(10,13,12,0.08)] text-[#4E5653] hover:text-black hover:border-[#189890] shadow-xs"
        }`}
      >
        <RotateCcw className="w-3.5 h-3.5" />
      </button>

      <ReactFlow
        nodes={interactiveNodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onMoveStart={handleMoveStart}
        onMoveEnd={handleMoveEnd}
        onNodesChange={onNodesChange}
        onNodeDragStart={handleNodeDragStart}
        onNodeDragStop={handleNodeDragStop}
        nodesDraggable
        nodesConnectable={false}
        elementsSelectable={false}
        nodesFocusable={false}
        panOnDrag={false}
        panOnScroll={false}
        preventScrolling={false}
        zoomOnScroll={false}
        zoomOnPinch={true}
        zoomOnDoubleClick={false}
        minZoom={minZoom}
        maxZoom={maxZoom}
        proOptions={{ hideAttribution: true }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color={isDark ? "rgba(255,255,255,0.06)" : "rgba(10,13,12,0.06)"}
        />
      </ReactFlow>
    </div>
  );
};

export interface FlowWrapperProps {
  nodes: Node[];
  edges: Edge[];
  nodeTypes?: NodeTypes;
  edgeTypes?: EdgeTypes;
  isDark?: boolean;
  minZoom?: number;
  maxZoom?: number;
  heightClass?: string;
  badgeLabel?: string;
  fitPadding?: number;
}

export const FlowWrapper: React.FC<FlowWrapperProps> = ({
  nodes,
  edges,
  nodeTypes,
  edgeTypes,
  isDark = false,
  minZoom = 0.2,
  maxZoom = 1.25,
  heightClass = "h-[440px] sm:h-[480px]",
  badgeLabel,
  fitPadding = 0.12,
}) => {
  return (
    <div
      className={`w-full ${heightClass} rounded-xl border relative overflow-hidden transition-all ${
        isDark
          ? "bg-[#0A0D0F] border-[rgba(245,247,246,0.08)]"
          : "bg-[#FFFFFF] border-[rgba(10,13,12,0.08)] shadow-xs"
      }`}
    >
      <ReactFlowProvider>
        <FlowCanvasInner
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          isDark={isDark}
          minZoom={minZoom}
          maxZoom={maxZoom}
          badgeLabel={badgeLabel}
          fitPadding={fitPadding}
        />
      </ReactFlowProvider>
    </div>
  );
};

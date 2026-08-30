import React from "react";
import { Handle, Position, NodeTypes } from "@xyflow/react";
import { LOOP_CARD_WIDTH, LOOP_CORE_WIDTH } from "./constants";

export interface CentralCoreNodeData {
  title?: string;
  subtitle?: string;
  caption?: string;
  isDark?: boolean;
  width?: number | string;
}

export interface PipelineStageNodeData {
  stageNumber?: string;
  label: string;
  description?: string;
  isDark?: boolean;
  width?: number | string;
}

export const LoopCentralCoreNode: React.FC<{ data: CentralCoreNodeData }> = ({ data }) => {
  const isDark = data.isDark;
  const width = data.width || LOOP_CORE_WIDTH;

  return (
    <div
      className={`relative px-5 py-4 rounded-sm border text-center select-none transition-all flex flex-col justify-center ${
        isDark
          ? "bg-[#0E1214] border-[#189890] shadow-sm text-white"
          : "bg-[#FFFFFF] border-[#189890] shadow-xs text-[#0A0D0C]"
      }`}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        minHeight: "108px",
      }}
    >

      <div className="flex items-center justify-center gap-1.5 mb-1">
        <span className="text-[11px] font-display font-semibold tracking-wider text-[#189890]">
          {data.title || "Motor Elleva"}
        </span>
      </div>
      <div className="text-[11.5px] font-ui font-semibold uppercase tracking-wider">
        {data.subtitle || "KERNEL CONTÍNUO"}
      </div>
      {data.caption && (
        <div
          className={`text-[10px] mt-1.5 font-body leading-relaxed max-w-[220px] mx-auto ${
            isDark ? "text-[#8E9995]" : "text-[#4E5653]"
          }`}
        >
          {data.caption}
        </div>
      )}
    </div>
  );
};

export const LoopPipelineStageNode: React.FC<{ data: PipelineStageNodeData }> = ({ data }) => {
  const isDark = data.isDark;
  const width = data.width || LOOP_CARD_WIDTH;

  return (
    <div
      className={`relative px-4 py-3 rounded-sm border text-left select-none transition-all flex flex-col justify-center ${
        isDark
          ? "bg-[#0A0D0F] border-[rgba(245,247,246,0.08)] text-[#F5F7F6]"
          : "bg-white border-[rgba(10,13,12,0.08)] text-[#0A0D0C] shadow-xs"
      }`}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        minHeight: "58px",
      }}
    >
      {/* Top handles */}
      <Handle
        id="top"
        type="target"
        position={Position.Top}
        style={{ left: "50%" }}
        className="opacity-0 !w-2 !h-2"
      />
      <Handle
        id="top-src"
        type="source"
        position={Position.Top}
        style={{ left: "50%" }}
        className="opacity-0 !w-2 !h-2"
      />

      {/* Right handles */}
      <Handle
        id="right"
        type="target"
        position={Position.Right}
        style={{ top: "50%" }}
        className="opacity-0 !w-2 !h-2"
      />
      <Handle
        id="right-src"
        type="source"
        position={Position.Right}
        style={{ top: "50%" }}
        className="opacity-0 !w-2 !h-2"
      />

      {/* Bottom handles */}
      <Handle
        id="bottom"
        type="target"
        position={Position.Bottom}
        style={{ left: "50%" }}
        className="opacity-0 !w-2 !h-2"
      />
      <Handle
        id="bottom-src"
        type="source"
        position={Position.Bottom}
        style={{ left: "50%" }}
        className="opacity-0 !w-2 !h-2"
      />

      {/* Left handles */}
      <Handle
        id="left"
        type="target"
        position={Position.Left}
        style={{ top: "50%" }}
        className="opacity-0 !w-2 !h-2"
      />
      <Handle
        id="left-src"
        type="source"
        position={Position.Left}
        style={{ top: "50%" }}
        className="opacity-0 !w-2 !h-2"
      />

      <div className="text-[11.5px] font-ui font-semibold tracking-tight leading-snug truncate">
        {data.label}
      </div>

      {data.description && (
        <div
          className={`text-[9.5px] leading-tight mt-0.5 truncate ${
            isDark ? "text-[#8E9995]" : "text-[#4E5653]"
          }`}
        >
          {data.description}
        </div>
      )}
    </div>
  );
};

export const loopNodeTypes: NodeTypes = {
  centralCore: LoopCentralCoreNode,
  pipelineStage: LoopPipelineStageNode,
};

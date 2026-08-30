import React from "react";
import { Handle, Position, NodeTypes } from "@xyflow/react";

export interface CentralCoreNodeData {
  title?: string;
  subtitle?: string;
  caption?: string;
  isDark?: boolean;
  width?: number | string;
  minWidth?: string;
  maxWidth?: string;
  minHeight?: string;
}

export interface PipelineStageNodeData {
  stageNumber?: string;
  label: string;
  description?: string;
  isDark?: boolean;
  minWidth?: string;
  width?: number | string;
  minHeight?: string;
}

export const InfraCentralCoreNode: React.FC<{ data: CentralCoreNodeData }> = ({ data }) => {
  const isDark = data.isDark;
  return (
    <div
      className={`relative px-5 py-4 rounded-sm border text-center select-none transition-all ${
        isDark
          ? "bg-[#0E1214] border-[#189890] shadow-sm text-white"
          : "bg-[#FFFFFF] border-[#189890] shadow-xs text-[#0A0D0C]"
      }`}
      style={{
        width: data.width || "360px",
        minWidth: data.minWidth || "340px",
        minHeight: data.minHeight || "104px",
      }}
    >
      <Handle
        id="top"
        type="target"
        position={Position.Top}
        className="opacity-0 !w-2 !h-2"
      />
      <Handle
        id="bottom-src"
        type="source"
        position={Position.Bottom}
        className="opacity-0 !w-2 !h-2"
      />

      <div className="flex items-center justify-center gap-1.5 mb-1">
        <span className="text-[11px] font-display font-semibold tracking-wider text-[#189890]">
          {data.title || "ELLEVA"}
        </span>
      </div>
      <div className="text-[11px] font-ui font-semibold uppercase tracking-wider">
        {data.subtitle || "AUTONOMOUS LAYER"}
      </div>
      {data.caption && (
        <div
          className={`text-[10px] mt-1 font-body ${
            isDark ? "text-[#8E9995]" : "text-[#4E5653]"
          }`}
        >
          {data.caption}
        </div>
      )}
    </div>
  );
};

export const InfraPipelineStageNode: React.FC<{ data: PipelineStageNodeData }> = ({ data }) => {
  const isDark = data.isDark;
  return (
    <div
      className={`relative px-4 py-3 rounded-sm border text-left select-none transition-all flex flex-col justify-start ${
        isDark
          ? "bg-[#0A0D0F] border-[rgba(245,247,246,0.08)] text-[#F5F7F6]"
          : "bg-white border-[rgba(10,13,12,0.08)] text-[#0A0D0C] shadow-xs"
      }`}
      style={{
        width: data.width || "auto",
        minWidth: data.minWidth || "180px",
        minHeight: data.minHeight || "auto",
      }}
    >
      <Handle
        id="top"
        type="target"
        position={Position.Top}
        className="opacity-0 !w-2 !h-2"
      />
      <Handle
        id="bottom-src"
        type="source"
        position={Position.Bottom}
        className="opacity-0 !w-2 !h-2"
      />

      <div className="flex items-center justify-between gap-2 mb-1">
        {data.stageNumber && (
          <span className="text-[10px] font-mono font-medium text-[#189890]">
            {data.stageNumber}
          </span>
        )}
      </div>

      <div className="text-[11.5px] font-ui font-semibold tracking-tight leading-snug">
        {data.label}
      </div>

      {data.description && (
        <div
          className={`text-[9.5px] leading-tight mt-1 ${
            isDark ? "text-[#8E9995]" : "text-[#4E5653]"
          }`}
        >
          {data.description}
        </div>
      )}
    </div>
  );
};

export const infraNodeTypes: NodeTypes = {
  centralCore: InfraCentralCoreNode,
  pipelineStage: InfraPipelineStageNode,
};

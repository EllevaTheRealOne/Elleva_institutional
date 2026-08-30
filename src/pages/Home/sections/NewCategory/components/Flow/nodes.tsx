import React from "react";
import { Handle, Position, NodeTypes } from "@xyflow/react";
import { NEW_CATEGORY_CARD_WIDTHS } from "./constants";

export interface CentralCoreNodeData {
  title?: string;
  subtitle?: string;
  caption?: string;
  isDark?: boolean;
  width?: number | string;
}

export interface ModuleNodeData {
  label: string;
  subtext?: string;
  icon?: React.ReactNode;
  isDark?: boolean;
  active?: boolean;
  width?: number | string;
}

export interface PipelineStageNodeData {
  stageNumber?: string;
  label: string;
  description?: string;
  isDark?: boolean;
  width?: number | string;
}

export const NewCategoryCentralCoreNode: React.FC<{ data: CentralCoreNodeData }> = ({
  data,
}) => {
  const isDark = data.isDark;
  const width = data.width || `${NEW_CATEGORY_CARD_WIDTHS.center}px`;

  return (
    <div
      className={`relative px-5 py-4 rounded-sm border text-center select-none transition-all flex flex-col justify-center ${
        isDark
          ? "bg-[#0E1214] border-[#189890] shadow-sm text-white"
          : "bg-[#FFFFFF] border-[#189890] shadow-xs text-[#0A0D0C]"
      }`}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        minHeight: "120px",
      }}
    >
      {/* Top handles */}
      <Handle
        id="top-center"
        type="target"
        position={Position.Top}
        className="opacity-0 !w-2 !h-2"
      />

      {/* Left handles */}
      <Handle
        id="left-top"
        type="target"
        position={Position.Left}
        style={{ top: "24%" }}
        className="opacity-0 !w-2 !h-2"
      />
      <Handle
        id="left-middle"
        type="target"
        position={Position.Left}
        style={{ top: "50%" }}
        className="opacity-0 !w-2 !h-2"
      />
      <Handle
        id="left-bottom"
        type="target"
        position={Position.Left}
        style={{ top: "76%" }}
        className="opacity-0 !w-2 !h-2"
      />

      {/* Card Content */}
      <div className="flex items-center justify-center gap-1.5 mb-1">
        <span className="text-[11px] font-display font-semibold tracking-wider text-[#189890]">
          {data.title || "ELLEVA"}
        </span>
      </div>
      <div className="text-[11.5px] font-ui font-semibold uppercase tracking-wider">
        {data.subtitle || "ORCHESTRATION"}
      </div>
      {data.caption && (
        <div
          className={`text-[10px] mt-1.5 font-body leading-relaxed max-w-[260px] mx-auto ${
            isDark ? "text-[#8E9995]" : "text-[#4E5653]"
          }`}
        >
          {data.caption}
        </div>
      )}

      {/* Right handles */}
      <Handle
        id="right-top"
        type="target"
        position={Position.Right}
        style={{ top: "24%" }}
        className="opacity-0 !w-2 !h-2"
      />
      <Handle
        id="right-middle"
        type="target"
        position={Position.Right}
        style={{ top: "50%" }}
        className="opacity-0 !w-2 !h-2"
      />
      <Handle
        id="right-bottom"
        type="target"
        position={Position.Right}
        style={{ top: "76%" }}
        className="opacity-0 !w-2 !h-2"
      />

      {/* Bottom handles */}
      <Handle
        id="bottom-center-src"
        type="source"
        position={Position.Bottom}
        className="opacity-0 !w-2 !h-2"
      />
    </div>
  );
};

export const NewCategoryModuleNode: React.FC<{ data: ModuleNodeData }> = ({
  data,
}) => {
  const isDark = data.isDark;
  const width = data.width || `${NEW_CATEGORY_CARD_WIDTHS.side}px`;

  return (
    <div
      className={`relative px-3.5 py-2.5 rounded-sm border text-left select-none transition-all flex items-center ${
        data.active
          ? isDark
            ? "bg-[#0E1214] border-[#189890] text-white shadow-xs"
            : "bg-white border-[#189890] text-[#0A0D0C] shadow-xs"
          : isDark
            ? "bg-[#0A0D0F] border-[rgba(245,247,246,0.08)] text-[#F5F7F6]"
            : "bg-white border-[rgba(10,13,12,0.08)] text-[#0A0D0C] shadow-xs"
      }`}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        minHeight: "56px",
      }}
    >
      <Handle
        id="left-src"
        type="source"
        position={Position.Left}
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

      <div className="flex items-center gap-2.5 w-full">
        {data.icon && (
          <div
            className={`p-1.5 rounded-sm shrink-0 flex items-center justify-center ${
              data.active
                ? "bg-[#0C5F5A] text-white"
                : isDark
                  ? "bg-white/5 text-[#189890]"
                  : "bg-[#D9F1EE] text-[#0C5F5A]"
            }`}
          >
            {data.icon}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="text-[11px] font-ui font-semibold tracking-tight leading-tight truncate">
            {data.label}
          </div>
          {data.subtext && (
            <div
              className={`text-[9.5px] leading-tight mt-0.5 truncate ${
                isDark ? "text-[#8E9995]" : "text-[#4E5653]"
              }`}
            >
              {data.subtext}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const NewCategoryPipelineStageNode: React.FC<{
  data: PipelineStageNodeData;
}> = ({ data }) => {
  const isDark = data.isDark;
  const width = data.width || `${NEW_CATEGORY_CARD_WIDTHS.center}px`;

  return (
    <div
      className={`relative px-4 py-3 rounded-sm border text-left select-none transition-all ${
        isDark
          ? "bg-[#0A0D0F] border-[rgba(245,247,246,0.08)] text-[#F5F7F6]"
          : "bg-white border-[rgba(10,13,12,0.08)] text-[#0A0D0C] shadow-xs"
      }`}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        minHeight: "76px",
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

      <div className="flex items-center justify-between gap-2 mb-0.5">
        {data.stageNumber && (
          <span className="text-[10px] font-mono font-medium text-[#189890] uppercase tracking-wider">
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

export const newCategoryNodeTypes: NodeTypes = {
  centralCore: NewCategoryCentralCoreNode,
  moduleNode: NewCategoryModuleNode,
  pipelineStage: NewCategoryPipelineStageNode,
};

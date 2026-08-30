import React from "react";
import { Handle, Position, NodeTypes } from "@xyflow/react";
import { DecorativeOrbits } from "@/components/DecorativeOrbits";
import { ARCH_CORE_WIDTH, ARCH_SIDE_WIDTH } from "./constants";

export interface CentralCoreNodeData {
  title?: string;
  subtitle?: string;
  caption?: string;
  isDark?: boolean;
  width?: number | string;
  minWidth?: string;
  maxWidth?: string;
  tag?: string;
}

export interface ModuleNodeData {
  label: string;
  subtext?: string;
  icon?: React.ReactNode;
  isDark?: boolean;
  active?: boolean;
  width?: number | string;
}

export const ArchitectureCentralCoreNode: React.FC<{ data: CentralCoreNodeData }> = ({ data }) => {
  const isDark = data.isDark;
  const width = data.width || ARCH_CORE_WIDTH;

  return (
    <div
      className={`relative px-5 py-4 rounded-sm border text-center select-none transition-all flex flex-col justify-center ${
        isDark
          ? "bg-[#0E1214] border-[#189890] shadow-sm text-white"
          : "bg-[#FFFFFF] border-[#189890] shadow-xs text-[#0A0D0C]"
      }`}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        minHeight: "124px",
      }}
    >
      <DecorativeOrbits isDark={isDark} />

      {/* Top handles */}
      <Handle
        id="top-center"
        type="target"
        position={Position.Top}
        style={{ left: "50%" }}
        className="opacity-0 !w-2 !h-2"
      />

      {/* Left Target handles for all 4 incoming left-side streams */}
      <Handle
        id="left-top"
        type="target"
        position={Position.Left}
        style={{ top: "16%" }}
        className="opacity-0 !w-2 !h-2"
      />
      <Handle
        id="left-mid-top"
        type="target"
        position={Position.Left}
        style={{ top: "38%" }}
        className="opacity-0 !w-2 !h-2"
      />
      <Handle
        id="left-mid-bottom"
        type="target"
        position={Position.Left}
        style={{ top: "62%" }}
        className="opacity-0 !w-2 !h-2"
      />
      <Handle
        id="left-bottom"
        type="target"
        position={Position.Left}
        style={{ top: "84%" }}
        className="opacity-0 !w-2 !h-2"
      />

      {/* Core Card Content */}
      <div className="flex items-center justify-center gap-1.5 mb-1">
        <span className="text-[11px] font-display font-semibold tracking-wider text-[#189890]">
          {data.title || "ELLEVA"}
        </span>
      </div>
      <div className="text-[11.5px] font-ui font-semibold uppercase tracking-wider">
        {data.subtitle || "CAMADA DE INTELIGÊNCIA E ORQUESTRAÇÃO"}
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

      {/* Right Source handles for all 4 outgoing right-side streams */}
      <Handle
        id="right-top-src"
        type="source"
        position={Position.Right}
        style={{ top: "16%" }}
        className="opacity-0 !w-2 !h-2"
      />
      <Handle
        id="right-mid-top-src"
        type="source"
        position={Position.Right}
        style={{ top: "38%" }}
        className="opacity-0 !w-2 !h-2"
      />
      <Handle
        id="right-mid-bottom-src"
        type="source"
        position={Position.Right}
        style={{ top: "62%" }}
        className="opacity-0 !w-2 !h-2"
      />
      <Handle
        id="right-bottom-src"
        type="source"
        position={Position.Right}
        style={{ top: "84%" }}
        className="opacity-0 !w-2 !h-2"
      />

      {/* Bottom handle */}
      <Handle
        id="bottom-center-src"
        type="source"
        position={Position.Bottom}
        style={{ left: "50%" }}
        className="opacity-0 !w-2 !h-2"
      />
    </div>
  );
};

export const ArchitectureModuleNode: React.FC<{ data: ModuleNodeData }> = ({ data }) => {
  const isDark = data.isDark;
  const width = data.width || ARCH_SIDE_WIDTH;

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
        id="left"
        type="target"
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

export const architectureNodeTypes: NodeTypes = {
  centralCore: ArchitectureCentralCoreNode,
  moduleNode: ArchitectureModuleNode,
};

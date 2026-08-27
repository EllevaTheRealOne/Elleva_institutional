import React from "react";
import { Handle, Position } from "@xyflow/react";
import { DecorativeOrbits } from "@/components/DecorativeOrbits";

/**
 * Central Elleva Orchestration Node
 * Provides multi-handle topology along Left, Right, Top, and Bottom borders
 * to enable deterministic, non-overlapping orthogonal routing.
 */
export const CentralCoreNode = ({ data }: { data: any }) => {
  const isDark = data.isDark;
  return (
    <div
      className={`relative px-5 py-4 rounded-sm border text-center select-none transition-all ${
        isDark
          ? "bg-[#0E1214] border-[#189890] shadow-sm text-white"
          : "bg-[#FFFFFF] border-[#189890] shadow-xs text-[#0A0D0C]"
      }`}
      style={{ minWidth: data.minWidth || "240px" }}
    >
      {data.DecorativeOrbits && <DecorativeOrbits isDark={isDark} />}

      {/* Top handles */}
      <Handle
        id="top-left"
        type="target"
        position={Position.Top}
        style={{ left: "25%" }}
        className="opacity-0 !w-2 !h-2"
      />
      <Handle
        id="top-center"
        type="target"
        position={Position.Top}
        style={{ left: "50%" }}
        className="opacity-0 !w-2 !h-2"
      />
      <Handle
        id="top-right"
        type="target"
        position={Position.Top}
        style={{ left: "75%" }}
        className="opacity-0 !w-2 !h-2"
      />

      {/* Top Source handles */}
      <Handle
        id="top-center-src"
        type="source"
        position={Position.Top}
        style={{ left: "50%" }}
        className="opacity-0 !w-2 !h-2"
      />

      {/* Left Target handles */}
      <Handle
        id="left-top"
        type="target"
        position={Position.Left}
        style={{ top: "22%" }}
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
        id="left-middle"
        type="target"
        position={Position.Left}
        style={{ top: "50%" }}
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
        style={{ top: "78%" }}
        className="opacity-0 !w-2 !h-2"
      />

      {/* Left Source handles */}
      <Handle
        id="left-top-src"
        type="source"
        position={Position.Left}
        style={{ top: "25%" }}
        className="opacity-0 !w-2 !h-2"
      />
      <Handle
        id="left-middle-src"
        type="source"
        position={Position.Left}
        style={{ top: "50%" }}
        className="opacity-0 !w-2 !h-2"
      />
      <Handle
        id="left-bottom-src"
        type="source"
        position={Position.Left}
        style={{ top: "75%" }}
        className="opacity-0 !w-2 !h-2"
      />

      {/* Card Content */}
      <div className="flex items-center justify-center gap-1.5 mb-1">
        <span className="text-[11px] font-display font-semibold tracking-wider text-[#189890]">
          {data.title || "ELLEVA"}
        </span>
      </div>
      <div className="text-[11px] font-ui font-semibold uppercase tracking-wider">
        {data.subtitle || "CAMADA OPERACIONAL AUTÔNOMA"}
      </div>
      {data.caption && (
        <div
          className={`text-[10px] mt-1 font-body ${isDark ? "text-[#8E9995]" : "text-[#4E5653]"}`}
        >
          {data.caption}
        </div>
      )}

      {/* Right Source handles */}
      <Handle
        id="right-top-src"
        type="source"
        position={Position.Right}
        style={{ top: "22%" }}
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
        id="right-middle-src"
        type="source"
        position={Position.Right}
        style={{ top: "50%" }}
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
        style={{ top: "78%" }}
        className="opacity-0 !w-2 !h-2"
      />

      {/* Right Target handles */}
      <Handle
        id="right-top"
        type="target"
        position={Position.Right}
        style={{ top: "25%" }}
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
        style={{ top: "75%" }}
        className="opacity-0 !w-2 !h-2"
      />

      {/* Bottom handles */}
      <Handle
        id="bottom-center-src"
        type="source"
        position={Position.Bottom}
        style={{ left: "50%" }}
        className="opacity-0 !w-2 !h-2"
      />
      <Handle
        id="bottom-left"
        type="target"
        position={Position.Bottom}
        style={{ left: "25%" }}
        className="opacity-0 !w-2 !h-2"
      />
      <Handle
        id="bottom-center"
        type="target"
        position={Position.Bottom}
        style={{ left: "50%" }}
        className="opacity-0 !w-2 !h-2"
      />
      <Handle
        id="bottom-right"
        type="target"
        position={Position.Bottom}
        style={{ left: "75%" }}
        className="opacity-0 !w-2 !h-2"
      />
    </div>
  );
};

/**
 * Standard Module Node (Institutions, Feeds, Protocols, Gateways)
 */
export const ModuleNode = ({ data }: { data: any }) => {
  const isDark = data.isDark;
  return (
    <div
      className={`relative px-3.5 py-2.5 rounded-sm border text-left select-none transition-all ${
        data.active
          ? isDark
            ? "bg-[#0E1214] border-[#189890] text-white shadow-xs"
            : "bg-white border-[#189890] text-[#0A0D0C] shadow-xs"
          : isDark
            ? "bg-[#0A0D0F] border-[rgba(245,247,246,0.08)] text-[#F5F7F6]"
            : "bg-white border-[rgba(10,13,12,0.08)] text-[#0A0D0C] shadow-xs"
      }`}
      style={{ minWidth: data.minWidth || "170px" }}
    >
      {/* Top handles */}
      <Handle
        id="top"
        type="target"
        position={Position.Top}
        className="opacity-0 !w-2 !h-2"
      />
      <Handle
        id="top-src"
        type="source"
        position={Position.Top}
        className="opacity-0 !w-2 !h-2"
      />

      {/* Left handles */}
      <Handle
        id="left"
        type="target"
        position={Position.Left}
        className="opacity-0 !w-2 !h-2"
      />
      <Handle
        id="left-src"
        type="source"
        position={Position.Left}
        className="opacity-0 !w-2 !h-2"
      />

      {/* Content */}
      <div className="flex items-center gap-2">
        {data.icon && (
          <div
            className={`p-1 rounded-sm shrink-0 ${
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
        <div>
          <div className="text-[11px] font-ui font-semibold tracking-tight leading-tight">
            {data.label}
          </div>
          {data.subtext && (
            <div
              className={`text-[9.5px] leading-tight mt-0.5 ${isDark ? "text-[#8E9995]" : "text-[#4E5653]"}`}
            >
              {data.subtext}
            </div>
          )}
        </div>
      </div>

      {/* Bottom handles */}
      <Handle
        id="bottom"
        type="target"
        position={Position.Bottom}
        className="opacity-0 !w-2 !h-2"
      />
      <Handle
        id="bottom-src"
        type="source"
        position={Position.Bottom}
        className="opacity-0 !w-2 !h-2"
      />

      {/* Right handles */}
      <Handle
        id="right"
        type="target"
        position={Position.Right}
        className="opacity-0 !w-2 !h-2"
      />
      <Handle
        id="right-src"
        type="source"
        position={Position.Right}
        className="opacity-0 !w-2 !h-2"
      />
    </div>
  );
};

/**
 * Pipeline Stage Node (used in sequential/loop diagrams)
 */
export const PipelineStageNode = ({ data }: { data: any }) => {
  const isDark = data.isDark;
  return (
    <div
      className={`relative px-4 py-3 rounded-sm border text-center select-none transition-all ${
        data.highlight
          ? isDark
            ? "bg-[#0E1214] border-[#189890]"
            : "bg-white border-[#189890] shadow-xs"
          : isDark
            ? "bg-[#0A0D0F] border-[rgba(245,247,246,0.08)]"
            : "bg-white border-[rgba(10,13,12,0.08)] shadow-xs"
      }`}
      style={{ minWidth: data.minWidth || "150px" }}
    >
      <Handle
        id="top"
        type="target"
        position={Position.Top}
        className="opacity-0 !w-2 !h-2"
      />
      <Handle
        id="top-src"
        type="source"
        position={Position.Top}
        className="opacity-0 !w-2 !h-2"
      />

      <Handle
        id="left"
        type="target"
        position={Position.Left}
        className="opacity-0 !w-2 !h-2"
      />
      <Handle
        id="left-src"
        type="source"
        position={Position.Left}
        className="opacity-0 !w-2 !h-2"
      />

      <div className="text-[9px] font-mono uppercase tracking-widest text-[#189890] font-semibold mb-0.5">
        {data.stageNumber}
      </div>
      <div className="text-xs font-ui font-semibold tracking-tight">
        {data.label}
      </div>
      {data.description && (
        <div
          className={`text-[10px] font-body mt-0.5 leading-tight ${isDark ? "text-[#8E9995]" : "text-[#4E5653]"}`}
        >
          {data.description}
        </div>
      )}

      <Handle
        id="bottom"
        type="target"
        position={Position.Bottom}
        className="opacity-0 !w-2 !h-2"
      />
      <Handle
        id="bottom-src"
        type="source"
        position={Position.Bottom}
        className="opacity-0 !w-2 !h-2"
      />

      <Handle
        id="right"
        type="target"
        position={Position.Right}
        className="opacity-0 !w-2 !h-2"
      />
      <Handle
        id="right-src"
        type="source"
        position={Position.Right}
        className="opacity-0 !w-2 !h-2"
      />
    </div>
  );
};

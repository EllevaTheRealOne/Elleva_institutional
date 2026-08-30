import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { FlowWrapper } from "./wrapper";
import { loopNodeTypes } from "./nodes";
import { loopEdgeTypes } from "./edge";
import { getLoopNodes, getLoopEdges } from "./utils";

export interface EllevaLoopFlowProps {
  isDark?: boolean;
}

export const EllevaLoopFlow: React.FC<EllevaLoopFlowProps> = ({
  isDark = false,
}) => {
  const { t } = useTranslation(["home", "common"]);

  const nodes = useMemo(() => getLoopNodes(t, isDark), [t, isDark]);
  const edges = useMemo(() => getLoopEdges(isDark), [isDark]);

  return (
    <FlowWrapper
      nodes={nodes}
      edges={edges}
      nodeTypes={loopNodeTypes}
      edgeTypes={loopEdgeTypes}
      isDark={isDark}
      heightClass="h-[460px] sm:h-[500px]"
      badgeLabel={t("ellevaLoop.badge")}
      fitPadding={0.12}
    />
  );
};

export * from "./nodes";
export * from "./edge";
export * from "./wrapper";
export * from "./constants";
export * from "./utils";

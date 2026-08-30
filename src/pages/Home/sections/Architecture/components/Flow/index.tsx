import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { FlowWrapper } from "./wrapper";
import { architectureNodeTypes } from "./nodes";
import { getArchitectureNodes, getArchitectureEdges } from "./utils";

export interface ArchitectureFlowProps {
  isDark?: boolean;
}

export const ArchitectureFlow: React.FC<ArchitectureFlowProps> = ({
  isDark = false,
}) => {
  const { t } = useTranslation(["home", "common"]);

  const nodes = useMemo(
    () => getArchitectureNodes(t, isDark),
    [t, isDark],
  );
  const edges = useMemo(() => getArchitectureEdges(isDark), [isDark]);

  return (
    <FlowWrapper
      nodes={nodes}
      edges={edges}
      nodeTypes={architectureNodeTypes}
      isDark={isDark}
      heightClass="h-[520px] sm:h-[560px]"
      badgeLabel={t("architecture.flowBadge")}
      fitPadding={0.12}
    />
  );
};

export * from "./nodes";
export * from "./edge";
export * from "./wrapper";
export * from "./constants";
export * from "./utils";

import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { FlowWrapper } from "./wrapper";
import { infraNodeTypes } from "./nodes";
import { getInfraNodes, getInfraEdges } from "./utils";

export interface ModernFinancialInfrastructureFlowProps {
  isDark?: boolean;
}

export const ModernFinancialInfrastructureFlow: React.FC<
  ModernFinancialInfrastructureFlowProps
> = ({ isDark = false }) => {
  const { t } = useTranslation(["home", "common"]);

  const nodes = useMemo(() => getInfraNodes(t, isDark), [t, isDark]);
  const edges = useMemo(() => getInfraEdges(isDark), [isDark]);

  return (
    <FlowWrapper
      nodes={nodes}
      edges={edges}
      nodeTypes={infraNodeTypes}
      isDark={isDark}
      heightClass="h-[480px] sm:h-[520px]"
      badgeLabel={t("infrastructure.flowBadge")}
      fitPadding={0.15}
    />
  );
};

export * from "./nodes";
export * from "./edge";
export * from "./wrapper";
export * from "./constants";
export * from "./utils";

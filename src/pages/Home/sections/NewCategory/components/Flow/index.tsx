import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { FlowWrapper } from "./wrapper";
import { newCategoryNodeTypes } from "./nodes";
import { getNewCategoryNodes, getNewCategoryEdges } from "./utils";

export interface NewCategoryFlowProps {
  isDark?: boolean;
}

export const NewCategoryFlow: React.FC<NewCategoryFlowProps> = ({
  isDark = false,
}) => {
  const { t } = useTranslation(["home", "common"]);

  const nodes = useMemo(() => getNewCategoryNodes(t, isDark), [t, isDark]);
  const edges = useMemo(() => getNewCategoryEdges(isDark), [isDark]);

  return (
    <FlowWrapper
      nodes={nodes}
      edges={edges}
      nodeTypes={newCategoryNodeTypes}
      isDark={isDark}
      heightClass="h-[520px] sm:h-[580px] lg:h-[600px]"
      badgeLabel={t("newCategory.topologyBadge")}
      fitPadding={0.12}
    />
  );
};

export * from "./nodes";
export * from "./edge";
export * from "./wrapper";
export * from "./constants";
export * from "./utils";

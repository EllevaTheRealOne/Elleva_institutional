function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

export const PATH_PAGE = {
  home: "/",
  businessPlan: "/business-plan",
} as const;

/**
 * The route key the navigation is configured by: the first path segment after
 * the language prefix, or "home" for the root.
 */
export const ROUTE_KEY = {
  home: "home",
  businessPlan: "business-plan",
} as const;

export type RouteKey = (typeof ROUTE_KEY)[keyof typeof ROUTE_KEY];

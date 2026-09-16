import { NavLinkItem, NavLinksMap, NavSubItem } from "@/types/navigation.types";
import { PATH_PAGE, ROUTE_KEY } from "@/constants/routes/routes.constants";

/**
 * The five home categories. Their targets are hashes on the home page; on any
 * other route they are rewritten to "/#hash" so the click navigates home first.
 */
const homeCategories: NavLinkItem[] = [
  {
    label: "Platform",
    key: "categories.platform.label",
    items: [
      {
        label: "Overview",
        href: "#hero",
        key: "categories.platform.items.overview",
      },
      {
        label: "The Product",
        href: "#product",
        key: "categories.platform.items.theProduct",
      },
      {
        label: "Investment Experience",
        href: "#investment-experience",
        key: "categories.platform.items.investmentExperience",
      },
      {
        label: "Investment Intelligence",
        href: "#investment-intelligence",
        key: "categories.platform.items.investmentIntelligence",
      },
      {
        label: "Research → Decide → Execute → Monitor",
        href: "#product-research",
        key: "categories.platform.items.operatingLoop",
      },
      {
        label: "Architecture",
        href: "#architecture",
        key: "categories.platform.items.architecture",
      },
    ],
  },
  {
    label: "Markets",
    key: "categories.markets.label",
    items: [
      {
        label: "Global Markets",
        href: "#global-markets",
        key: "categories.markets.items.globalMarkets",
      },
      {
        label: "Market Opportunity",
        href: "#market-opportunity",
        key: "categories.markets.items.marketOpportunity",
      },
      {
        label: "Portfolio Intelligence",
        href: "#portfolio-overview",
        key: "categories.markets.items.portfolioIntelligence",
      },
      {
        label: "Liquidity",
        href: "#liquidity",
        key: "categories.markets.items.liquidity",
      },
      {
        label: "Market Data",
        href: "#market-data",
        key: "categories.markets.items.marketData",
      },
    ],
  },
  {
    label: "Technology",
    key: "categories.technology.label",
    items: [
      {
        label: "AI Infrastructure",
        href: "#technology",
        key: "categories.technology.items.aiInfrastructure",
      },
      {
        label: "Financial Infrastructure",
        href: "#financial-infrastructure",
        key: "categories.technology.items.financialInfrastructure",
      },
      {
        label: "Web3 Infrastructure",
        href: "#web3",
        key: "categories.technology.items.web3Infrastructure",
      },
      {
        label: "Security & Governance",
        href: "#security",
        key: "categories.technology.items.securityGovernance",
      },
      {
        label: "Transparency",
        href: "#transparency",
        key: "categories.technology.items.transparency",
      },
    ],
  },
  {
    label: "Ecosystem",
    key: "categories.ecosystem.label",
    items: [
      {
        label: "Architecture",
        href: "#architecture",
        key: "categories.ecosystem.items.ecosystemOverview",
      },
      {
        label: "Banks",
        href: "#banks",
        key: "categories.ecosystem.items.banks",
      },
      {
        label: "Brokers & Execution",
        href: "#brokers",
        key: "categories.ecosystem.items.brokersExecution",
      },
      {
        label: "Custody",
        href: "#custody",
        key: "categories.ecosystem.items.custody",
      },
      {
        label: "Compliance",
        href: "#compliance",
        key: "categories.ecosystem.items.compliance",
      },
      {
        label: "Family Offices & Wealth Managers",
        href: "#wealth",
        key: "categories.ecosystem.items.familyOfficesWealth",
      },
    ],
  },
  {
    label: "Company",
    key: "categories.company.label",
    items: [
      {
        label: "Our Vision",
        href: "#vision",
        key: "categories.company.items.ourVision",
      },
      {
        label: "The New Software",
        href: "#new-software",
        key: "categories.company.items.theNewSoftware",
      },
      {
        label: "Business Model",
        href: "#business-model",
        key: "categories.company.items.businessModel",
      },
      {
        label: "Elleva Loop",
        href: "#elleva-loop",
        key: "categories.company.items.ellevaLoop",
      },
      {
        label: "Defensibility",
        href: "#advantage",
        key: "categories.company.items.competitiveAdvantage",
      },
      {
        label: "FAQ",
        href: "#faq",
        key: "categories.company.items.faq",
      },
    ],
  },
];

/** The sections of the Business Plan page, in page order. */
const businessPlanSections: NavSubItem[] = [
  {
    label: "What is Elleva",
    href: "#overview",
    key: "categories.businessPlan.items.overview",
  },
  {
    label: "The Problem",
    href: "#problem",
    key: "categories.businessPlan.items.problem",
  },
  {
    label: "Market Progression",
    href: "#market",
    key: "categories.businessPlan.items.market",
  },
  {
    label: "How It Works",
    href: "#how-it-works",
    key: "categories.businessPlan.items.howItWorks",
  },
  {
    label: "Brokers",
    href: "#brokers",
    key: "categories.businessPlan.items.brokers",
  },
  {
    label: "Client Back Office",
    href: "#back-office",
    key: "categories.businessPlan.items.backOffice",
  },
  {
    label: "Our Purpose",
    href: "#purpose",
    key: "categories.businessPlan.items.purpose",
  },
  {
    label: "Elleva Partners",
    href: "#partners",
    key: "categories.businessPlan.items.partners",
  },
  {
    label: "Connected Client",
    href: "#connected-client",
    key: "categories.businessPlan.items.connectedClient",
  },
  {
    label: "Partner Framework",
    href: "#framework",
    key: "categories.businessPlan.items.framework",
  },
  {
    label: "Diversification",
    href: "#diversification",
    key: "categories.businessPlan.items.diversification",
  },
  {
    label: "Contract Acceleration",
    href: "#contract-acceleration",
    key: "categories.businessPlan.items.contractAcceleration",
  },
  {
    label: "Next Steps",
    href: "#next-steps",
    key: "categories.businessPlan.items.nextSteps",
  },
];

const businessPlanLabel = {
  label: "Business Plan",
  key: "categories.businessPlan.label",
};

/** Points a hash target at another route: "#faq" on "/" becomes "/#faq". */
const onRoute = (route: string, items: NavLinkItem[]): NavLinkItem[] =>
  items.map((item) => ({
    ...item,
    href: item.href?.startsWith("#") ? `${route}${item.href}` : item.href,
    items: item.items?.map((sub) => ({
      ...sub,
      href: sub.href.startsWith("#") ? `${route}${sub.href}` : sub.href,
    })),
  }));

export const navLinks: NavLinksMap = {
  [ROUTE_KEY.home]: [
    ...homeCategories,
    { ...businessPlanLabel, href: PATH_PAGE.businessPlan },
  ],
  [ROUTE_KEY.businessPlan]: [
    { ...businessPlanLabel, items: businessPlanSections },
    ...onRoute(PATH_PAGE.home, homeCategories),
  ],
};

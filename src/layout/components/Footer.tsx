import { Link } from "react-router-dom";
import ellevaLogoCyanWhite from "@/assets/brand/brand_cyan_white.svg";
import ellevaLogoCyanBlack from "@/assets/brand/brand_cyan_black.svg";
import { useTranslation } from "react-i18next";
import { Twitter, Linkedin, MessageSquare, Send, Globe } from "lucide-react";
import { useTheme } from "@/context/theme";

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export const Footer = () => {
  const { t } = useTranslation(["nav", "common"]);
  const { resolvedTheme } = useTheme();
  const ellevaLogo =
    resolvedTheme === "dark" ? ellevaLogoCyanWhite : ellevaLogoCyanBlack;

  const columns: FooterColumn[] = [
    {
      title: t("nav:categories.platform.label") || "Platform",
      links: [
        {
          label: t("nav:categories.platform.items.overview") || "Overview",
          href: "/#platform",
        },
        {
          label:
            t("nav:categories.platform.items.investmentExperience") ||
            "Investment Experience",
          href: "/#investment-experience",
        },
        {
          label: t("nav:researchIntelligence") || "Research & Intelligence",
          href: "/#investment-case",
        },
        {
          label:
            t("nav:operatingSystem") || "Research → Decide → Execute → Monitor",
          href: "/#operating-system",
        },
        {
          label:
            t("nav:categories.platform.items.architecture") || "Architecture",
          href: "/#architecture",
        },
      ],
    },

    {
      title: t("nav:categories.markets.label") || "Markets",
      links: [
        {
          label:
            t("nav:categories.markets.items.globalMarkets") || "Global Markets",
          href: "/#global-markets",
        },
        {
          label:
            t("nav:categories.markets.items.marketOpportunity") ||
            "Market Opportunity",
          href: "/#market-opportunity",
        },
        {
          label: t("nav:categories.markets.items.marketData") || "Market Data",
          href: "/#market-data",
        },
        {
          label:
            t("nav:categories.markets.items.portfolioIntelligence") ||
            "Portfolio Intelligence",
          href: "/#portfolio-overview",
        },
      ],
    },

    {
      title: t("nav:categories.technology.label") || "Technology",
      links: [
        {
          label:
            t("nav:categories.platform.items.architecture") || "Architecture",
          href: "/#architecture",
        },
        {
          label: t("common:footer.security") || "Security",
          href: "/#security",
        },
        {
          label: t("common:footer.executionEngine") || "Execution Engine",
          href: "/#execution-engine",
        },
        {
          label: t("common:footer.apiData") || "API & Data",
          href: "/#api-data",
        },
      ],
    },

    {
      title: t("nav:resources") || "Resources",
      links: [
        {
          label: t("common:footer.documentation") || "Documentation",
          href: "/file",
        },
        {
          label: t("nav:tutorials") || "Tutorials",
          href: "/tutorials",
        },
        {
          label: t("nav:calculator") || "Calculator",
          href: "/calculator",
        },
        {
          label: t("nav:categories.company.items.faq") || "FAQ",
          href: "/#faq",
        },
      ],
    },

    {
      title: t("nav:categories.company.label") || "Company",
      links: [
        {
          label: t("common:footer.aboutElleva") || "About Elleva",
          href: "/#what-is-elleva",
        },
        {
          label: t("common:footer.journey") || "Journey",
          href: "/#journey",
        },
        {
          label: t("nav:governance") || "Governance",
          href: "/#governance",
        },
        {
          label: t("common:footer.contact") || "Contact",
          href: "https://app.elleva.me/root",
          external: true,
        },
      ],
    },

    {
      title: t("nav:legal") || "Legal",
      links: [
        {
          label: t("common:footer.privacyPolicy") || "Privacy Policy",
          href: "/privacy-policy",
        },
        {
          label: t("common:footer.termsOfService") || "Terms of Service",
          href: "/terms",
        },
        {
          label: t("common:footer.riskDisclosures") || "Risk Disclosures",
          href: "/risk-disclosures",
        },
        {
          label: t("nav:categories.ecosystem.items.compliance") || "Compliance",
          href: "/#compliance",
        },
      ],
    },
  ];

  const isInternalRoute = (href: string) => {
    return href.startsWith("/") && !href.startsWith("/#");
  };

  return (
    <footer className="relative overflow-hidden border-t border-border bg-card/60 pt-16 pb-12 backdrop-blur-md transition-colors duration-200">
      <div className="container mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid grid-cols-1 gap-10 border-b border-border pb-14 lg:grid-cols-12 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <a href="/#" className="group inline-block">
              <img
                src={ellevaLogo}
                alt="ELLEVA"
                className="h-16 w-auto object-contain transition-opacity group-hover:opacity-90"
              />
            </a>

            <p className="max-w-xs text-xs leading-relaxed font-normal text-muted-foreground">
              {t("common:footer.brandDesc") ||
                "Next-generation investment platform for global markets."}
            </p>

            {/* Social */}
            <div className="flex items-center gap-3 pt-6">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="flex size-8 items-center justify-center rounded-lg border border-border bg-secondary text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
              >
                <Twitter className="size-3.5" />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex size-8 items-center justify-center rounded-lg border border-border bg-secondary text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
              >
                <Linkedin className="size-3.5" />
              </a>

              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Discord"
                className="flex size-8 items-center justify-center rounded-lg border border-border bg-secondary text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
              >
                <MessageSquare className="size-3.5" />
              </a>

              <a
                href="https://telegram.org"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="flex size-8 items-center justify-center rounded-lg border border-border bg-secondary text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
              >
                <Send className="size-3.5" />
              </a>

              <a
                href="https://elleva.me"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Website"
                className="flex size-8 items-center justify-center rounded-lg border border-border bg-secondary text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
              >
                <Globe className="size-3.5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-4 md:grid-cols-6 lg:col-span-8">
            {columns.map((column) => (
              <div key={column.title} className="space-y-3">
                <h4 className="font-mono text-[11px] font-medium tracking-wider text-foreground uppercase">
                  {column.title}
                </h4>

                <ul className="space-y-2">
                  {column.links.map((link) => (
                    <li key={`${column.title}-${link.href}-${link.label}`}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-xs font-normal text-muted-foreground transition-colors hover:text-primary"
                        >
                          {link.label}
                        </a>
                      ) : isInternalRoute(link.href) ? (
                        <Link
                          to={link.href}
                          className="block text-xs font-normal text-muted-foreground transition-colors hover:text-primary"
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          className="block text-xs font-normal text-muted-foreground transition-colors hover:text-primary"
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 pt-8 font-mono text-xs text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} Elleva. {t("common:allRightsReserved")}
          </p>

          <span className="text-[11px]">
            {t("common:footer.bottomTagline") ||
              "Built for the future of global investing."}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

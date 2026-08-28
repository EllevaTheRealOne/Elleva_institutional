import ellevaLogoCyanWhite from "@/assets/brand/brand_cyan_white.svg";
import ellevaLogoCyanBlack from "@/assets/brand/brand_cyan_black.svg";
import { cn } from "@/lib/utils";
import { useEffect, useState, useCallback } from "react";
import { navLinks } from "../constants/nav-links";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { animateVar } from "@/components/animate/variants";
import { scrollToSection } from "../utils/scrollToSection";
import { useRouteTranslation } from "@/hooks/use-route-translation";
import { useLocation } from "react-router-dom";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeToggle from "@/components/ThemeToggle";
import { useI18n } from "@/i18n/useI18n";
import NavDropdown from "./NavDropdown";
import MobileNavAccordion from "./MobileNavAccordion";
import { useTheme } from "@/context/theme";

const Navbar = () => {
  const { language } = useI18n();
  const [open, setOpen] = useState<boolean>(false);
  const [active, setActive] = useState<string>("");
  const [scrolled, setScrolled] = useState<boolean>(false);
  const { pathWithoutLng } = useRouteTranslation();
  const navList = navLinks[pathWithoutLng] || navLinks["1"];
  const location = useLocation();
  const { resolvedTheme } = useTheme();
  const ellevaLogo =
    resolvedTheme === "dark" ? ellevaLogoCyanWhite : ellevaLogoCyanBlack;
  const handleHREF = useCallback(
    (href: string): string => {
      let finalHref = href;
      return finalHref;
    },
    [language],
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const scrollPosition = window.scrollY + 140;

      // Flatten all link targets (direct and sub-items) to detect active section
      const checkHref = (href?: string) => {
        if (!href) return;
        if (!href.startsWith("#")) {
          if (location.pathname === href) {
            setActive(href);
          }
          return;
        }

        const id = href.replace("#", "");
        const section = document.getElementById(id);
        if (!section) return;

        const offsetTop = section.offsetTop;
        const height = section.offsetHeight;

        if (
          scrollPosition >= offsetTop &&
          scrollPosition < offsetTop + height
        ) {
          setActive(href);
        }
      };

      navList.forEach((item) => {
        if (item.href) {
          checkHref(item.href);
        }
        if (item.items && item.items.length > 0) {
          item.items.forEach((sub) => {
            checkHref(sub.href);
          });
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [navList, location.pathname]);
  const handleSelectLink = (href: string) => {
    setOpen(false);
    const target = handleHREF(href);
    setTimeout(() => {
      scrollToSection(target);
    }, 50);
  };

  return (
    <header className="fixed top-4 md:top-6 left-0 right-0 z-[9999] flex flex-col items-center px-4 md:px-8">
      <div
        className={cn(
          "w-full max-w-7xl transition-all duration-300 rounded-2xl border",
          scrolled
            ? "bg-background/90 backdrop-blur-xl border-border shadow-2xl shadow-black/5 dark:shadow-black/70"
            : "bg-card/90 backdrop-blur-md border-border/80",
          open && "rounded-b-none border-b-0",
        )}
      >
        <div className="flex h-16 md:h-18 items-center justify-between px-5 md:px-8">
          {/* Official Logo */}
          <div className="flex items-center gap-4">
            <a href="/#" className="flex items-center gap-2 group">
              <img
                src={ellevaLogo}
                alt="ELLEVA"
                className="h-14 sm:h-16 w-auto object-contain transition-opacity group-hover:opacity-90 dark:brightness-100"
              />
            </a>
          </div>

          {/* Desktop Navigation Links with Hover and Click Dropdowns */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navList.map((item) => (
              <NavDropdown
                key={item.label}
                item={item}
                activeHref={active}
                onSelect={handleSelectLink}
              />
            ))}
          </nav>

          {/* Actions: Theme Switcher + Lang Switcher + Primary Platform Access */}
          <div className="hidden lg:flex items-center gap-2.5">
            <ThemeToggle />
            <LanguageSwitcher onCloseDrawer={setOpen} />
            {/* <a
              href="https://app.elleva.me/root"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-4 py-2 text-xs font-medium tracking-wider uppercase text-white bg-primary hover:brightness-110 rounded-lg transition-all duration-300 shadow-sm shadow-primary/20 flex items-center gap-1.5"
            >
              <span>{t("common.actions.getStarted")}</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a> */}
          </div>

          {/* Mobile Menu Actions */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              className="p-2 text-foreground hover:text-primary transition-colors rounded-lg bg-secondary border border-border"
              onClick={() => setOpen(!open)}
              aria-label="Toggle navigation menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            variants={animateVar.drawer}
            initial="hidden"
            animate="show"
            exit="exit"
            className="lg:hidden w-full max-w-7xl rounded-b-2xl border border-t-0 border-border bg-background/95 backdrop-blur-2xl overflow-hidden shadow-2xl"
          >
            <div className="p-5 flex flex-col gap-2 max-h-[75vh] overflow-y-auto">
              {navList.map((item) => (
                <MobileNavAccordion
                  key={item.label}
                  item={item}
                  activeHref={active}
                  onSelect={handleSelectLink}
                />
              ))}

              <div className="pt-4 mt-2 border-t border-border flex flex-col gap-3">
                <ThemeToggle variant="mobile" />
                <LanguageSwitcher onCloseDrawer={setOpen} variant="mobile" />
                {/*<a
                  href="https://app.elleva.me/root"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 text-center rounded-lg text-xs font-semibold tracking-wider uppercase text-white bg-primary hover:brightness-110 transition-all flex items-center justify-center gap-1.5 shadow-md shadow-primary/20"
                >
                  <span>{t("common.actions.getStarted")}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>*/}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;

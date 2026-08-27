import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { NavLinkItem, NavSubItem } from "@/types/navigation.types";
import { useTranslation } from "react-i18next";

interface NavDropdownProps {
  item: NavLinkItem;
  activeHref: string;
  onSelect: (href: string) => void;
}

export const NavDropdown: React.FC<NavDropdownProps> = ({
  item,
  activeHref,
  onSelect,
}) => {
  const { t } = useTranslation("nav");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Helper to translate label or fallback to exact string
  const getLabel = (subOrParent: { label: string; key?: string }) => {
    if (subOrParent.key) {
      const translated = t(subOrParent.key);
      if (translated && translated !== subOrParent.key) {
        return translated;
      }
    }
    return subOrParent.label;
  };

  const hasItems = item.items && item.items.length > 0;
  const isAnyChildActive = hasItems && item.items?.some((sub) => sub.href === activeHref);
  const isDirectActive = !hasItems && item.href === activeHref;

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Hover handlers with grace period
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (hasItems) {
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 160);
  };

  const handleTriggerClick = (e: React.MouseEvent) => {
    if (hasItems) {
      e.preventDefault();
      setIsOpen((prev) => !prev);
    } else if (item.href) {
      onSelect(item.href);
    }
  };

  const handleSubItemClick = (sub: NavSubItem) => {
    setIsOpen(false);
    onSelect(sub.href);
  };

  if (!hasItems && item.href) {
    return (
      <a
        href={item.href}
        onClick={(e) => {
          e.preventDefault();
          onSelect(item.href!);
        }}
        className={cn(
          "relative px-3.5 py-1.5 text-xs font-medium tracking-wide transition-all rounded-lg",
          isDirectActive
            ? "text-foreground bg-secondary border border-border font-medium"
            : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
        )}
      >
        {getLabel(item)}
        {isDirectActive && (
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3.5 h-[2px] bg-primary rounded-full" />
        )}
      </a>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger Button */}
      <button
        type="button"
        onClick={handleTriggerClick}
        aria-expanded={isOpen}
        className={cn(
          "relative flex items-center gap-1 px-3 py-1.5 text-xs font-medium tracking-wide transition-all rounded-lg cursor-pointer select-none",
          isOpen || isAnyChildActive
            ? "text-foreground bg-secondary border border-border font-medium shadow-sm"
            : "text-muted-foreground hover:text-foreground hover:bg-secondary/60 border border-transparent"
        )}
      >
        <span>{getLabel(item)}</span>
        <ChevronDown
          className={cn(
            "w-3.5 h-3.5 transition-transform duration-200 opacity-70",
            isOpen && "rotate-180 text-primary opacity-100"
          )}
        />
        {isAnyChildActive && !isOpen && (
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3.5 h-[2px] bg-primary rounded-full" />
        )}
      </button>

      {/* Floating Dropdown Menu */}
      <AnimatePresence>
        {isOpen && hasItems && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="absolute top-full left-0 mt-2 min-w-[240px] rounded-xl bg-card/95 backdrop-blur-xl border border-border p-1.5 shadow-2xl shadow-black/10 dark:shadow-black/70 z-50 flex flex-col gap-0.5"
          >
            {item.items?.map((sub) => {
              const isSubActive = activeHref === sub.href;
              return (
                <button
                  key={sub.label}
                  type="button"
                  onClick={() => handleSubItemClick(sub)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg text-left transition-all duration-150 cursor-pointer group",
                    isSubActive
                      ? "bg-secondary text-primary font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/70"
                  )}
                >
                  <span className="group-hover:translate-x-0.5 transition-transform duration-150">
                    {getLabel(sub)}
                  </span>
                  {isSubActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavDropdown;

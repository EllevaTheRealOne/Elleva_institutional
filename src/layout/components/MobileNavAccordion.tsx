import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { NavLinkItem, NavSubItem } from "@/types/navigation.types";
import { useTranslation } from "react-i18next";

interface MobileNavAccordionProps {
  item: NavLinkItem;
  activeHref: string;
  onSelect: (href: string) => void;
}

export const MobileNavAccordion: React.FC<MobileNavAccordionProps> = ({
  item,
  activeHref,
  onSelect,
}) => {
  const { t } = useTranslation("nav");
  const [isOpen, setIsOpen] = useState(false);

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

  if (!hasItems && item.href) {
    return (
      <button
        type="button"
        onClick={() => onSelect(item.href!)}
        className={cn(
          "w-full px-3.5 py-2.5 rounded-lg h-fit text-sm font-medium tracking-wide transition-colors flex items-center justify-between text-left",
          isDirectActive
            ? "bg-secondary text-foreground border border-border"
            : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
        )}
      >
        <span>{getLabel(item)}</span>
        {isDirectActive && (
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
        )}
      </button>
    );
  }

  return (
    <div className="w-full rounded-xl border border-border/40 bg-secondary/20">
      {/* Accordion Header */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "w-full px-3.5 py-2.5 text-sm font-medium tracking-wide transition-colors flex items-center justify-between text-left",
          isAnyChildActive || isOpen
            ? "text-foreground font-semibold"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <span className="flex items-center gap-2">
          {getLabel(item)}
          {isAnyChildActive && (
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          )}
        </span>
        <ChevronDown
          className={cn(
            "w-4 h-4 transition-transform duration-200 opacity-70",
            isOpen && "rotate-180 text-primary opacity-100"
          )}
        />
      </button>

      {/* Accordion Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-2 pb-2.5 pt-0.5 flex flex-col gap-1 border-t border-border/40">
              {item.items?.map((sub: NavSubItem) => {
                const isSubActive = activeHref === sub.href;
                return (
                  <button
                    key={sub.label}
                    type="button"
                    onClick={() => onSelect(sub.href)}
                    className={cn(
                      "w-full px-3 py-2 rounded-lg text-xs font-medium tracking-wide transition-colors flex items-center justify-between text-left",
                      isSubActive
                        ? "bg-secondary text-primary font-semibold border border-border"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    )}
                  >
                    <span>{getLabel(sub)}</span>
                    {isSubActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileNavAccordion;

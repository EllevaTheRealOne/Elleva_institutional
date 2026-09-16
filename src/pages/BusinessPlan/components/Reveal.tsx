import React from "react";
import { motion } from "motion/react";
import { animateVar, viewportDefault } from "@/components/animate/variants";

interface RevealProps {
  className?: string;
  delay?: number;
  children: React.ReactNode;
}

/** Fades a block up as it enters the viewport, once. */
export const Reveal: React.FC<RevealProps> = ({ className, delay = 0, children }) => {
  return (
    <motion.div
      className={className}
      variants={animateVar.fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportDefault}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
};

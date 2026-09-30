import React, { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { easeOutExpo } from "@/components/animate/variants";

interface CountUpProps {
  value: number;
  format: (n: number) => string;
  /** Round while counting — true for whole counts, false for shares. */
  integer?: boolean;
}

/**
 * A figure that counts up from zero the first time it scrolls into view. With
 * reduced motion it simply shows the value. Screen readers get the final value
 * only; the moving digits are hidden from them.
 */
export const CountUp: React.FC<CountUpProps> = ({ value, format, integer = true }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setShown(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.1,
      ease: easeOutExpo,
      onUpdate: (v) => setShown(integer ? Math.round(v) : v),
    });
    return () => controls.stop();
  }, [inView, reduceMotion, value, integer]);

  return (
    <>
      <span ref={ref} aria-hidden="true">
        {format(shown)}
      </span>
      <span className="sr-only">{format(value)}</span>
    </>
  );
};

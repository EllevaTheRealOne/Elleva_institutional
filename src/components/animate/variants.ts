import type { Variants, Transition } from "motion/react";

/**
 * Standard Easing Curves
 */
export const easeOutExpo = [0.16, 1, 0.3, 1] as const;
export const easeOutWeb3 = [0.22, 1, 0.36, 1] as const;
export const easeInOutFast = [0.4, 0, 0.2, 1] as const;

/**
 * Standard Transitions
 */
export const transitions = {
  fast: { duration: 0.2, ease: easeOutExpo } as Transition,
  normal: { duration: 0.45, ease: easeOutExpo } as Transition,
  slow: { duration: 0.7, ease: easeOutExpo } as Transition,
  accordion: { duration: 0.25, ease: easeInOutFast } as Transition,
  dropdown: { duration: 0.15, ease: easeOutExpo } as Transition,
};

/**
 * Standard Viewport Observer Defaults
 */
export const viewportDefault = {
  once: true,
  amount: 0.15,
} as const;

/**
 * Centralized Animation Variants
 */
export const animateVar = {
  fadeIn: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 0.45,
        ease: easeOutExpo,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  } as Variants,

  fadeUp: {
    hidden: { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: easeOutExpo,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.25,
        ease: "easeIn",
      },
    },
  } as Variants,

  fadeDown: {
    hidden: { opacity: 0, y: -16 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: easeOutExpo,
      },
    },
    exit: {
      opacity: 0,
      y: 10,
      transition: {
        duration: 0.25,
        ease: "easeIn",
      },
    },
  } as Variants,

  fadeLeft: {
    hidden: { opacity: 0, x: -20 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: easeOutExpo,
      },
    },
    exit: {
      opacity: 0,
      x: -10,
      transition: {
        duration: 0.25,
        ease: "easeIn",
      },
    },
  } as Variants,

  fadeRight: {
    hidden: { opacity: 0, x: 20 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: easeOutExpo,
      },
    },
    exit: {
      opacity: 0,
      x: 10,
      transition: {
        duration: 0.25,
        ease: "easeIn",
      },
    },
  } as Variants,

  scaleIn: {
    hidden: { opacity: 0, scale: 0.96 },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: easeOutExpo,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.96,
      transition: {
        duration: 0.25,
        ease: "easeIn",
      },
    },
  } as Variants,

  dropdown: {
    hidden: { opacity: 0, y: 6, scale: 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.15,
        ease: easeOutExpo,
      },
    },
    exit: {
      opacity: 0,
      y: 4,
      scale: 0.98,
      transition: {
        duration: 0.1,
        ease: "easeIn",
      },
    },
  } as Variants,

  accordion: {
    hidden: { height: 0, opacity: 0 },
    show: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.25,
        ease: easeInOutFast,
      },
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: easeInOutFast,
      },
    },
  } as Variants,

  drawer: {
    hidden: { height: 0, opacity: 0 },
    show: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.25,
        ease: easeInOutFast,
      },
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: easeInOutFast,
      },
    },
  } as Variants,

  staggerContainer: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.04,
      },
    },
  } as Variants,

  staggerContainerSlow: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.08,
      },
    },
  } as Variants,

  floatHorizontal: {
    initial: { x: 0 },
    animate: {
      x: [0, 6, 0],
      transition: {
        duration: 1.6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  },
};

import React from "react";

interface DecorativeOrbitsProps {
  className?: string;
  isDark?: boolean;
}

export const DecorativeOrbits: React.FC<DecorativeOrbitsProps> = ({
  className = "",
  isDark = false,
}) => {
  const cx = 470;
  const cy = 470;
  const orbitStroke = isDark
    ? "rgba(245,247,246,0.08)"
    : "rgba(12,95,90,0.18)";
  const nodeFill = isDark ? "rgba(245,247,246,0.2)" : "#0C5F5A";
  const glowColor = isDark ? "#189890" : "#0C5F5A";

  return (
    <svg
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none -z-20 w-[640px] h-[640px] sm:w-[820px] sm:h-[820px] max-w-none ${className}`}
      viewBox="0 0 940 940"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="centralOrbitGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={glowColor} stopOpacity={isDark ? "0.08" : "0.06"} />
          <stop offset="60%" stopColor={glowColor} stopOpacity="0.02" />
          <stop offset="100%" stopColor={glowColor} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Central Soft Glow */}
      <circle cx={cx} cy={cy} r="280" fill="url(#centralOrbitGlow)" />

      {/* Inner Orbit Circle */}
      <circle
        cx={cx}
        cy={cy}
        r="115"
        fill="none"
        stroke={orbitStroke}
        strokeWidth="1"
        strokeDasharray="3 5"
        opacity="0.8"
      />

      {/* Middle Orbit Circle */}
      <circle
        cx={cx}
        cy={cy}
        r="165"
        fill="none"
        stroke={orbitStroke}
        strokeWidth="1"
        opacity="0.7"
      />

      {/* Middle Outer Orbit */}
      <circle
        cx={cx}
        cy={cy}
        r="225"
        fill="none"
        stroke={orbitStroke}
        strokeWidth="1"
        strokeDasharray="6 8"
        opacity="0.6"
      />

      {/* Outer Orbit */}
      <circle
        cx={cx}
        cy={cy}
        r="290"
        fill="none"
        stroke={orbitStroke}
        strokeWidth="1"
        opacity="0.5"
      />

      {/* Far Outer Orbit */}
      <circle
        cx={cx}
        cy={cy}
        r="310"
        fill="none"
        stroke={orbitStroke}
        strokeWidth="0.75"
        strokeDasharray="4 10"
        opacity="0.4"
      />

      {/* Orbital Nodes */}
      <circle
        cx={cx - 115}
        cy={cy}
        r="2"
        fill={nodeFill}
      />

      <circle
        cx={cx + 115}
        cy={cy}
        r="2"
        fill={nodeFill}
      />

      <circle
        cx={cx}
        cy={cy - 115}
        r="2"
        fill={nodeFill}
      />

      <circle
        cx={cx}
        cy={cy + 115}
        r="2"
        fill={nodeFill}
      />

      <circle
        cx={cx - 165 * 0.707}
        cy={cy - 165 * 0.707}
        r="2.5"
        fill={nodeFill}
      />

      <circle
        cx={cx + 165 * 0.707}
        cy={cy - 165 * 0.707}
        r="2"
        fill={nodeFill}
      />

      <circle
        cx={cx - 165 * 0.707}
        cy={cy + 165 * 0.707}
        r="2"
        fill={nodeFill}
      />

      <circle
        cx={cx + 165 * 0.707}
        cy={cy + 165 * 0.707}
        r="2.5"
        fill={nodeFill}
      />

      <circle
        cx={cx - 225 * 0.9}
        cy={cy - 225 * 0.43}
        r="2"
        fill={nodeFill}
      />

      <circle
        cx={cx + 225 * 0.9}
        cy={cy + 225 * 0.43}
        r="2"
        fill={nodeFill}
      />

      <circle
        cx={cx - 290 * 0.5}
        cy={cy + 290 * 0.86}
        r="2.5"
        fill={nodeFill}
      />

      <circle
        cx={cx + 290 * 0.5}
        cy={cy - 290 * 0.86}
        r="2"
        fill={nodeFill}
      />
    </svg>
  );
};

"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface TechPathBackgroundProps {
  /**
   * Visual intensity preset for paths
   * @default "subtle"
   */
  intensity?: "subtle" | "medium" | "vibrant";
  /**
   * Color variant preset
   * - "brand": Matches the theme brand primary (#98ff03 lime/emerald)
   * - "cyan": Classic electric cyan/blue technical aesthetic
   * - "monochrome": Clean neutral slate/white/zinc
   * @default "brand"
   */
  variant?: "brand" | "cyan" | "monochrome";
  /**
   * Whether to enable subtle traveling signal pulses
   * @default true
   */
  animated?: boolean;
  /**
   * Custom class names for the container
   */
  className?: string;
}

export function TechPathBackground({
  intensity = "subtle",
  variant = "brand",
  animated = true,
  className,
}: TechPathBackgroundProps) {
  // Opacity styles calibrated for clean, subtle technical aesthetic
  const opacityStyles = {
    subtle: {
      primary: "opacity-40 dark:opacity-30",
      secondary: "opacity-20 dark:opacity-15",
      accent: "opacity-30 dark:opacity-20",
    },
    medium: {
      primary: "opacity-65 dark:opacity-55",
      secondary: "opacity-35 dark:opacity-25",
      accent: "opacity-50 dark:opacity-40",
    },
    vibrant: {
      primary: "opacity-90 dark:opacity-80",
      secondary: "opacity-55 dark:opacity-45",
      accent: "opacity-75 dark:opacity-65",
    },
  }[intensity];

  // Color styles for brand, cyan, and monochrome palettes
  const colorStyles = {
    brand: {
      strokePrimary: "stroke-[#4d7c0f] dark:stroke-[#98ff03]",
      strokeSecondary: "stroke-[#65a30d] dark:stroke-[#84cc16]",
      pulseColor: "stroke-[#84cc16] dark:stroke-[#bef264]",
    },
    cyan: {
      strokePrimary: "stroke-[#0284c7] dark:stroke-[#38bdf8]",
      strokeSecondary: "stroke-[#0369a1] dark:stroke-[#0284c7]",
      pulseColor: "stroke-[#38bdf8] dark:stroke-[#7dd3fc]",
    },
    monochrome: {
      strokePrimary: "stroke-[#64748b] dark:stroke-[#e2e8f0]",
      strokeSecondary: "stroke-[#94a3b8] dark:stroke-[#64748b]",
      pulseColor: "stroke-[#94a3b8] dark:stroke-[#ffffff]",
    },
  }[variant];

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full overflow-hidden select-none",
        className
      )}
    >
      <svg
        className="h-full w-full object-cover"
        viewBox="0 0 1920 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Subtle glow filter for highlight pulses */}
          <filter id="techGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ================================================================= */}
        {/* BOTTOM-LEFT PATH CLUSTER                                         */}
        {/* Elegant, thin 45-degree routed signal paths on the bottom left    */}
        {/* ================================================================= */}
        <g className="tech-bottom-left-group">
          {/* BL-1: Major ascending 45-degree primary path */}
          <path
            d="M -40 680 L 180 460 Q 195 445 215 445 L 310 445 Q 330 445 345 460 L 470 585 Q 485 600 505 600 L 620 600 Q 640 600 655 615 L 775 735 Q 790 750 790 770 L 790 940"
            className={cn(
              "transition-colors duration-500",
              colorStyles.strokePrimary,
              opacityStyles.primary
            )}
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {animated && (
            <path
              d="M -40 680 L 180 460 Q 195 445 215 445 L 310 445 Q 330 445 345 460 L 470 585 Q 485 600 505 600 L 620 600 Q 640 600 655 615 L 775 735 Q 790 750 790 770 L 790 940"
              className={cn("tech-pulse-line-1", colorStyles.pulseColor)}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#techGlow)"
            />
          )}

          {/* BL-2: Interlocking bottom-left boundary loop */}
          <path
            d="M 80 940 L 280 740 Q 295 725 295 705 L 295 620 Q 295 600 280 585 L 150 455 Q 135 440 115 440 L -40 440"
            className={cn(
              "transition-colors duration-500",
              colorStyles.strokePrimary,
              opacityStyles.primary
            )}
            strokeWidth="0.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* BL-3: Secondary lower stepped baseline route */}
          <path
            d="M -40 840 L 110 690 Q 125 675 145 675 L 220 675 Q 240 675 255 690 L 375 810 Q 390 825 410 825 L 530 825 Q 550 825 565 840 L 630 905 Q 640 915 650 940"
            className={cn(
              "transition-colors duration-500",
              colorStyles.strokeSecondary,
              opacityStyles.secondary
            )}
            strokeWidth="0.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* BL-4: Straight thin technical signal trace */}
          <path
            d="M 380 570 L 640 830"
            className={cn(
              "transition-colors duration-500",
              colorStyles.strokeSecondary,
              opacityStyles.accent
            )}
            strokeWidth="0.75"
            strokeLinecap="round"
          />
        </g>

        {/* ================================================================= */}
        {/* BOTTOM-RIGHT PATH CLUSTER                                        */}
        {/* Elegant, thin 45-degree routed signal paths on the bottom right   */}
        {/* ================================================================= */}
        <g className="tech-bottom-right-group">
          {/* BR-1: Major ascending 45-degree primary path */}
          <path
            d="M 1960 680 L 1740 460 Q 1725 445 1705 445 L 1610 445 Q 1590 445 1575 460 L 1450 585 Q 1435 600 1415 600 L 1300 600 Q 1280 600 1265 615 L 1145 735 Q 1130 750 1130 770 L 1130 940"
            className={cn(
              "transition-colors duration-500",
              colorStyles.strokePrimary,
              opacityStyles.primary
            )}
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {animated && (
            <path
              d="M 1960 680 L 1740 460 Q 1725 445 1705 445 L 1610 445 Q 1590 445 1575 460 L 1450 585 Q 1435 600 1415 600 L 1300 600 Q 1280 600 1265 615 L 1145 735 Q 1130 750 1130 770 L 1130 940"
              className={cn("tech-pulse-line-2", colorStyles.pulseColor)}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#techGlow)"
            />
          )}

          {/* BR-2: Interlocking bottom-right boundary loop */}
          <path
            d="M 1840 940 L 1640 740 Q 1625 725 1625 705 L 1625 620 Q 1625 600 1640 585 L 1770 455 Q 1785 440 1805 440 L 1960 440"
            className={cn(
              "transition-colors duration-500",
              colorStyles.strokePrimary,
              opacityStyles.primary
            )}
            strokeWidth="0.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* BR-3: Secondary lower stepped baseline route */}
          <path
            d="M 1960 840 L 1810 690 Q 1795 675 1775 675 L 1700 675 Q 1680 675 1665 690 L 1545 810 Q 1530 825 1510 825 L 1390 825 Q 1370 825 1355 840 L 1290 905 Q 1280 915 1270 940"
            className={cn(
              "transition-colors duration-500",
              colorStyles.strokeSecondary,
              opacityStyles.secondary
            )}
            strokeWidth="0.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* BR-4: Straight thin technical signal trace */}
          <path
            d="M 1540 570 L 1280 830"
            className={cn(
              "transition-colors duration-500",
              colorStyles.strokeSecondary,
              opacityStyles.accent
            )}
            strokeWidth="0.75"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
}

export default TechPathBackground;

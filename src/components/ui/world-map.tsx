"use client";

import { useRef, useMemo } from "react";
import { motion } from "motion/react";
import DottedMap from "dotted-map";
import { cn } from "@/lib/utils";

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number; label?: string };
    end: { lat: number; lng: number; label?: string };
  }>;
  lineColor?: string;
  className?: string;
}

export default function WorldMap({
  dots = [],
  lineColor = "#98ff03",
  className = "",
}: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);


  const { svgMapLight, svgMapDark } = useMemo(() => {
    const map = new DottedMap({ height: 100, grid: "diagonal" });
    return {
      svgMapLight: map.getSVG({
        radius: 0.22,
        color: "rgba(0, 0, 0, 0.2)",
        shape: "circle",
        backgroundColor: "transparent",
      }),
      svgMapDark: map.getSVG({
        radius: 0.22,
        color: "rgba(255, 255, 255, 0.22)",
        shape: "circle",
        backgroundColor: "transparent",
      }),
    };
  }, []);

  const projectPoint = (lat: number, lng: number) => {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  };

  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number }
  ) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  return (
    <div
      className={cn(
        "w-full relative font-sans overflow-hidden select-none pointer-events-none",
        className
      )}
    >
      {/* Light mode map */}
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMapLight)}`}
        className="h-full w-full object-cover dark:hidden pointer-events-none select-none [mask-image:linear-gradient(to_bottom,transparent,white_15%,white_85%,transparent)]"
        alt="world map"
        height="495"
        width="1056"
        draggable={false}
      />
      {/* Dark mode map */}
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMapDark)}`}
        className="h-full w-full object-cover hidden dark:block pointer-events-none select-none [mask-image:linear-gradient(to_bottom,transparent,white_15%,white_85%,transparent)]"
        alt="world map"
        height="495"
        width="1056"
        draggable={false}
      />

      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full absolute inset-0 pointer-events-none select-none"
      >
        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);
          return (
            <g key={`path-group-${i}`}>
              <motion.path
                d={createCurvedPath(startPoint, endPoint)}
                fill="none"
                stroke="url(#world-path-gradient)"
                strokeWidth="1.2"
                initial={{
                  pathLength: 0,
                }}
                animate={{
                  pathLength: 1,
                }}
                transition={{
                  duration: 1.6,
                  delay: 0.4 * i,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
                key={`start-upper-${i}`}
              />
            </g>
          );
        })}

        <defs>
          <linearGradient id="world-path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" stopOpacity="0" />
            <stop offset="20%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="80%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </linearGradient>
        </defs>

        {dots.map((dot, i) => (
          <g key={`points-group-${i}`}>
            <g key={`start-${i}`}>
              <circle
                cx={projectPoint(dot.start.lat, dot.start.lng).x}
                cy={projectPoint(dot.start.lat, dot.start.lng).y}
                r="2.5"
                fill={lineColor}
              />
              <circle
                cx={projectPoint(dot.start.lat, dot.start.lng).x}
                cy={projectPoint(dot.start.lat, dot.start.lng).y}
                r="2.5"
                fill={lineColor}
                opacity="0.5"
              >
                <animate
                  attributeName="r"
                  from="2.5"
                  to="9"
                  dur="2s"
                  begin="0s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.6"
                  to="0"
                  dur="2s"
                  begin="0s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
            <g key={`end-${i}`}>
              <circle
                cx={projectPoint(dot.end.lat, dot.end.lng).x}
                cy={projectPoint(dot.end.lat, dot.end.lng).y}
                r="2.5"
                fill={lineColor}
              />
              <circle
                cx={projectPoint(dot.end.lat, dot.end.lng).x}
                cy={projectPoint(dot.end.lat, dot.end.lng).y}
                r="2.5"
                fill={lineColor}
                opacity="0.5"
              >
                <animate
                  attributeName="r"
                  from="2.5"
                  to="9"
                  dur="2s"
                  begin="0s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.6"
                  to="0"
                  dur="2s"
                  begin="0s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          </g>
        ))}
      </svg>
    </div>
  );
}

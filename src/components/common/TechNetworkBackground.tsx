import { cn } from "@/lib/utils";

export type TechNetworkBackgroundProps = {
  variant?: "neural" | "network" | "code";
  intensity?: "subtle" | "medium";
  animated?: boolean;
  className?: string;
};

type Node = readonly [x: number, y: number, emphasis?: boolean];
type Edge = readonly [from: number, to: number, signal?: boolean];

const mobileNodes: Node[] = [
  [454, 112], [516, 78, true], [580, 126], [534, 194], [466, 220],
  [610, 580], [674, 538], [738, 600, true], [690, 680], [618, 660],
  [612, 288], [682, 252], [746, 306, true], [704, 370], [756, 438], [684, 466],
];

const tabletNodes: Node[] = [
  [314, 76], [386, 126], [338, 202, true], [270, 178],
  [612, 276], [694, 222, true], [758, 302], [688, 366], [574, 350],
  [86, 478], [176, 424, true], [250, 482], [204, 550],
  [1078, 536], [1134, 610], [1052, 676, true],
];

const desktopNodes: Node[] = [
  [520, 82], [590, 126], [676, 92, true], [732, 158], [650, 190], [552, 176],
  [824, 490], [894, 438, true], [980, 482], [1018, 570], [930, 624], [846, 584],
  [472, 438], [526, 490], [478, 546, true], [398, 510],
];

const edgesByVariant: Record<TechNetworkBackgroundProps["variant"] & string, {
  mobile: Edge[];
  tablet: Edge[];
  desktop: Edge[];
}> = {
  neural: {
    mobile: [[1, 0], [1, 2, true], [1, 3], [3, 4], [12, 10], [12, 11], [12, 13, true], [13, 14], [13, 15], [7, 5], [7, 6], [7, 8, true], [8, 9]],
    tablet: [[2, 0], [2, 1, true], [2, 3], [5, 4], [5, 6], [5, 7, true], [4, 8], [10, 9], [10, 11, true], [11, 12], [15, 13], [15, 14]],
    desktop: [[2, 0], [2, 1], [2, 3, true], [1, 5], [3, 4], [7, 6], [7, 8, true], [8, 9], [9, 10], [6, 11], [14, 12], [14, 13, true], [14, 15]],
  },
  network: {
    mobile: [[0, 1], [1, 2, true], [2, 3], [3, 4], [4, 0], [1, 3], [5, 6], [6, 7], [7, 8, true], [8, 9], [9, 5], [6, 8], [10, 11], [11, 12], [12, 13, true], [13, 10], [13, 14], [14, 15], [15, 13]],
    tablet: [[0, 1], [1, 2], [2, 3, true], [3, 0], [0, 2], [4, 5], [5, 6, true], [6, 7], [7, 8], [8, 4], [4, 7], [9, 10], [10, 11], [11, 12], [12, 9], [10, 12], [13, 14], [14, 15, true], [15, 13]],
    desktop: [[0, 1], [1, 2, true], [2, 3], [3, 4], [4, 5], [5, 0], [1, 4], [6, 7], [7, 8], [8, 9], [9, 10, true], [10, 11], [11, 6], [7, 11], [12, 13], [13, 14, true], [14, 15], [15, 12]],
  },
  code: {
    mobile: [[0, 1], [1, 2], [2, 3, true], [3, 4], [10, 11], [11, 12], [12, 13, true], [13, 14], [14, 15], [5, 6], [6, 7], [7, 8, true], [8, 9]],
    tablet: [[0, 1], [1, 2, true], [2, 3], [4, 5], [5, 6], [6, 7, true], [7, 8], [9, 10], [10, 11, true], [11, 12], [13, 14], [14, 15]],
    desktop: [[0, 1], [1, 2], [2, 3, true], [3, 4], [4, 5], [6, 7], [7, 8, true], [8, 9], [9, 10], [10, 11], [12, 13], [13, 14, true], [14, 15]],
  },
};

function NetworkLayer({ nodes, edges, className, animated, codeMarks, delayOffset }: {
  nodes: Node[];
  edges: Edge[];
  className?: string;
  animated: boolean;
  codeMarks: boolean;
  delayOffset: number;
}) {
  return (
    <g className={cn("tech-network-cluster", animated && "tech-network-cluster-animated", className)}>
      <g className="tech-network-lines">
        {edges.map(([from, to, signal], index) => {
          const start = nodes[from];
          const end = nodes[to];
          if (!start || !end) return null;
          return (
            <g key={`${from}-${to}`}>
              <line x1={start[0]} y1={start[1]} x2={end[0]} y2={end[1]} />
              {animated && signal ? (
                <line
                  className="tech-network-signal"
                  x1={start[0]}
                  y1={start[1]}
                  x2={end[0]}
                  y2={end[1]}
                  style={{ animationDelay: `${delayOffset + index * 0.8}s` }}
                />
              ) : null}
            </g>
          );
        })}
      </g>
      <g className="tech-network-nodes">
        {nodes.map(([x, y, emphasis], index) => (
          <circle
            key={`${x}-${y}`}
            cx={x}
            cy={y}
            r={emphasis ? 2.2 : 1.45}
            className={cn(emphasis && "tech-network-node-emphasis", animated && "tech-network-node-animated")}
            style={{ animationDelay: `${delayOffset + (index % 7) * 1.1}s` }}
          />
        ))}
      </g>
      {codeMarks ? (
        <g className="tech-network-code-marks">
          {nodes.filter((_, index) => index % 5 === 1).map(([x, y]) => (
            <path key={`${x}-${y}-mark`} d={`M ${x + 8} ${y - 5} h 7 M ${x + 8} ${y} h 11`} />
          ))}
        </g>
      ) : null}
    </g>
  );
}

export function TechNetworkBackground({
  variant = "neural",
  intensity = "subtle",
  animated = true,
  className,
}: TechNetworkBackgroundProps) {
  const edges = edgesByVariant[variant];
  const codeMarks = variant === "code";

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      data-variant={variant}
      data-intensity={intensity}
      className={cn("tech-network-background absolute inset-0 h-full w-full select-none pointer-events-none", className)}
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <NetworkLayer nodes={mobileNodes} edges={edges.mobile} animated={animated} codeMarks={codeMarks} delayOffset={0} />
      <NetworkLayer nodes={tabletNodes} edges={edges.tablet} animated={animated} codeMarks={codeMarks} delayOffset={2.5} className="hidden md:block" />
      <NetworkLayer nodes={desktopNodes} edges={edges.desktop} animated={animated} codeMarks={codeMarks} delayOffset={5} className="hidden lg:block" />
    </svg>
  );
}
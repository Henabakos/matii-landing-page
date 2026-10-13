"use client";

import {
  type PointerEvent,
  type ReactNode,
  type RefObject,
  useRef,
  useState,
} from "react";

// ===========================================================================
// SHARED STAGE COMPONENT FOR 3D TECHNICAL ILLUSTRATIONS
// Blueprint HUD Framing, Precision Corner Reticles, Micro-Grid & Responsive Telemetry
// ===========================================================================

export function useFigurePointer() {
  const [pointer, setPointer] = useState<[number, number] | null>(null);
  const handlers = {
    onPointerMove(event: PointerEvent<SVGSVGElement>) {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 320;
      const y = ((event.clientY - rect.top) / rect.height) * 220;
      setPointer([x, y]);
    },
    onPointerLeave() {
      setPointer(null);
    },
  };
  return [pointer, handlers] as const;
}

interface TechnicalStageProps {
  rootRef: RefObject<HTMLDivElement | null>;
  systemTag: string;
  badgeText?: string;
  statusBadge?: string;
  telemetry: string;
  pointer: ReturnType<typeof useFigurePointer>[1];
  children: ReactNode;
}

function TechnicalStage({
  rootRef,
  systemTag,
  badgeText = "30° ISO · CAD",
  statusBadge = "OPERATIONAL",
  telemetry,
  pointer,
  children,
}: TechnicalStageProps) {
  return (
    <div
      ref={rootRef}
      className="relative flex flex-col w-full select-none rounded-xl border border-white/10 bg-[#0B0D0E]/95 backdrop-blur-md p-3 overflow-hidden shadow-2xl group/stage transition-all duration-300 hover:border-[#A2FF00]/40"
    >
      {/* CAD Micro-Grid Background Pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:16px_16px]"
        aria-hidden="true"
      />

      {/* Subtle Ambient Radial Glow */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(162,255,0,0.05)_0%,transparent_75%)]"
        aria-hidden="true"
      />

      {/* Precision CAD Corner Reticles */}
      <div className="pointer-events-none absolute top-1.5 left-1.5 text-[8px] font-mono text-white/20 select-none">
        +
      </div>
      <div className="pointer-events-none absolute top-1.5 right-1.5 text-[8px] font-mono text-white/20 select-none">
        +
      </div>
      <div className="pointer-events-none absolute bottom-1.5 left-1.5 text-[8px] font-mono text-white/20 select-none">
        +
      </div>
      <div className="pointer-events-none absolute bottom-1.5 right-1.5 text-[8px] font-mono text-white/20 select-none">
        +
      </div>

      {/* Top Technical HUD Header Bar */}
      <div className="relative z-10 flex items-center justify-between font-mono text-[9px] tracking-wider text-zinc-400 pb-1.5 border-b border-white/5 uppercase">
        <span className="flex items-center gap-1.5 text-zinc-300 font-medium">
          <span className="size-1.5 rounded-full bg-[#A2FF00] animate-pulse shrink-0" />
          {systemTag}
        </span>
        <span className="text-zinc-500 font-mono tracking-widest text-[8px]">
          {badgeText}
        </span>
      </div>

      {/* SVG Canvas - Fixed 320x220 aspect ratio */}
      <svg
        className="w-full h-auto aspect-[320/220] overflow-visible my-1"
        viewBox="0 0 320 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...pointer}
      >
        <defs>
          {/* Base Drop Shadow */}
          <radialGradient id="base-shadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#000000" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>

          {/* Green Glow Filter for Status LEDs & Active Traces */}
          <filter id="green-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Deep Spherical Shading for 3D Earth Globe */}
          <radialGradient id="globe-shading" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#22272B" />
            <stop offset="40%" stopColor="#131618" />
            <stop offset="85%" stopColor="#090B0C" />
            <stop offset="100%" stopColor="#040506" />
          </radialGradient>

          {/* Atmospheric Limb Halo */}
          <linearGradient id="atmo-glow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#A2FF00" stopOpacity="0.35" />
            <stop offset="50%" stopColor="#2A4020" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#101214" stopOpacity="0" />
          </linearGradient>

          {/* 3D Cloud Elevation Gradient */}
          <linearGradient id="cloud-depth" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E2327" />
            <stop offset="100%" stopColor="#0E1012" />
          </linearGradient>

          {/* Metal Heat Sink Gradient */}
          <linearGradient id="metal-fin" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3C4349" />
            <stop offset="100%" stopColor="#1E2225" />
          </linearGradient>

          {/* Globe Clipping Sphere */}
          <clipPath id="globe-sphere-clip">
            <circle cx="160" cy="104" r="64" />
          </clipPath>
        </defs>

        {children}
      </svg>

      {/* Bottom Technical Status Bar - Clean, non-colliding layout */}
      <div className="relative z-10 flex items-center justify-between gap-2 pt-1.5 border-t border-white/5 font-mono text-[9.5px] tracking-tight uppercase">
        <span className="flex items-center gap-1.5 text-zinc-400 truncate max-w-[210px]">
          <span className="size-1 rounded-full bg-[#A2FF00]/80 shrink-0" />
          <span className="truncate">{telemetry}</span>
        </span>
        <span className="text-[8.5px] text-[#A2FF00] font-semibold tracking-wider shrink-0 bg-[#A2FF00]/10 px-1.5 py-0.5 rounded border border-[#A2FF00]/25">
          {statusBadge}
        </span>
      </div>
    </div>
  );
}

// ===========================================================================
// ILLUSTRATION 01 — ENTERPRISE SOFTWARE
// Open Operator Laptop on Tiered Hover Planes Surrounded by Enterprise Servers
// ===========================================================================

export function EnterpriseSoftwareFigure() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [pointer, handlers] = useFigurePointer();

  const isLaptopHovered =
    pointer !== null &&
    pointer[0] >= 130 &&
    pointer[0] <= 220 &&
    pointer[1] >= 72 &&
    pointer[1] <= 165;
  const isLeftServersHovered = pointer !== null && pointer[0] < 125;
  const isRightServerHovered = pointer !== null && pointer[0] > 215;

  const telemetry = isLaptopHovered
    ? "OPERATOR CONSOLE: ERP / FINTECH DASHBOARD"
    : isLeftServersHovered
      ? "PRIMARY BLADE CLUSTER: 99.999% SLA"
      : isRightServerHovered
        ? "API GATEWAY: ZERO-TRUST · 12.4K REQ/S"
        : "ENTERPRISE CLUSTER · DISTRIBUTED MESH";

  return (
    <TechnicalStage
      pointer={handlers}
      telemetry={telemetry}
      rootRef={rootRef}
      systemTag="SYS.01 // ENTERPRISE ARCH"
      badgeText="ISOMETRIC // 4 NODES"
      statusBadge="ACTIVE CORE"
    >
      {/* Base Floor Ambient Shadow */}
      <ellipse cx="160" cy="168" rx="128" ry="42" fill="url(#base-shadow)" />

      {/* Subtle Isometric Foundation Plateau Boundary */}
      <polygon
        points="160,118 276,168 160,214 44,168"
        fill="none"
        stroke="#252A2E"
        strokeWidth="0.8"
        strokeDasharray="4 3"
        opacity="0.5"
      />

      {/* --- NETWORK CONSTELLATION MESH (BACKGROUND) --- */}
      <g opacity="0.85">
        <path
          d="M 52,104 L 72,78 L 106,48 L 138,56 L 208,44 L 244,68 L 222,88"
          stroke="#323C44"
          strokeWidth="1"
          strokeDasharray="3 2"
          fill="none"
        />
        <line x1="72" y1="78" x2="138" y2="56" stroke="#2B343C" strokeWidth="0.9" />
        <line x1="72" y1="78" x2="100" y2="128" stroke="#323C44" strokeWidth="1" strokeDasharray="3 2" />
        <line x1="138" y1="56" x2="158" y2="74" stroke="#A2FF00" strokeWidth="1.2" />
        <line x1="158" y1="74" x2="222" y2="88" stroke="#323C44" strokeWidth="1" />
        <line x1="208" y1="44" x2="198" y2="72" stroke="#2B343C" strokeWidth="0.8" />

        {/* Constellation Nodes */}
        <circle cx="52" cy="104" r="2.2" fill="#15191C" stroke="#48545E" strokeWidth="0.8" />
        <circle cx="106" cy="48" r="2.6" fill="#15191C" stroke="#A2FF00" strokeWidth="1" />
        <circle cx="208" cy="44" r="2.4" fill="#15191C" stroke="#48545E" strokeWidth="0.8" />
        <circle cx="244" cy="68" r="2.4" fill="#15191C" stroke="#48545E" strokeWidth="0.8" />
      </g>

      {/* --- TOWER 2: STACKED BLADE SERVER RACK (REAR-CENTER) --- */}
      <g>
        {/* Shadow */}
        <ellipse cx="138" cy="132" rx="20" ry="7" fill="url(#base-shadow)" opacity="0.6" />

        {/* Top Face */}
        <polygon points="138,56 156,65 138,74 120,65" fill="#20252A" stroke="#525C64" strokeWidth="1" />

        {/* CPU Package on Top */}
        <polygon points="138,59 148,64 138,69 128,64" fill="#282F35" stroke="#66727C" strokeWidth="0.8" />
        <polygon points="138,61 143,63.5 138,66 133,63.5" fill="#121518" stroke="#A2FF00" strokeWidth="0.8" />
        <circle cx="138" cy="63.5" r="1.1" fill="#A2FF00" filter="url(#green-glow)" />

        {/* Front-Left Face (5 Blade Server Slots) */}
        <polygon points="120,65 138,74 138,128 120,119" fill="#14181B" stroke="#444C54" strokeWidth="1" />
        {/* Front-Right Face */}
        <polygon points="138,74 156,65 156,119 138,128" fill="#0E1113" stroke="#444C54" strokeWidth="1" />

        {/* 5 Stacked Server Blades */}
        {[0, 1, 2, 3, 4].map((blade) => {
          const by0 = 65 + blade * 10.8;
          return (
            <g key={blade}>
              {blade > 0 && (
                <line x1="120" y1={by0} x2="138" y2={by0 + 9} stroke="#2E363D" strokeWidth="1" />
              )}
              {/* Drive Bay Cutouts on Front-Left Face */}
              <line x1="123" y1={by0 + 4} x2="130" y2={by0 + 7.5} stroke="#323B42" strokeWidth="1.2" />
              <line x1="123" y1={by0 + 7} x2="130" y2={by0 + 10.5} stroke="#323B42" strokeWidth="1.2" />
              {/* Status LED */}
              <circle
                cx="134"
                cy={by0 + 7.5}
                r="0.8"
                fill={blade === 0 || blade === 2 ? "#A2FF00" : "#48535C"}
              />
              {/* Side Airflow Louvers on Front-Right Face */}
              <line x1="142" y1={by0 + 8.5} x2="151" y2={by0 + 4} stroke="#22272B" strokeWidth="0.8" />
            </g>
          );
        })}
      </g>

      {/* --- TOWER 1: TALL ENTERPRISE SERVER TOWER (MID-LEFT) --- */}
      <g>
        {/* Shadow */}
        <ellipse cx="88" cy="152" rx="20" ry="7" fill="url(#base-shadow)" opacity="0.7" />

        {/* Top Face with Angled Cooling Fins */}
        <polygon points="88,70 106,79 88,88 70,79" fill="#20252A" stroke="#555F67" strokeWidth="1" />
        <line x1="77" y1="81" x2="95" y2="72" stroke="#3D464F" strokeWidth="0.8" />
        <line x1="81" y1="83" x2="99" y2="74" stroke="#3D464F" strokeWidth="0.8" />
        <line x1="85" y1="85" x2="103" y2="76" stroke="#3D464F" strokeWidth="0.8" />

        {/* Front-Left Face (Matrix Activity LEDs & Vent) */}
        <polygon points="70,79 88,88 88,148 70,139" fill="#14181B" stroke="#444C54" strokeWidth="1" />
        {[0, 1, 2, 3, 4, 5].map((row) => (
          <g key={row}>
            <circle cx="75" cy={93 + row * 6.5} r="0.8" fill={row % 2 === 0 ? "#A2FF00" : "#323B42"} />
            <circle cx="79" cy={95 + row * 6.5} r="0.8" fill={row === 1 || row === 4 ? "#A2FF00" : "#323B42"} />
          </g>
        ))}
        <line x1="84" y1="99" x2="84" y2="135" stroke="#252C32" strokeWidth="1.2" />

        {/* Front-Right Face (Vertical Glowing Bus Bar) */}
        <polygon points="88,88 106,79 106,139 88,148" fill="#0E1113" stroke="#444C54" strokeWidth="1" />
        <line
          x1="97"
          y1="92"
          x2="97"
          y2="136"
          stroke="#A2FF00"
          strokeWidth="1.5"
          strokeLinecap="round"
          filter="url(#green-glow)"
        />
        <line x1="93" y1="97" x2="93" y2="132" stroke="#282F35" strokeWidth="0.8" />
        <line x1="101" y1="97" x2="101" y2="132" stroke="#282F35" strokeWidth="0.8" />
      </g>

      {/* --- TOWER 4: GATEWAY & CONTROLLER TOWER (MID-RIGHT) --- */}
      <g>
        {/* Shadow */}
        <ellipse cx="234" cy="152" rx="18" ry="6" fill="url(#base-shadow)" opacity="0.6" />

        {/* Top Face & Tab */}
        <polygon points="234,82 250,90 234,98 218,90" fill="#20252A" stroke="#555F67" strokeWidth="1" />
        <polygon points="230,83 238,87 238,79 230,75" fill="#2C353D" stroke="#606D78" strokeWidth="0.8" />

        {/* Front-Left Face with Status Display Window */}
        <polygon points="218,90 234,98 234,152 218,144" fill="#14181B" stroke="#444C54" strokeWidth="1" />
        <polygon points="221,98 231,103 231,118 221,113" fill="#0A0D0F" stroke="#3D4750" strokeWidth="0.8" />
        <line x1="223" y1="107" x2="229" y2="109" stroke="#A2FF00" strokeWidth="1" strokeLinecap="round" />
        <circle cx="226" cy="126" r="1.5" fill="#A2FF00" filter="url(#green-glow)" />

        {/* Front-Right Face with Dual Vents */}
        <polygon points="234,98 250,90 250,144 234,152" fill="#0E1113" stroke="#444C54" strokeWidth="1" />
        <line x1="240" y1="102" x2="240" y2="138" stroke="#2B333A" strokeWidth="1.2" />
        <line x1="244" y1="100" x2="244" y2="136" stroke="#2B333A" strokeWidth="1.2" />
      </g>

      {/* --- LAYERED FLOATING HOLOGRAPHIC PLANES (BENEATH LAPTOP) --- */}
      <g>
        {/* Tier 1 (Lowest Plane) */}
        <polygon
          points="175,142 220,161 175,180 130,161"
          fill="none"
          stroke="#2A353E"
          strokeWidth="0.8"
        />
        {/* Tier 2 (Mid Plane) */}
        <polygon
          points="175,134 220,153 175,172 130,153"
          fill="none"
          stroke="#394854"
          strokeWidth="0.8"
        />
        {/* Tier 3 (Top Active Hover Plane) */}
        <polygon
          points="175,126 220,145 175,164 130,145"
          fill="rgba(162,255,0,0.035)"
          stroke="#A2FF00"
          strokeWidth="0.9"
          opacity="0.85"
        />
      </g>

      {/* --- CENTRAL OPEN ISOMETRIC LAPTOP --- */}
      <g className={isLaptopHovered ? "drop-shadow-[0_4px_22px_rgba(162,255,0,0.22)]" : ""}>
        {/* Laptop Shadow */}
        <ellipse cx="175" cy="144" rx="28" ry="10" fill="url(#base-shadow)" opacity="0.75" />

        {/* Base Chassis (Keyboard Deck) Top Face */}
        <polygon
          points="175,114 214,132 175,150 136,132"
          fill="#1C2126"
          stroke="#5A6670"
          strokeWidth="1.1"
        />
        {/* Front-Left Face */}
        <polygon
          points="136,132 175,150 175,154 136,136"
          fill="#121518"
          stroke="#46515A"
          strokeWidth="1"
        />
        {/* Front-Right Face */}
        <polygon
          points="175,150 214,132 214,136 175,154"
          fill="#0C0E10"
          stroke="#46515A"
          strokeWidth="1"
        />

        {/* Trackpad */}
        <polygon
          points="175,139 187,144 175,149 163,144"
          fill="#14181B"
          stroke="#3E4850"
          strokeWidth="0.7"
        />

        {/* Keyboard Well & Key Grid */}
        <polygon
          points="175,118 206,132 175,140 144,132"
          fill="#101315"
          stroke="#323A42"
          strokeWidth="0.7"
        />
        {/* Isometric Key Rows */}
        <line x1="149" y1="130" x2="180" y2="120" stroke="#262D34" strokeWidth="0.8" />
        <line x1="154" y1="133" x2="185" y2="123" stroke="#262D34" strokeWidth="0.8" />
        <line x1="160" y1="136" x2="191" y2="126" stroke="#262D34" strokeWidth="0.8" />
        {/* Key Columns */}
        <line x1="165" y1="123" x2="161" y2="135" stroke="#262D34" strokeWidth="0.7" />
        <line x1="175" y1="121" x2="171" y2="133" stroke="#262D34" strokeWidth="0.7" />
        <line x1="185" y1="123" x2="181" y2="135" stroke="#262D34" strokeWidth="0.7" />

        {/* Laptop Screen Display Housing (Angled at ~75°) */}
        <polygon
          points="136,132 175,114 175,74 136,92"
          fill="#15191C"
          stroke="#6C7882"
          strokeWidth="1.2"
        />
        {/* Inner Glass Display Panel */}
        <polygon
          points="139,129 172,114 172,78 139,95"
          fill="#080A0C"
          stroke="#3E4750"
          strokeWidth="0.8"
        />

        {/* Real-Time Telemetry Waveform / Line Chart */}
        <path
          d="M 142,118 L 146,112 L 151,120 L 156,106 L 161,114 L 166,102 L 170,108"
          fill="none"
          stroke="#A2FF00"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <polygon
          points="142,122 142,118 146,112 151,120 156,106 161,114 166,102 170,108 170,118"
          fill="rgba(162,255,0,0.12)"
        />

        {/* Hexagonal Molecular / Network Node Graph (from reference image) */}
        <polygon
          points="164,84 167,86 167,89 164,91 161,89 161,86"
          fill="none"
          stroke="#4D5964"
          strokeWidth="0.7"
        />
        <polygon
          points="167,86 170,88 170,91 167,93 164,91 164,88"
          fill="none"
          stroke="#4D5964"
          strokeWidth="0.7"
        />
        <circle cx="164" cy="84" r="0.8" fill="#A2FF00" />
        <circle cx="170" cy="88" r="0.8" fill="#A2FF00" />
        <circle cx="167" cy="93" r="0.8" fill="#5A6773" />

        {/* Metric Readout Slits on Left Display */}
        <line x1="142" y1="102" x2="151" y2="100" stroke="#3A444C" strokeWidth="1" />
        <line x1="142" y1="105" x2="147" y2="103" stroke="#A2FF00" strokeWidth="1" />
        <line x1="142" y1="108" x2="153" y2="106" stroke="#3A444C" strokeWidth="1" />
      </g>

      {/* --- TOWER 3: STORAGE / EDGE UNIT (FOREGROUND LEFT) --- */}
      <g>
        {/* Shadow */}
        <ellipse cx="100" cy="192" rx="18" ry="6" fill="url(#base-shadow)" opacity="0.7" />

        {/* Top Face & Cap */}
        <polygon points="100,128 116,136 100,144 84,136" fill="#20252A" stroke="#555F67" strokeWidth="1" />
        <polygon points="100,131 108,135 100,139 92,135" fill="#293036" stroke="#66727C" strokeWidth="0.8" />

        {/* Front-Left Face with Dot Matrix LEDs */}
        <polygon points="84,136 100,144 100,188 84,180" fill="#14181B" stroke="#444C54" strokeWidth="1" />
        {[0, 1, 2, 3, 4].map((row) => (
          <g key={row}>
            <circle cx="89" cy={144 + row * 7} r="0.7" fill={row === 1 ? "#A2FF00" : "#323B42"} />
            <circle cx="93" cy={146 + row * 7} r="0.7" fill={row === 3 ? "#A2FF00" : "#323B42"} />
          </g>
        ))}

        {/* Front-Right Face with 5 Horizontal Cooling Louvers */}
        <polygon points="100,144 116,136 116,180 100,188" fill="#0E1113" stroke="#444C54" strokeWidth="1" />
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={i}
            x1="104"
            y1={152 + i * 5.5}
            x2="112"
            y2={148 + i * 5.5}
            stroke="#363F47"
            strokeWidth="1.2"
          />
        ))}
      </g>

      {/* --- FOREGROUND INTERCONNECT LINKS & ACTIVE BEACONS --- */}
      <line x1="88" y1="88" x2="100" y2="128" stroke="#323C44" strokeWidth="1" strokeDasharray="3 2" />
      <line x1="175" y1="114" x2="218" y2="90" stroke="#323C44" strokeWidth="0.9" />

      {/* Glowing Beacons on Tower Tops */}
      <circle cx="70" cy="79" r="2.2" fill="#15191C" stroke="#A2FF00" strokeWidth="0.9" />
      <circle cx="138" cy="56" r="2.5" fill="#A2FF00" filter="url(#green-glow)" />
      <circle cx="100" cy="128" r="2.2" fill="#15191C" stroke="#525E68" strokeWidth="0.8" />
      <circle cx="218" cy="90" r="2.2" fill="#15191C" stroke="#525E68" strokeWidth="0.8" />
      <circle cx="158" cy="74" r="2.5" fill="#A2FF00" filter="url(#green-glow)" />
    </TechnicalStage>
  );
}

// ===========================================================================
// ILLUSTRATION 02 — BPO SOLUTIONS
// Global Geolocation Network Globe with Teardrop Map Pins, Service Routes & Process Gears
// (Cloned from reference illustration without people)
// ===========================================================================

const BPO_LEFT_GEAR_TEETH = [
  { deg: 0, x0: 6, y0: 0, x1: 9.5, y1: 0 },
  { deg: 45, x0: 4.24, y0: 4.24, x1: 6.72, y1: 6.72 },
  { deg: 90, x0: 0, y0: 6, x1: 0, y1: 9.5 },
  { deg: 135, x0: -4.24, y0: 4.24, x1: -6.72, y1: 6.72 },
  { deg: 180, x0: -6, y0: 0, x1: -9.5, y1: 0 },
  { deg: 225, x0: -4.24, y0: -4.24, x1: -6.72, y1: -6.72 },
  { deg: 270, x0: 0, y0: -6, x1: 0, y1: -9.5 },
  { deg: 315, x0: 4.24, y0: -4.24, x1: 6.72, y1: -6.72 },
] as const;

const BPO_RIGHT_GEAR_TEETH = [
  { deg: 0, x0: 4.5, y0: 0, x1: 7.5, y1: 0 },
  { deg: 60, x0: 2.25, y0: 3.9, x1: 3.75, y1: 6.5 },
  { deg: 120, x0: -2.25, y0: 3.9, x1: -3.75, y1: 6.5 },
  { deg: 180, x0: -4.5, y0: 0, x1: -7.5, y1: 0 },
  { deg: 240, x0: -2.25, y0: -3.9, x1: -3.75, y1: -6.5 },
  { deg: 300, x0: 2.25, y0: -3.9, x1: 3.75, y1: -6.5 },
] as const;

export function BpoSolutionsFigure() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [pointer, handlers] = useFigurePointer();

  const isPin1Hovered =
    pointer !== null && Math.hypot(pointer[0] - 124, pointer[1] - 64) < 14;
  const isPin2Hovered =
    pointer !== null && Math.hypot(pointer[0] - 170, pointer[1] - 66) < 14;
  const isPin3Hovered =
    pointer !== null && Math.hypot(pointer[0] - 146, pointer[1] - 104) < 14;
  const isPin4Hovered =
    pointer !== null && Math.hypot(pointer[0] - 178, pointer[1] - 130) < 14;

  const telemetry = isPin1Hovered
    ? "AMERICAS POD: 24/7 CUSTOMER EXPERIENCE · CSAT 4.9"
    : isPin2Hovered
      ? "EMEA GATEWAY: MULTILINGUAL CX OPERATIONS"
      : isPin3Hovered
        ? "WEST AFRICA HUB: DATA PROCESSING & ANNOTATION"
        : isPin4Hovered
          ? "SOUTHERN AFRICA OPS: 420+ PODS · FCR 94.2%"
          : "GLOBAL BPO PLATFORM · 420+ PODS · FCR 94.2%";

  return (
    <TechnicalStage
      pointer={handlers}
      telemetry={telemetry}
      rootRef={rootRef}
      systemTag="SYS.02 // GLOBAL BPO"
      badgeText="BPO MESH // 420+ PODS"
      statusBadge="24/7 ACTIVE"
    >
      {/* Soft Ambient Base Shadow */}
      <ellipse cx="160" cy="186" rx="88" ry="22" fill="url(#base-shadow)" />

      {/* --- AMBIENT AURA BACKDROP (FROM REFERENCE IMAGE) --- */}
      <ellipse
        cx="160"
        cy="106"
        rx="78"
        ry="74"
        fill="rgba(162,255,0,0.03)"
        stroke="#27323C"
        strokeWidth="0.8"
        strokeDasharray="4 4"
      />

      {/* --- SWEEPING ORBITAL TRAJECTORY ARCS (OUTSIDE THE GLOBE) --- */}
      {/* Top-Left Dual Velocity Arcs */}
      <path
        d="M 108,48 C 124,34 150,30 178,34"
        stroke="#46535F"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 100,58 C 114,44 136,38 160,40"
        stroke="#28323B"
        strokeWidth="0.9"
        strokeLinecap="round"
        fill="none"
      />

      {/* Right Dual Velocity Arcs */}
      <path
        d="M 220,78 C 230,96 232,120 226,140"
        stroke="#46535F"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 226,88 C 234,104 236,124 232,138"
        stroke="#28323B"
        strokeWidth="0.9"
        strokeLinecap="round"
        fill="none"
      />

      {/* --- FLOATING BPO PROCESS GEARS (FROM REFERENCE IMAGE) --- */}
      {/* Left Process Gear Wheel (8-Teeth Gear) */}
      <g transform="translate(86, 96)">
        <circle cx="0" cy="0" r="7" fill="#14191D" stroke="#A2FF00" strokeWidth="0.9" />
        <circle cx="0" cy="0" r="3" fill="#0C0F12" stroke="#A2FF00" strokeWidth="0.7" />
        {BPO_LEFT_GEAR_TEETH.map((tooth) => (
          <line
            key={tooth.deg}
            x1={tooth.x0}
            y1={tooth.y0}
            x2={tooth.x1}
            y2={tooth.y1}
            stroke="#A2FF00"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        ))}
      </g>

      {/* Right Process Gear Wheel (6-Teeth Gear) */}
      <g transform="translate(236, 136)">
        <circle cx="0" cy="0" r="5.5" fill="#14191D" stroke="#52606D" strokeWidth="0.8" />
        <circle cx="0" cy="0" r="2.2" fill="#0C0F12" stroke="#52606D" strokeWidth="0.6" />
        {BPO_RIGHT_GEAR_TEETH.map((tooth) => (
          <line
            key={tooth.deg}
            x1={tooth.x0}
            y1={tooth.y0}
            x2={tooth.x1}
            y2={tooth.y1}
            stroke="#52606D"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        ))}
      </g>

      {/* --- TECHNICAL RETICLES & ACCENTS (FROM REFERENCE IMAGE) --- */}
      {/* Crosshair Reticle (Left) */}
      <g transform="translate(80, 126)">
        <line x1="-4" y1="0" x2="4" y2="0" stroke="#A2FF00" strokeWidth="1" />
        <line x1="0" y1="-4" x2="0" y2="4" stroke="#A2FF00" strokeWidth="1" />
        <circle cx="0" cy="0" r="1" fill="#A2FF00" />
      </g>
      {/* Crosshair Reticle (Right) */}
      <g transform="translate(228, 66)">
        <line x1="-3.5" y1="0" x2="3.5" y2="0" stroke="#485562" strokeWidth="0.9" />
        <line x1="0" y1="-3.5" x2="0" y2="3.5" stroke="#485562" strokeWidth="0.9" />
      </g>

      {/* Orbit Rings & Waypoint Marks */}
      <circle cx="154" cy="34" r="2" fill="none" stroke="#485562" strokeWidth="0.8" />
      <circle cx="82" cy="136" r="1.5" fill="none" stroke="#A2FF00" strokeWidth="0.8" />
      <polygon points="126,38 131,40 126,42" fill="#485562" />

      {/* --- CENTRAL SPHERICAL GLOBE --- */}
      {/* Atmospheric Horizon Rim Glow (Outer Halo) */}
      <circle
        cx="160"
        cy="108"
        r="56"
        fill="none"
        stroke="#A2FF00"
        strokeWidth="0.8"
        opacity="0.35"
      />

      {/* Spherical Base with Depth Lighting */}
      <circle
        cx="160"
        cy="108"
        r="54.5"
        fill="url(#globe-shading)"
        stroke="#5A6670"
        strokeWidth="1.2"
      />

      {/* CLIPPED INTERNAL GLOBE FEATURES (Sphere Surface) */}
      <g clipPath="url(#globe-sphere-clip)">
        {/* Spherical Graticule Latitude Reference Lines */}
        <ellipse
          cx="160"
          cy="108"
          rx="54.5"
          ry="16"
          fill="none"
          stroke="#262E35"
          strokeWidth="0.7"
          strokeDasharray="4 2"
        />
        <ellipse
          cx="160"
          cy="84"
          rx="48"
          ry="12"
          fill="none"
          stroke="#1F252B"
          strokeWidth="0.6"
        />
        <ellipse
          cx="160"
          cy="132"
          rx="48"
          ry="12"
          fill="none"
          stroke="#1F252B"
          strokeWidth="0.6"
        />

        {/* Spherical Graticule Longitude Meridians */}
        <ellipse
          cx="160"
          cy="108"
          rx="16"
          ry="54.5"
          fill="none"
          stroke="#1F252B"
          strokeWidth="0.6"
        />
        <ellipse
          cx="160"
          cy="108"
          rx="38"
          ry="54.5"
          fill="none"
          stroke="#22282E"
          strokeWidth="0.7"
        />

        {/* =============================================================== */}
        {/* CONTINENT SILHOUETTES MATCHING REFERENCE IMAGE VIEW */}
        {/* Europe / Eurasia at top, Africa at center-right, Americas on left */}
        {/* =============================================================== */}

        {/* AFRICA (Center-Right to South) */}
        <path
          d="M 142,82 
             C 146,81 152,79 158,80 
             C 162,82 168,84 172,82 
             C 176,81 180,83 184,84 
             C 183,89 184,95 188,100 
             C 192,102 198,104 200,109 
             C 199,115 195,121 192,127 
             C 190,133 188,141 184,147 
             C 181,152 176,155 172,155 
             C 168,155 165,150 164,144 
             C 163,137 161,126 158,120 
             C 155,116 152,117 150,114 
             C 145,114 139,112 134,110 
             C 130,105 128,99 130,93 
             C 132,87 136,81 140,78 
             C 141,77 141,81 142,82 Z"
          fill="#1C2126"
          stroke="#687682"
          strokeWidth="0.9"
        />
        {/* Madagascar */}
        <path
          d="M 194,129 C 196,133 197,139 195,145 C 193,147 191,145 191,139 C 191,133 193,129 194,129 Z"
          fill="#1C2126"
          stroke="#687682"
          strokeWidth="0.8"
        />

        {/* EUROPE & EURASIA (Top Center to North) */}
        {/* Iberian Peninsula */}
        <path
          d="M 140,80 C 137,79 135,76 135,73 C 135,70 138,69 141,69 C 144,69 146,71 144,75 C 143,78 141,80 140,80 Z"
          fill="#1C2126"
          stroke="#687682"
          strokeWidth="0.8"
        />
        {/* France & Central Europe */}
        <path
          d="M 144,70 C 142,65 146,63 150,61 C 154,60 158,61 160,65 C 161,69 157,72 153,72 C 149,72 146,71 144,70 Z"
          fill="#1C2126"
          stroke="#687682"
          strokeWidth="0.8"
        />
        {/* British Isles */}
        <path
          d="M 142,52 C 145,51 147,55 146,61 C 143,62 140,59 141,54 Z"
          fill="#1C2126"
          stroke="#687682"
          strokeWidth="0.8"
        />
        {/* Scandinavia */}
        <path
          d="M 151,47 C 155,43 161,43 163,47 C 163,52 159,57 155,56 C 152,55 150,51 151,47 Z"
          fill="#1C2126"
          stroke="#687682"
          strokeWidth="0.8"
        />
        {/* Italy Boot */}
        <path
          d="M 153,71 C 155,73 157,76 160,79 C 161,80 159,81 157,80 C 155,78 153,75 153,71 Z"
          fill="#1C2126"
          stroke="#687682"
          strokeWidth="0.7"
        />
        {/* Eastern Eurasia */}
        <path
          d="M 165,61 C 175,57 189,56 205,61 C 217,65 224,73 224,83 C 218,87 210,87 204,83 C 196,79 184,77 174,75 Z"
          fill="#1C2126"
          stroke="#687682"
          strokeWidth="0.8"
        />

        {/* AMERICAS (Atlantic Coast on Western Limb) */}
        {/* Greenland */}
        <path
          d="M 118,45 C 123,45 127,49 125,55 C 121,57 117,53 118,45 Z"
          fill="#1C2126"
          stroke="#687682"
          strokeWidth="0.8"
        />
        {/* North America East Coast */}
        <path
          d="M 115,59 C 119,63 121,70 121,77 C 122,81 123,84 120,84 C 117,83 115,78 113,72 C 112,67 113,61 115,59 Z"
          fill="#1C2126"
          stroke="#687682"
          strokeWidth="0.8"
        />
        {/* South America (Brazilian Bulge & Atlantic Coast) */}
        <path
          d="M 117,95 C 122,97 127,103 131,110 C 133,115 131,123 129,131 C 126,139 122,148 119,155 C 117,153 116,145 117,137 C 119,129 120,119 118,109 Z"
          fill="#1C2126"
          stroke="#687682"
          strokeWidth="0.8"
        />

        {/* Atmospheric Inner Glow Ring */}
        <circle
          cx="160"
          cy="108"
          r="54"
          fill="none"
          stroke="url(#atmo-glow)"
          strokeWidth="2.5"
          opacity="0.75"
        />
      </g>

      {/* =============================================================== */}
      {/* CONNECTING SERVICE ROUTE ARCS (DASHED GREEN LINES) */}
      {/* Looping between the 4 location pins exactly like the image */}
      {/* =============================================================== */}
      {/* Route 1: Pin 1 (Americas) -> Pin 2 (Europe) */}
      <path
        d="M 124,63 C 136,46 156,50 170,65"
        stroke="#A2FF00"
        strokeWidth="1.3"
        strokeDasharray="4 3"
        fill="none"
      />
      <circle cx="147" cy="53" r="1.5" fill="#A2FF00" filter="url(#green-glow)" />

      {/* Route 2: Pin 2 (Europe) -> Pin 3 (West Africa) */}
      <path
        d="M 170,65 C 172,85 160,98 146,103"
        stroke="#A2FF00"
        strokeWidth="1.3"
        strokeDasharray="4 3"
        fill="none"
      />
      <circle cx="163" cy="90" r="1.5" fill="#A2FF00" filter="url(#green-glow)" />

      {/* Route 3: Pin 3 (West Africa) -> Pin 4 (Southern Africa) */}
      <path
        d="M 146,103 C 150,124 166,134 178,129"
        stroke="#A2FF00"
        strokeWidth="1.3"
        strokeDasharray="4 3"
        fill="none"
      />
      <circle cx="160" cy="126" r="1.5" fill="#A2FF00" filter="url(#green-glow)" />

      {/* =============================================================== */}
      {/* THE 4 TEARDROP MAP PINS (EXACTLY LIKE THE REFERENCE IMAGE) */}
      {/* Anchored at Americas, Europe, West Africa, Southern Africa */}
      {/* =============================================================== */}

      {/* PIN 1: AMERICAS / UPPER-LEFT */}
      <g
        transform="translate(124, 76)"
        className={isPin1Hovered ? "drop-shadow-[0_2px_12px_rgba(162,255,0,0.4)]" : ""}
      >
        <ellipse cx="0" cy="1" rx="4.5" ry="1.8" fill="#000000" opacity="0.65" />
        <path
          d="M 0,0 C -1.6,-3.2 -6.5,-8 -6.5,-12.5 C -6.5,-16.1 -3.6,-19 0,-19 C 3.6,-19 6.5,-16.1 6.5,-12.5 C 6.5,-8 1.6,-3.2 0,0 Z"
          fill="#1A2127"
          stroke="#A2FF00"
          strokeWidth="1.2"
        />
        <circle cx="0" cy="-12.5" r="2.6" fill="#0B0E11" stroke="#A2FF00" strokeWidth="0.8" />
        <circle cx="0" cy="-12.5" r="1.3" fill="#A2FF00" filter="url(#green-glow)" />
      </g>

      {/* PIN 2: EUROPE / NORTH-ATLANTIC */}
      <g
        transform="translate(170, 78)"
        className={isPin2Hovered ? "drop-shadow-[0_2px_12px_rgba(162,255,0,0.4)]" : ""}
      >
        <ellipse cx="0" cy="1" rx="4.5" ry="1.8" fill="#000000" opacity="0.65" />
        <path
          d="M 0,0 C -1.6,-3.2 -6.5,-8 -6.5,-12.5 C -6.5,-16.1 -3.6,-19 0,-19 C 3.6,-19 6.5,-16.1 6.5,-12.5 C 6.5,-8 1.6,-3.2 0,0 Z"
          fill="#1A2127"
          stroke="#A2FF00"
          strokeWidth="1.2"
        />
        <circle cx="0" cy="-12.5" r="2.6" fill="#0B0E11" stroke="#A2FF00" strokeWidth="0.8" />
        <circle cx="0" cy="-12.5" r="1.3" fill="#A2FF00" filter="url(#green-glow)" />
      </g>

      {/* PIN 3: WEST AFRICA / CENTRAL ATLANTIC */}
      <g
        transform="translate(146, 116)"
        className={isPin3Hovered ? "drop-shadow-[0_2px_12px_rgba(162,255,0,0.4)]" : ""}
      >
        <ellipse cx="0" cy="1" rx="4.5" ry="1.8" fill="#000000" opacity="0.65" />
        <path
          d="M 0,0 C -1.6,-3.2 -6.5,-8 -6.5,-12.5 C -6.5,-16.1 -3.6,-19 0,-19 C 3.6,-19 6.5,-16.1 6.5,-12.5 C 6.5,-8 1.6,-3.2 0,0 Z"
          fill="#1A2127"
          stroke="#A2FF00"
          strokeWidth="1.2"
        />
        <circle cx="0" cy="-12.5" r="2.6" fill="#0B0E11" stroke="#A2FF00" strokeWidth="0.8" />
        <circle cx="0" cy="-12.5" r="1.3" fill="#A2FF00" filter="url(#green-glow)" />
      </g>

      {/* PIN 4: SOUTHERN AFRICA / BOTTOM CENTER */}
      <g
        transform="translate(178, 142)"
        className={isPin4Hovered ? "drop-shadow-[0_2px_12px_rgba(162,255,0,0.4)]" : ""}
      >
        <ellipse cx="0" cy="1" rx="4.5" ry="1.8" fill="#000000" opacity="0.65" />
        <path
          d="M 0,0 C -1.6,-3.2 -6.5,-8 -6.5,-12.5 C -6.5,-16.1 -3.6,-19 0,-19 C 3.6,-19 6.5,-16.1 6.5,-12.5 C 6.5,-8 1.6,-3.2 0,0 Z"
          fill="#1A2127"
          stroke="#A2FF00"
          strokeWidth="1.2"
        />
        <circle cx="0" cy="-12.5" r="2.6" fill="#0B0E11" stroke="#A2FF00" strokeWidth="0.8" />
        <circle cx="0" cy="-12.5" r="1.3" fill="#A2FF00" filter="url(#green-glow)" />
      </g>
    </TechnicalStage>
  );
}

// ===========================================================================
// ILLUSTRATION 03 — AI & DATA PLATFORM
// Authentic Isometric NPU/GPU Processor with HBM3e Memory & 3D Neural DAG Pipeline
// ===========================================================================

export function AiDataPlatformFigure() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [pointer, handlers] = useFigurePointer();

  const isChipHovered =
    pointer !== null &&
    pointer[0] >= 115 &&
    pointer[0] <= 205 &&
    pointer[1] >= 75 &&
    pointer[1] <= 145;

  const telemetry = isChipHovered
    ? "TENSOR CORE: 1536-DIM VECTOR ACCEL"
    : "AI DATA PLATFORM · 1.2M EV/S · 4.8K TOK/S";

  return (
    <TechnicalStage
      pointer={handlers}
      telemetry={telemetry}
      rootRef={rootRef}
      systemTag="SYS.03 // TENSOR NPU"
      badgeText="FP8 · 1.2M EV/S"
      statusBadge="INFERENCE RUN"
    >
      {/* Base Drop Shadow */}
      <ellipse cx="160" cy="162" rx="126" ry="44" fill="url(#base-shadow)" />

      {/* --- PCB SUBSTRATE PLATFORM --- */}
      {/* PCB Top Face */}
      <polygon
        points="160,78 282,139 160,200 38,139"
        fill="#101214"
        stroke="#484E52"
        strokeWidth="1.2"
      />
      {/* Front-Left Face */}
      <polygon
        points="38,139 160,200 160,206 38,145"
        fill="#0B0C0D"
        stroke="#33373A"
        strokeWidth="1"
      />
      {/* Front-Right Face */}
      <polygon
        points="160,200 282,139 282,145 160,206"
        fill="#070809"
        stroke="#33373A"
        strokeWidth="1"
      />
      {/* Copper Ground Plane Bevel */}
      <polygon
        points="160,86 272,142 160,192 48,142"
        fill="#131618"
        stroke="#262A2D"
        strokeWidth="0.8"
      />

      {/* Corner Mounting Screws */}
      {[
        [58, 142],
        [160, 190],
        [262, 142],
        [160, 88],
      ].map(([sx, sy], i) => (
        <circle key={i} cx={sx} cy={sy} r="2.2" fill="#1C1F22" stroke="#50565A" strokeWidth="0.7" />
      ))}

      {/* --- 3D NEURAL NETWORK DAG PIPELINE & TENSOR BUS TRACES --- */}
      {/* Node 1: Raw Telemetry Buffer (Far Left) */}
      <circle cx="76" cy="120" r="3" fill="#181B1D" stroke="#555B5E" strokeWidth="1" />
      <path d="M 76,120 L 96,120 L 116,130" stroke="#383E41" strokeWidth="1" fill="none" />

      {/* Node 2: Feature Extraction Vector Node (Front Left - Active Green) */}
      <circle cx="94" cy="160" r="3.4" fill="#181B1D" stroke="#A2FF00" strokeWidth="1.2" />
      <circle cx="94" cy="160" r="1.8" fill="#A2FF00" filter="url(#green-glow)" />
      <path d="M 94,160 L 114,160 L 134,150" stroke="#484E52" strokeWidth="1" fill="none" />
      <line x1="76" y1="120" x2="94" y2="160" stroke="#2D3235" strokeWidth="0.8" strokeDasharray="3 2" />

      {/* Node 3: Streaming Ingest Infeed (Rear Left) */}
      <circle cx="98" cy="84" r="2.8" fill="#181B1D" stroke="#555B5E" strokeWidth="1" />
      <path d="M 98,84 L 118,94 L 132,101" stroke="#383E41" strokeWidth="0.9" fill="none" />

      {/* Node 4: Vector Lakehouse Index (Top Center) */}
      <circle cx="160" cy="62" r="3.2" fill="#181B1D" stroke="#555B5E" strokeWidth="1" />
      <path d="M 160,62 L 160,78" stroke="#484E52" strokeWidth="1" fill="none" />

      {/* Node 5: Transformer Attention Matrix (Rear Right - Active Green) */}
      <circle cx="234" cy="94" r="3.4" fill="#181B1D" stroke="#A2FF00" strokeWidth="1.2" />
      <circle cx="234" cy="94" r="1.8" fill="#A2FF00" filter="url(#green-glow)" />
      <path d="M 234,94 L 208,94 L 188,104" stroke="#A2FF00" strokeWidth="1.2" fill="none" />

      {/* Node 6: Embedding Weights Buffer (Far Right) */}
      <circle cx="244" cy="140" r="3" fill="#181B1D" stroke="#555B5E" strokeWidth="1" />
      <path d="M 244,140 L 220,140 L 190,125" stroke="#383E41" strokeWidth="0.9" fill="none" />

      {/* Node 7: Autonomous Agent Dispatch Node (Front Right - Active Green) */}
      <circle cx="222" cy="168" r="3.4" fill="#181B1D" stroke="#A2FF00" strokeWidth="1.2" />
      <circle cx="222" cy="168" r="1.8" fill="#A2FF00" filter="url(#green-glow)" />
      <path d="M 222,168 L 202,168 L 182,158" stroke="#484E52" strokeWidth="1" fill="none" />
      <line x1="244" y1="140" x2="222" y2="168" stroke="#2D3235" strokeWidth="0.8" strokeDasharray="3 2" />

      {/* High-Speed Serpentine Delay-Matched Traces */}
      <path
        d="M 120,158 Q 123,162 126,158 T 132,158"
        stroke="#A2FF00"
        strokeWidth="0.8"
        fill="none"
      />
      <path
        d="M 194,158 Q 197,162 200,158 T 206,158"
        stroke="#484E52"
        strokeWidth="0.8"
        fill="none"
      />

      {/* --- FOUR HBM3E HIGH-BANDWIDTH STACKED MEMORY MODULES --- */}
      {/* Top-Left HBM Stack */}
      <g>
        <polygon points="126,88 136,93 130,99 120,94" fill="#1F2327" stroke="#4E555B" strokeWidth="0.7" />
        <line x1="123" y1="91" x2="133" y2="96" stroke="#A2FF00" strokeWidth="0.7" />
      </g>
      {/* Bottom-Left HBM Stack */}
      <g>
        <polygon points="120,102 130,107 124,113 114,108" fill="#1F2327" stroke="#4E555B" strokeWidth="0.7" />
        <line x1="117" y1="105" x2="127" y2="110" stroke="#3D4348" strokeWidth="0.7" />
      </g>
      {/* Top-Right HBM Stack */}
      <g>
        <polygon points="190,93 200,88 206,94 196,99" fill="#1F2327" stroke="#4E555B" strokeWidth="0.7" />
        <line x1="193" y1="96" x2="203" y2="91" stroke="#3D4348" strokeWidth="0.7" />
      </g>
      {/* Bottom-Right HBM Stack */}
      <g>
        <polygon points="196,107 206,102 212,108 202,113" fill="#1F2327" stroke="#4E555B" strokeWidth="0.7" />
        <line x1="199" y1="110" x2="209" y2="105" stroke="#A2FF00" strokeWidth="0.7" />
      </g>

      {/* --- SURFACE-MOUNT DECOUPLING CAPACITORS (SMD 0402 3D BLOCKS) --- */}
      {[
        [106, 114],
        [112, 117],
        [208, 114],
        [214, 117],
      ].map(([cx, cy], i) => (
        <polygon
          key={i}
          points={`${cx},${cy - 2} ${cx + 4},${cy} ${cx},${cy + 2} ${cx - 4},${cy}`}
          fill="#272B2E"
          stroke="#555B5E"
          strokeWidth="0.6"
        />
      ))}

      {/* --- CENTRAL HIGH-END TENSOR PROCESSOR (NPU PACKAGE) --- */}
      {/* Substrate Package Base */}
      <polygon
        points="160,92 210,117 160,142 110,117"
        fill="#16181B"
        stroke="#50565B"
        strokeWidth="1.2"
      />
      {/* Substrate Perimeter Contact Leads (32 Pins) */}
      {[-16, -12, -8, -4, 0, 4, 8, 12, 16].map((p) => {
        const lx0 = 136 + p * 0.8;
        const ly0 = 129 + p * 0.4;
        const lx1 = 130 + p * 0.8;
        const ly1 = 132 + p * 0.4;
        const rx0 = 184 + p * 0.8;
        const ry0 = 129 - p * 0.4;
        const rx1 = 190 + p * 0.8;
        const ry1 = 132 - p * 0.4;
        return (
          <g key={p}>
            <line x1={lx0} y1={ly0} x2={lx1} y2={ly1} stroke="#555B5E" strokeWidth="0.8" />
            <line x1={rx0} y1={ry0} x2={rx1} y2={ry1} stroke="#555B5E" strokeWidth="0.8" />
          </g>
        );
      })}

      {/* Metallic Integrated Heat Spreader (Processor Lid) */}
      <polygon
        points="160,82 200,102 160,122 120,102"
        fill="#222529"
        stroke="#687075"
        strokeWidth="1.2"
      />
      <polygon
        points="120,102 160,122 160,132 120,112"
        fill="#181B1D"
        stroke="#484E52"
        strokeWidth="1"
      />
      <polygon
        points="160,122 200,102 200,112 160,132"
        fill="#121416"
        stroke="#484E52"
        strokeWidth="1"
      />

      {/* Dual-Die Silicon Window & Etched Tensor Matrix Tiles */}
      <polygon
        points="160,88 186,101 160,114 134,101"
        fill="#191B1D"
        stroke="#3F454A"
        strokeWidth="0.8"
      />
      {/* 4x4 Tensor Core Matrix Tiles */}
      <line x1="160" y1="91" x2="160" y2="111" stroke="#555B5E" strokeWidth="0.7" />
      <line x1="142" y1="101" x2="178" y2="101" stroke="#555B5E" strokeWidth="0.7" />
      <polygon
        points="160,94 172,100 160,106 148,100"
        fill="#24282B"
        stroke="#A2FF00"
        strokeWidth="0.7"
      />

      {/* Pin 1 Status Diode (Green LED) */}
      <circle cx="126" cy="103" r="1.6" fill="#A2FF00" filter="url(#green-glow)" />
    </TechnicalStage>
  );
}

// ===========================================================================
// ILLUSTRATION 04 — MANAGED CLOUD SERVICES
// Enterprise Rack Enclosures with 3D Architectural Wireframe Cloud Canopy
// ===========================================================================

export function ManagedCloudFigure() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [pointer, handlers] = useFigurePointer();

  const isServerHovered = pointer !== null && pointer[1] > 105;
  const isCloudHovered = pointer !== null && pointer[1] <= 105;

  const telemetry = isCloudHovered
    ? "CLOUD MESH: 280+ GLOBAL POPS · ANYCAST"
    : isServerHovered
      ? "HA CLUSTERS: ACTIVE/HOT FAILOVER"
      : "MANAGED CLOUD · 99.995% UPTIME · SRE";

  return (
    <TechnicalStage
      pointer={handlers}
      telemetry={telemetry}
      rootRef={rootRef}
      systemTag="SYS.04 // CLOUD INFRA"
      badgeText="SRE // 99.995% HA"
      statusBadge="AUTO-HEAL"
    >
      {/* Ambient Base Shadow */}
      <ellipse cx="160" cy="162" rx="126" ry="44" fill="url(#base-shadow)" />

      {/* --- LOW-PROFILE ISOMETRIC BASE TRAY --- */}
      {/* Top Face */}
      <polygon
        points="160,78 282,139 160,200 38,139"
        fill="#101214"
        stroke="#484E52"
        strokeWidth="1.2"
      />
      {/* Front-Left Face */}
      <polygon
        points="38,139 160,200 160,206 38,145"
        fill="#0B0C0D"
        stroke="#33373A"
        strokeWidth="1"
      />
      {/* Front-Right Face */}
      <polygon
        points="160,200 282,139 282,145 160,206"
        fill="#070809"
        stroke="#33373A"
        strokeWidth="1"
      />
      {/* Base Inset */}
      <polygon
        points="160,86 272,142 160,192 48,142"
        fill="#131618"
        stroke="#262A2D"
        strokeWidth="0.8"
      />

      {/* Corner Hex Screws */}
      {[
        [58, 142],
        [160, 190],
        [262, 142],
        [160, 88],
      ].map(([sx, sy], i) => (
        <circle key={i} cx={sx} cy={sy} r="2.2" fill="#1C1F22" stroke="#50565A" strokeWidth="0.7" />
      ))}

      {/* Inter-Server Optical Failover Heartbeat Bus */}
      <path
        d="M 125,140 L 160,154 L 195,140"
        stroke="#484E52"
        strokeWidth="1.2"
        fill="none"
      />
      <circle cx="160" cy="154" r="2.2" fill="#A2FF00" filter="url(#green-glow)" />

      {/* --- SERVER UNIT 01: PRIMARY ENTERPRISE RACK BLADE (Left) --- */}
      <g>
        {/* Top Face */}
        <polygon
          points="105,104 138,121 105,138 72,121"
          fill="#1E2225"
          stroke="#555B5E"
          strokeWidth="1.2"
        />
        {/* Front-Left Face (Drive Bay Fascia) */}
        <polygon
          points="72,121 105,138 105,166 72,149"
          fill="#141719"
          stroke="#44494D"
          strokeWidth="1.2"
        />
        {/* Front-Right Face (Side Chassis) */}
        <polygon
          points="105,138 138,121 138,149 105,166"
          fill="#0F1113"
          stroke="#44494D"
          strokeWidth="1.2"
        />

        {/* 3 Hot-Swap 2.5" NVMe Drive Bays with Caddy Levers */}
        {[0, 1, 2].map((bay) => {
          const by = 132 + bay * 8;
          return (
            <g key={bay}>
              <line x1="77" y1={by} x2="98" y2={by + 11} stroke="#2D3235" strokeWidth="1.2" />
              <rect x="75" y={by - 1} width="2.5" height="3" rx="0.5" fill="#444A4E" />
              <circle cx="76.5" cy={by + 0.5} r="0.6" fill="#A2FF00" />
            </g>
          );
        })}

        {/* Chassis Ventilation Slits on Side Face */}
        {[0, 1, 2, 3].map((slit) => {
          const sy = 126 + slit * 5;
          return (
            <line
              key={slit}
              x1="112"
              y1={sy}
              x2="132"
              y2={sy - 10}
              stroke="#24282B"
              strokeWidth="0.8"
            />
          );
        })}

        {/* Dual Green Server Power & Activity LEDs */}
        <circle cx="100" cy="147" r="1.4" fill="#A2FF00" filter="url(#green-glow)" />
        <circle cx="100" cy="153" r="1.4" fill="#A2FF00" filter="url(#green-glow)" />
      </g>

      {/* --- SERVER UNIT 02: REDUNDANT FAILOVER RACK BLADE (Right) --- */}
      <g>
        {/* Top Face */}
        <polygon
          points="215,104 248,121 215,138 182,121"
          fill="#1E2225"
          stroke="#555B5E"
          strokeWidth="1.2"
        />
        {/* Front-Left Face */}
        <polygon
          points="182,121 215,138 215,166 182,149"
          fill="#141719"
          stroke="#44494D"
          strokeWidth="1.2"
        />
        {/* Front-Right Face (Drive Bay Fascia) */}
        <polygon
          points="215,138 248,121 248,149 215,166"
          fill="#0F1113"
          stroke="#44494D"
          strokeWidth="1.2"
        />

        {/* 3 Hot-Swap Drive Bays */}
        {[0, 1, 2].map((bay) => {
          const by = 132 + bay * 8;
          return (
            <g key={bay}>
              <line x1="187" y1={by} x2="208" y2={by + 11} stroke="#2D3235" strokeWidth="1.2" />
              <rect x="185" y={by - 1} width="2.5" height="3" rx="0.5" fill="#444A4E" />
              <circle cx="186.5" cy={by + 0.5} r="0.6" fill="#A2FF00" />
            </g>
          );
        })}

        {/* Chassis Ventilation Slits */}
        {[0, 1, 2, 3].map((slit) => {
          const sy = 126 + slit * 5;
          return (
            <line
              key={slit}
              x1="222"
              y1={sy}
              x2="242"
              y2={sy - 10}
              stroke="#24282B"
              strokeWidth="0.8"
            />
          );
        })}

        {/* Dual Green Server LEDs */}
        <circle cx="210" cy="147" r="1.4" fill="#A2FF00" filter="url(#green-glow)" />
        <circle cx="210" cy="153" r="1.4" fill="#A2FF00" filter="url(#green-glow)" />
      </g>

      {/* --- VERTICAL OPTICAL UPLINK CONDUITS WITH DATA BEAMS --- */}
      {/* Left Server Uplink */}
      <path
        d="M 105,104 L 105,78 L 138,62"
        stroke="#484E52"
        strokeWidth="1"
        fill="none"
      />
      <circle cx="105" cy="78" r="1.8" fill="#A2FF00" filter="url(#green-glow)" />

      {/* Right Server Uplink */}
      <path
        d="M 215,104 L 215,78 L 182,62"
        stroke="#484E52"
        strokeWidth="1"
        fill="none"
      />
      <circle cx="215" cy="78" r="1.8" fill="#555B5E" />

      {/* --- ARCHITECTURAL 3D WIREFRAME CLOUD CANOPY --- */}
      <g>
        {/* Tier 1: Cloud Elevation Rear Depth Wireframe */}
        <path
          d="M 120,54 
             C 120,44 130,36 142,39 
             C 147,28 162,26 172,32 
             C 180,26 193,31 196,40 
             C 204,43 208,52 202,60 
             C 205,68 198,75 190,75 
             L 128,75 
             C 118,75 115,66 120,54 Z"
          transform="translate(6, -6)"
          fill="#101315"
          stroke="#34393B"
          strokeWidth="0.8"
        />

        {/* 3D Wireframe Rib Lines connecting Front to Rear */}
        <line x1="120" y1="54" x2="126" y2="48" stroke="#2B3033" strokeWidth="0.8" />
        <line x1="142" y1="39" x2="148" y2="33" stroke="#2B3033" strokeWidth="0.8" />
        <line x1="172" y1="32" x2="178" y2="26" stroke="#2B3033" strokeWidth="0.8" />
        <line x1="196" y1="40" x2="202" y2="34" stroke="#2B3033" strokeWidth="0.8" />
        <line x1="202" y1="60" x2="208" y2="54" stroke="#2B3033" strokeWidth="0.8" />
        <line x1="190" y1="75" x2="196" y2="69" stroke="#2B3033" strokeWidth="0.8" />
        <line x1="128" y1="75" x2="134" y2="69" stroke="#2B3033" strokeWidth="0.8" />

        {/* Tier 2: Cloud Front Profile */}
        <path
          d="M 120,54 
             C 120,44 130,36 142,39 
             C 147,28 162,26 172,32 
             C 180,26 193,31 196,40 
             C 204,43 208,52 202,60 
             C 205,68 198,75 190,75 
             L 128,75 
             C 118,75 115,66 120,54 Z"
          fill="url(#cloud-depth)"
          stroke="#687075"
          strokeWidth="1.2"
        />

        {/* Internal Architectural Rib Arcs */}
        <path
          d="M 142,39 C 146,50 156,58 166,56"
          stroke="#2C3236"
          strokeWidth="0.8"
          fill="none"
        />
        <path
          d="M 172,32 C 174,44 182,50 192,48"
          stroke="#2C3236"
          strokeWidth="0.8"
          fill="none"
        />

        {/* Central Cloud Gateway Port */}
        <circle cx="160" cy="75" r="2.6" fill="#A2FF00" filter="url(#green-glow)" />
      </g>
    </TechnicalStage>
  );
}

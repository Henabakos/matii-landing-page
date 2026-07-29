"use client";

import ToolsTag from "./tools/ToolsTag";
import ToolCard from "./tools/ToolCard";

const row1Tools = [
  { name: "Next.js", category: "Frontend Framework", icon: "N" },
  { name: "React.js", category: "UI Library", icon: "R" },
  { name: "TypeScript", category: "Language", icon: "TS" },
  { name: "Tailwind CSS", category: "Styling", icon: "TW" },
  { name: "Figma", category: "UI/UX Design", icon: "F" },
  { name: "Node.js", category: "Runtime Environment", icon: "JS" },
];

const row2Tools = [
  { name: "OpenAI", category: "AI Automation", icon: "AI" },
  { name: "Docker", category: "Containerization", icon: "D" },
  { name: "AWS", category: "Cloud Infrastructure", icon: "AWS" },
  { name: "FastAPI", category: "High-Performance API", icon: "FA" },
  { name: "Vercel", category: "Deployment & Hosting", icon: "V" },
  { name: "Python", category: "AI & Data Science", icon: "PY" },
];

const row3Tools = [
  { name: "Flutter", category: "Mobile Engineering", icon: "FL" },
  { name: "GraphQL", category: "Data Query Language", icon: "GQL" },
  { name: "Supabase", category: "Backend Service", icon: "SB" },
  { name: "PostgreSQL", category: "Relational Database", icon: "PG" },
  { name: "Vue.js", category: "Frontend Framework", icon: "VUE" },
  { name: "Framer", category: "Interactive Design", icon: "FM" },
];

export function ToolsWeUse() {
  return (
    <section className="relative w-full py-12 md:py-20 px-4 md:px-8 overflow-hidden">
      {/* Custom Marquee Keyframe Animations */}
      <style jsx>{`
        @keyframes marqueeLeft {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes marqueeRight {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }

        .animate-slide-left {
          display: flex;
          width: max-content;
          animation: marqueeLeft 28s linear infinite;
        }

        .animate-slide-left:hover {
          animation-play-state: paused;
        }

        .animate-slide-right {
          display: flex;
          width: max-content;
          animation: marqueeRight 28s linear infinite;
        }

        .animate-slide-right:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-[1380px] mx-auto py-6 md:py-12 relative bg-white overflow-hidden">
        {/* Top Section Tag Badge */}
        <div className="flex justify-center mb-8">
          <ToolsTag />
        </div>

        {/* 2-Column Section Layout matching @tools-we-use design system */}
        <div className="relative w-full bg-white border border-[rgba(174,174,174,0.4)] overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          <div className="absolute bg-[#292c2e] size-1.5 bottom-0 right-0 z-10" />
          <div className="absolute bg-[#292c2e] size-1.5 bottom-0 left-0 z-10" />
          <div className="absolute bg-[#292c2e] size-1.5 top-0 right-0 z-10" />
          <div className="absolute bg-[#292c2e] size-1.5 top-0 left-0 z-10" />

          {/* Left Column: Smaller column containing text */}
          <div className="lg:col-span-4 p-8 md:p-12 flex items-center justify-start border-b lg:border-b-0 lg:border-r border-[rgba(174,174,174,0.3)]">
            <h2 className="font-inter font-medium text-3xl sm:text-4xl text-[#292c2e] leading-tight tracking-tight lowercase max-w-sm">
              tools we use to help your business
            </h2>
          </div>

          {/* Right Column: Larger column containing sliding marquee rows */}
          <div className="lg:col-span-8 py-6 md:py-8 flex flex-col justify-center gap-4 overflow-hidden relative ">
            {/* Row 1: Slides Right */}
            <div className="overflow-hidden w-full">
              <div className="animate-slide-right gap-4">
                {[...row1Tools, ...row1Tools].map((tool, idx) => (
                  <ToolCard
                    key={`r1-${idx}`}
                    name={tool.name}
                    category={tool.category}
                    icon={tool.icon}
                  />
                ))}
              </div>
            </div>

            {/* Row 2: Slides Left */}
            <div className="overflow-hidden w-full">
              <div className="animate-slide-left gap-4">
                {[...row2Tools, ...row2Tools].map((tool, idx) => (
                  <ToolCard
                    key={`r2-${idx}`}
                    name={tool.name}
                    category={tool.category}
                    icon={tool.icon}
                  />
                ))}
              </div>
            </div>

            {/* Row 3: Slides Right */}
            <div className="overflow-hidden w-full">
              <div className="animate-slide-right gap-4">
                {[...row3Tools, ...row3Tools].map((tool, idx) => (
                  <ToolCard
                    key={`r3-${idx}`}
                    name={tool.name}
                    category={tool.category}
                    icon={tool.icon}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ToolsWeUse;

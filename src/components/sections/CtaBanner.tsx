"use client";

import Image from "next/image";
import svgPaths from "@/lib/svgPaths";

function TypcnMinus() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="typcn:minus">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="20"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
        width="20"
      >
        <g id="typcn:minus">
          <path
            d={svgPaths.p1dfa7b80}
            fill="var(--fill-0, #98FF03)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame73() {
  return (
    <div className="bg-[#292c2e] drop-shadow-[0px_4px_3.4px_rgba(42,42,43,0.25)] h-[34px] relative rounded-[6px] shrink-0 w-[36px]">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center pb-[24px] pl-[26px] pr-[27px] pt-[23px] relative size-full">
          <TypcnMinus />
        </div>
      </div>
    </div>
  );
}

function Frame72() {
  return (
    <div className="content-stretch flex gap-[162px] items-start relative shrink-0 w-full">
      <p className="[word-break:break-word] capitalize font-['Urbanist:SemiBold',sans-serif] font-semibold leading-[1.25] relative shrink-0 text-[#292c2e] text-[20px] text-center whitespace-nowrap">{`Have an idea but don't know where to start?`}</p>
      <Frame73 />
    </div>
  );
}

function Frame71() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-[607px]">
      <Frame72 />
      <p className="[word-break:break-word] font-['Urbanist:Medium',sans-serif] font-medium leading-[1.25] lowercase relative shrink-0 text-[#797f8b] text-[16px] w-full">
        That’s exactly where we come in. We help shape your idea, understand the
        problem, define the right solution, and turn it into a clear digital
        product.
      </p>
    </div>
  );
}

function Frame70() {
  return (
    <div className="bg-[#f3f4f6] col-1 content-stretch drop-shadow-[0px_4px_2px_rgba(0,0,0,0.25)] flex flex-col h-[136px] items-start ml-0 mt-0 pb-[27px] pl-[36px] pr-[30px] pt-[25px] relative rounded-[2px] row-1 w-[673px]">
      <Frame71 />
    </div>
  );
}

function Group29() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="bg-[#f3f4f6] col-1 h-[136px] ml-[21px] mt-[32px] relative rounded-[10px] row-1 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] w-[673px]" />
      <div className="bg-[#292c2e] col-1 h-[136px] ml-[11px] mt-[17px] relative rounded-[4px] row-1 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] w-[673px]" />
      <Frame70 />
    </div>
  );
}

const bars = [
  "h-[280px] xl:h-[354px]",
  "h-[190px] xl:h-[239px]",
  "h-[95px] xl:h-[125px]",
];

export function CtaBanner() {
  return (
    <section className="relative w-full py-12 md:py-20 px-4 md:px-8 overflow-hidden">
      <div className="max-w-[1380px] mx-auto relative border border-[rgba(174,174,174,0.4)] min-h-[480px] md:min-h-[603px] flex flex-col items-center justify-center p-6 md:p-12 overflow-hidden">
        {/* <Image
          src="/images/cta-grid-bg.png"
          alt="Grid Pattern"
          fill
          className="object-cover size-full opacity-10 pointer-events-none"
        /> */}

        <div className="absolute inset-x-0 bottom-0 hidden lg:flex items-end pointer-events-none opacity-90 z-0">
          {[...bars, ...bars].map((height, index) => {
            const reversedIndex = index >= bars.length ? 5 - index : index;

            return (
              <div
                key={index}
                className={`flex-1 bg-[#98ff03] ${bars[reversedIndex]}`}
              />
            );
          })}
        </div>

        <div className="relative z-10 flex flex-col items-center text-center max-w-[850px] mx-auto py-8">
          <h2 className="font-space font-semibold text-3xl sm:text-5xl md:text-6xl lg:text-[76px] leading-[1.15] tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#292c2e] via-[#484c4f] to-[#848e94] mb-10">
            Have an Idea?
            <br />
            Let&apos;s Make It Move.
          </h2>

          <a
            href="https://calendly.com/motiondigitals/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 bg-[#292c2e] text-white pl-5 pr-2 py-2 rounded-[12px] shadow-lg border border-white hover:bg-[#383b3e] transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <span className="font-inter font-medium text-sm md:text-base whitespace-nowrap">
              Start Your Project
            </span>
            <div className="bg-[#98ff03] p-2 rounded-[4px] border border-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <svg className="size-4 md:size-5" fill="none" viewBox="0 0 16 16">
                <path
                  d={svgPaths.p159fbc80}
                  stroke="#292C2E"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.4"
                />
              </svg>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

export default CtaBanner;

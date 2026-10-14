import React from "react";
import Image from "next/image";

export interface TestimonialCardProps {
  quote: string;
  authorName: string;
  authorRole: string;
  avatarUrl: string;
  rating: number;
}

export function TestimonialCard({
  quote,
  authorName,
  authorRole,
  avatarUrl,
  rating,
}: TestimonialCardProps) {
  return (
    <div className="relative bg-[#f3f4f6] dark:bg-white/5 border border-[rgba(174,174,174,0.3)] dark:border-white/10 p-6 md:p-10 flex flex-col justify-between h-full min-h-80 w-full transition-colors">
      {/* Corner Accent Dot */}
      <div className="absolute bg-[#292c2e] dark:bg-white size-1.5 top-0 left-0 transition-colors" />
      <div className="absolute bg-[#292c2e] dark:bg-white size-1.5 bottom-0 right-0 transition-colors" />

      {/* Top Header: Quote Icon & Stars */}
      <div className="flex items-center justify-between gap-4 mb-6">
        {/* Dark Quote Icon Badge */}
        <div className="bg-[#292c2e] dark:bg-[#222527] dark:border dark:border-white/10 size-12 shrink-0 flex items-center justify-center p-3 text-[#98ff03] shadow-sm">
          <svg
            className="block size-full"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
        </div>

        {/* 5-Star Rating */}
        <div className="flex items-center gap-1">
          {Array.from({ length: rating }).map((_, i) => (
            <svg
              key={i}
              className="size-5 text-[#98ff03] fill-current"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </div>

      {/* Testimonial Quote */}
      <p className="font-inter font-normal text-base md:text-[18px] text-[#292c2e] dark:text-zinc-200 leading-relaxed mb-8 italic transition-colors">
        &ldquo;{quote}&rdquo;
      </p>

      {/* Author Info */}
      <div className="flex items-center gap-4 mt-auto pt-4 border-t border-[rgba(174,174,174,0.2)] dark:border-white/10">
        <div className="relative size-12 rounded-full overflow-hidden border border-white dark:border-white/20 shrink-0 shadow-sm">
          {avatarUrl && <Image
            src={avatarUrl}
            alt={authorName}
            fill
            unoptimized={true}
            sizes="48px"
            className="object-cover"
          />}
        </div>
        <div className="flex flex-col">
          <span className="font-urbanist font-medium text-base md:text-lg text-[#292c2e] dark:text-white transition-colors">
            {authorName}
          </span>
          <span className="font-inter font-normal text-xs md:text-sm text-[#797f8b] dark:text-zinc-400 transition-colors">
            {authorRole}
          </span>
        </div>
      </div>
    </div>
  );
}

export default TestimonialCard;

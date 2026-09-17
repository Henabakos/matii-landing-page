import React from "react";
import TalentPoolView from "@/components/sections/careers/TalentPoolView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Priority Global Talent Pool | Matii Digitals",
  description:
    "Join our curated engineering and design network to receive first-look access to upcoming senior technical roles, high-impact contract pods, and advisory opportunities.",
  openGraph: {
    title: "Join The Global Talent Pool | Matii Digitals",
    description:
      "Skip the automated ATS queue. Connect directly with hiring partners for full-time, fractional, and advisory digital initiatives.",
    type: "website",
  },
};

export default function TalentPoolPage() {
  return (
    <main className="w-full">
      <TalentPoolView />
    </main>
  );
}

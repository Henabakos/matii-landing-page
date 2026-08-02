import React from "react";
import CareersSection from "@/components/sections/careers/CareersSection";

export const metadata = {
  title: "Careers | Motion Digitals",
  description: "Join our team of senior software engineers, AI specialists, and UI product designers.",
};

export default function CareersPage() {
  return (
    <main className="w-full">
      <CareersSection />
    </main>
  );
}

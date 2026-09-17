import React from "react";
import InternshipsView from "@/components/sections/careers/InternshipsView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Internship & Fellowship Program | Matii Digitals",
  description:
    "Join a high-velocity, paid 3-to-6 month fellowship building production web architectures, AI pipelines, and design systems alongside senior staff engineers.",
  openGraph: {
    title: "Internships & Fellowship Program | Matii Digitals",
    description:
      "A paid, intensive early-career fellowship shipping real client production code with 1-on-1 staff architect mentorship.",
    type: "website",
  },
};

export default function InternshipsPage() {
  return (
    <main className="w-full">
      <InternshipsView />
    </main>
  );
}

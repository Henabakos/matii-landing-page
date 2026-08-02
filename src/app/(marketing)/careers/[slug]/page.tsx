import React from "react";
import CareerDetailView from "@/components/sections/careers/CareerDetailView";

export const metadata = {
  title: "Career Detail | Motion Digitals",
  description: "View job description and apply for open positions at Motion Digitals.",
};

type CareerDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CareerDetailPage({ params }: CareerDetailPageProps) {
  const { slug } = await params;
  return <CareerDetailView slug={slug} />;
}

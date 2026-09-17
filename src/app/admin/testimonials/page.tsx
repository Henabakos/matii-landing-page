import React from "react";
import { db } from "@/lib/db";
import TestimonialClientManager from "./TestimonialClientManager";

export const metadata = {
  title: "Client Testimonials Manager | Matii CMS",
};

export default async function AdminTestimonialsPage() {
  const testimonials = await db.testimonial.findMany({
    orderBy: { order: "asc" },
  });

  return <TestimonialClientManager initialTestimonials={testimonials} />;
}

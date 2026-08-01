import React from "react";
import ContactSectionWhite from "@/components/sections/ContactSectionWhite";
import Faq from "@/components/sections/Faq";

export const metadata = {
  title: "Contact Us | Motion Digitals",
  description:
    "Get in touch with Motion Digitals. Let's discuss your next digital product, software engineering, or AI automation project.",
};

export default function ContactPage() {
  return (
    <main className="w-full min-h-screen">
      {/* White Theme Contact Section */}
      <ContactSectionWhite />

      {/* FAQs Section */}
      <Faq />
    </main>
  );
}

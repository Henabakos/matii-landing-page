import PageStructuredData from "@/components/common/PageStructuredData";
import { staticPageMetadata, type LocalePageProps } from "@/lib/seo-pages";
import React from "react";
import ContactSectionWhite from "@/components/sections/ContactSectionWhite";
import Faq from "@/components/sections/Faq";


export default async function ContactPage({ params }: LocalePageProps) {
  return (<>
    <PageStructuredData path="/contact" locale={(await params).locale} />
    <div className="w-full min-h-screen">
      {/* White Theme Contact Section */}
      <ContactSectionWhite />

      {/* FAQs Section */}
      <Faq />
    </div>
  </>);
}

export function generateMetadata(props: LocalePageProps) {
  return staticPageMetadata("/contact", props);
}

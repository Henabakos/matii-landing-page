"use client";

import { usePathname } from "@/i18n/routing";
import CtaBanner from "@/components/sections/CtaBanner";
import ContactSectionWhite from "@/components/sections/ContactSectionWhite";

export default function MarketingSharedSections() {
  const pathname = usePathname();
  const isContactPage = pathname === "/contact";

  return (
    <>
      <CtaBanner />
      {!isContactPage && <ContactSectionWhite />}
    </>
  );
}

import React from "react";
import { db } from "@/lib/db";
import PartnerClientManager from "./PartnerClientManager";

export const metadata = {
  title: "Trusted Partners Manager | Matii CMS",
};

export default async function AdminPartnersPage() {
  const partners = await db.partner.findMany({
    orderBy: { order: "asc" },
  });

  return <PartnerClientManager initialPartners={partners} />;
}

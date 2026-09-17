import React from "react";
import { db } from "@/lib/db";
import InquiriesClientManager from "./InquiriesClientManager";

export const metadata = {
  title: "Contact Inquiries Inbox | Matii CMS",
};

export default async function AdminInquiriesPage() {
  const inquiries = await db.contactInquiry.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <InquiriesClientManager initialInquiries={inquiries} />;
}

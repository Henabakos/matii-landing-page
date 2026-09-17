import React from "react";
import { db } from "@/lib/db";
import KpiClientManager from "./KpiClientManager";

export const metadata = {
  title: "KPI & Metrics Manager | Matii CMS",
};

export default async function AdminKpisPage() {
  const kpis = await db.kpi.findMany({
    orderBy: { order: "asc" },
  });

  return <KpiClientManager initialKpis={kpis} />;
}

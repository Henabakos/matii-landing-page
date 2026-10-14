import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth";
import { getPillarDraft } from "@/lib/services/pillar.service";
import PillarManager from "./PillarManager";

export const metadata = { title: "Service Pillars | Matii CMS" };
export default async function PillarsAdminPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const pillars = await Promise.all((["enterprise", "bpo", "ai", "cloud"] as const).map(getPillarDraft));
  return <PillarManager initialPillars={pillars} />;
}

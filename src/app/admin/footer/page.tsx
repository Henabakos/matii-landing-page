import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth";
import { getFooterForAdmin } from "@/lib/services/footer.service";
import FooterManager from "./FooterManager";

export const metadata = { title: "Footer | Matii CMS" };

export default async function FooterAdminPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const footer = await getFooterForAdmin();
  return <FooterManager initialContent={footer.content} initialRevision={footer.revision} saved={footer.saved} />;
}

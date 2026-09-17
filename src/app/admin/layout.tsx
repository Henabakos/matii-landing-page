import React from "react";
import { isAdminAuthenticated } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuth = await isAdminAuthenticated();

  // If not authenticated, render bare children (login screen)
  if (!isAuth) {
    return <div className="min-h-screen bg-[#f3f4f6]">{children}</div>;
  }

  return (
    <div className="min-h-screen flex bg-[#f8f9fa] text-zinc-900">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader />
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto max-w-[1400px] w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

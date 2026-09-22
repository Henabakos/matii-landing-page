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
    return <div className="min-h-screen bg-[#f3f4f6] dark:bg-[#0d0e10] text-zinc-900 dark:text-zinc-100">{children}</div>;
  }

  return (
    <div className="min-h-screen flex bg-[#f8f9fa] dark:bg-[#101215] text-zinc-900 dark:text-zinc-100 transition-colors overflow-x-hidden">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0 bg-[#f8f9fa] dark:bg-[#101215] overflow-x-hidden">
        <AdminHeader />
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto overflow-x-hidden max-w-[1400px] w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

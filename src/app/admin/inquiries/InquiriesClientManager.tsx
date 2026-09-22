"use client";

import React, { useState, useTransition } from "react";
import { Mail, CheckCircle2, Clock, Archive, Trash2, Check } from "lucide-react";
import {
  updateInquiryStatusAction,
  deleteInquiryAction,
} from "@/lib/actions/inquiry.actions";
import type { ContactInquiry } from "@prisma/client";

interface InquiriesClientManagerProps {
  initialInquiries: ContactInquiry[];
}

export function InquiriesClientManager({
  initialInquiries,
}: InquiriesClientManagerProps) {
  const [inquiries, setInquiries] = useState<ContactInquiry[]>(initialInquiries);
  const [selectedInquiry, setSelectedInquiry] = useState<ContactInquiry | null>(
    null
  );
  const [isPending, startTransition] = useTransition();

  const handleUpdateStatus = (id: string, newStatus: string) => {
    startTransition(async () => {
      try {
        await updateInquiryStatusAction(id, newStatus);
        setInquiries((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, status: newStatus } : item
          )
        );
        if (selectedInquiry?.id === id) {
          setSelectedInquiry({ ...selectedInquiry, status: newStatus });
        }
      } catch (err) {
        console.error("Failed to update inquiry:", err);
      }
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this inquiry?")) return;

    startTransition(async () => {
      try {
        await deleteInquiryAction(id);
        setInquiries((prev) => prev.filter((item) => item.id !== id));
        if (selectedInquiry?.id === id) setSelectedInquiry(null);
      } catch (err) {
        console.error("Failed to delete inquiry:", err);
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#16181b] p-6 border border-zinc-200/80 dark:border-white/10 shadow-sm relative">
        <div className="absolute bg-[#292c2e] dark:bg-[#98ff03] size-[6px] -top-[3px] -left-[3px]" />
        <div className="absolute bg-[#292c2e] dark:bg-[#98ff03] size-[6px] -top-[3px] -right-[3px]" />
        <div className="absolute bg-[#292c2e] dark:bg-[#98ff03] size-[6px] -bottom-[3px] -left-[3px]" />
        <div className="absolute bg-[#292c2e] dark:bg-[#98ff03] size-[6px] -bottom-[3px] -right-[3px]" />

        <div>
          <h2 className="font-space font-medium text-xl text-[#292c2e] dark:text-zinc-100 tracking-tight">
            Client Inquiries & Project Leads
          </h2>
          <p className="font-inter text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Submissions received from the public contact forms and CTA banners.
          </p>
        </div>

        <span className="font-space text-xs font-bold text-zinc-600 dark:text-zinc-300 uppercase px-3 py-1 bg-zinc-100 dark:bg-white/10 rounded-[3px] border border-zinc-200 dark:border-white/10">
          Total Leads: {inquiries.length}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Inquiries Table / List */}
        <div className="lg:col-span-7 bg-white dark:bg-[#16181b] border border-zinc-200/80 dark:border-white/10 rounded-[4px] shadow-sm overflow-hidden">
          {inquiries.length === 0 ? (
            <div className="p-12 text-center text-zinc-400 dark:text-zinc-500 font-inter text-xs space-y-2">
              <Mail className="size-8 mx-auto text-zinc-300 dark:text-zinc-600" />
              <p>No contact form inquiries yet.</p>
            </div>
          ) : (
            <div className="divide-y divide-zinc-100 dark:divide-white/5">
              {inquiries.map((inq) => (
                <div
                  key={inq.id}
                  onClick={() => setSelectedInquiry(inq)}
                  className={`p-4 cursor-pointer transition-colors flex items-center justify-between gap-4 ${
                    selectedInquiry?.id === inq.id
                      ? "bg-zinc-100 dark:bg-white/10 border-l-2 border-[#292c2e] dark:border-[#98ff03]"
                      : "hover:bg-zinc-50 dark:hover:bg-white/[0.02]"
                  }`}
                >
                  <div className="space-y-1 max-w-[70%]">
                    <div className="flex items-center gap-2">
                      <span className="font-space font-bold text-sm text-[#292c2e] dark:text-zinc-100">
                        {inq.name}
                      </span>
                      {inq.company ? (
                        <span className="text-xs text-zinc-400 dark:text-zinc-500 font-inter">
                          ({inq.company})
                        </span>
                      ) : null}
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 font-inter truncate">
                      {inq.message}
                    </p>
                  </div>

                  <div className="text-right space-y-1">
                    <span
                      className={`text-[10px] font-space font-bold uppercase tracking-wider px-2 py-0.5 rounded-[2px] ${
                        inq.status === "NEW"
                          ? "bg-[#98ff03] text-black"
                          : inq.status === "REPLIED"
                          ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300"
                          : "bg-zinc-100 dark:bg-white/10 text-zinc-500 dark:text-zinc-400"
                      }`}
                    >
                      {inq.status}
                    </span>
                    <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-space">
                      {new Date(inq.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Detail Panel */}
        <div className="lg:col-span-5 bg-white dark:bg-[#16181b] border border-zinc-200/80 dark:border-white/10 rounded-[4px] p-6 shadow-sm relative">
          {selectedInquiry ? (
            <div className="space-y-5">
              <div className="border-b border-zinc-100 dark:border-white/10 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="font-space font-bold text-base text-[#292c2e] dark:text-zinc-100">
                    {selectedInquiry.name}
                  </h3>
                  <a
                    href={`mailto:${selectedInquiry.email}`}
                    className="text-xs text-zinc-500 dark:text-[#98ff03] hover:text-black dark:hover:underline font-mono underline"
                  >
                    {selectedInquiry.email}
                  </a>
                </div>

                <button
                  type="button"
                  onClick={() => handleDelete(selectedInquiry.id)}
                  className="p-1.5 text-zinc-400 hover:text-red-600 dark:hover:text-red-400 rounded-[3px] transition-colors"
                  title="Delete Inquiry"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs font-inter">
                <div>
                  <span className="text-[10px] uppercase font-bold text-zinc-400 dark:text-zinc-500 font-space block">
                    Service
                  </span>
                  <span className="text-zinc-800 dark:text-zinc-200">
                    {selectedInquiry.service || "General Inquiry"}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-zinc-400 dark:text-zinc-500 font-space block">
                    Budget
                  </span>
                  <span className="text-zinc-800 dark:text-zinc-200">
                    {selectedInquiry.budget || "Not Specified"}
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-zinc-400 dark:text-zinc-500 font-space block">
                  Project Message
                </span>
                <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed bg-[#f8f9fa] dark:bg-[#121417] p-3 rounded-[3px] border border-zinc-200 dark:border-white/10 whitespace-pre-wrap font-inter">
                  {selectedInquiry.message}
                </p>
              </div>

              {/* Status Updater */}
              <div className="pt-3 border-t border-zinc-100 dark:border-white/10 flex items-center gap-2">
                <span className="text-xs text-zinc-500 dark:text-zinc-400 font-space uppercase font-bold">
                  Mark as:
                </span>
                <button
                  type="button"
                  onClick={() => handleUpdateStatus(selectedInquiry.id, "READ")}
                  className="px-2.5 py-1 bg-zinc-100 dark:bg-white/10 hover:bg-zinc-200 dark:hover:bg-white/20 text-zinc-700 dark:text-zinc-200 font-space text-[10px] font-semibold uppercase rounded-[2px]"
                >
                  Read
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleUpdateStatus(selectedInquiry.id, "REPLIED")
                  }
                  className="px-2.5 py-1 bg-emerald-100 dark:bg-emerald-950/60 hover:bg-emerald-200 dark:hover:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 font-space text-[10px] font-semibold uppercase rounded-[2px]"
                >
                  Replied
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleUpdateStatus(selectedInquiry.id, "ARCHIVED")
                  }
                  className="px-2.5 py-1 bg-zinc-100 dark:bg-white/10 hover:bg-zinc-200 dark:hover:bg-white/20 text-zinc-500 dark:text-zinc-400 font-space text-[10px] font-semibold uppercase rounded-[2px]"
                >
                  Archive
                </button>
              </div>
            </div>
          ) : (
            <div className="py-16 text-center text-zinc-400 dark:text-zinc-500 font-inter text-xs">
              Select an inquiry on the left to read its full message and details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default InquiriesClientManager;

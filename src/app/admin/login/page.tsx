"use client";

import React, { useActionState } from "react";
import Link from "next/link";
import { ArrowLeft, Lock, ArrowRight, ShieldCheck } from "lucide-react";
import { loginAdminAction } from "@/lib/actions/auth.actions";

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(loginAdminAction, null);

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex items-center justify-center p-4">
      <div className="w-full max-w-md relative">
        {/* Back link */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-space uppercase tracking-wider text-zinc-600 hover:text-black transition-colors active:scale-[0.96]"
          >
            <ArrowLeft className="size-3.5" />
            <span>Return to public site</span>
          </Link>
        </div>

        {/* Login Container Box with Architectural Accents */}
        <div className="relative bg-white border border-[rgba(174,174,174,0.4)] p-8 sm:p-10 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.03)]">
          {/* Architectural Corner Accents */}
          <div className="absolute bg-[#292c2e] size-[6px] -top-[3px] -left-[3px]" />
          <div className="absolute bg-[#292c2e] size-[6px] -top-[3px] -right-[3px]" />
          <div className="absolute bg-[#292c2e] size-[6px] -bottom-[3px] -left-[3px]" />
          <div className="absolute bg-[#292c2e] size-[6px] -bottom-[3px] -right-[3px]" />

          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="size-10 bg-[#292c2e] rounded-[4px] flex items-center justify-center text-[#98ff03] font-bold text-lg shadow-sm font-space">
              M
            </div>
            <div>
              <span className="font-space uppercase tracking-[0.1em] text-xs font-bold text-[#292c2e] block">
                Matii CMS
              </span>
              <span className="font-inter text-xs text-zinc-500">
                Administration & Content Studio
              </span>
            </div>
          </div>

          <h1 className="font-space font-medium text-2xl text-[#292c2e] tracking-tight mb-2">
            Authenticate Access
          </h1>
          <p className="font-inter text-xs sm:text-sm text-zinc-600 leading-relaxed mb-6">
            Enter your admin secret key to manage KPIs, projects, partners, blogs,
            and news.
          </p>

          {/* Form */}
          <form action={formAction} className="space-y-4">
            {state?.error ? (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-[4px] font-inter">
                {state.error}
              </div>
            ) : null}

            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="block font-space text-xs uppercase tracking-wider text-zinc-700 font-semibold"
              >
                Admin Secret Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••••••••••"
                  required
                  defaultValue="motion-admin-2026"
                  className="w-full bg-[#f8f9fa] border border-zinc-300 px-3.5 py-2.5 text-sm font-mono text-zinc-900 focus:outline-none focus:border-[#292c2e] focus:bg-white rounded-[4px] transition-colors"
                />
                <Lock className="size-4 text-zinc-400 absolute right-3 top-3 pointer-events-none" />
              </div>
              <p className="text-[11px] text-zinc-400 font-inter">
                Default local dev secret: <span className="font-mono text-zinc-600">Matii-admin-2026</span>
              </p>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full mt-4 bg-[#292c2e] hover:bg-[#1a1c1d] text-white font-space text-sm uppercase tracking-wider font-semibold py-3 px-4 rounded-[4px] flex items-center justify-center gap-2 transition-all active:scale-[0.96] shadow-sm disabled:opacity-50 cursor-pointer"
            >
              <span>{isPending ? "Verifying..." : "Enter CMS Dashboard"}</span>
              <ArrowRight className="size-4 text-[#98ff03]" />
            </button>
          </form>

          {/* Footer Security Badge */}
          <div className="mt-8 pt-6 border-t border-zinc-100 flex items-center justify-center gap-2 text-zinc-400 text-xs font-inter">
            <ShieldCheck className="size-4 text-[#292c2e]" />
            <span>Encrypted Session Storage</span>
          </div>
        </div>
      </div>
    </div>
  );
}

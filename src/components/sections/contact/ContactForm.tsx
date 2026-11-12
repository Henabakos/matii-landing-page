"use client";

import React, { useState, useTransition } from "react";
import { submitContactInquiryAction } from "@/lib/actions/inquiry.actions";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";

export function ContactForm() {
  const t = useTranslations("contactSection");
  const tCommon = useTranslations("common");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    startTransition(async () => {
      try {
        const result = await submitContactInquiryAction({
          name,
          email,
          message,
        });
        if ("error" in result) return;
        setIsSubmitted(true);
        setName("");
        setEmail("");
        setMessage("");
      } catch (err) {
        console.error("Failed to submit inquiry:", err);
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full lg:max-w-[520px] flex flex-col gap-6 border-l border-[rgba(174,174,174,0.4)] p-8 md:p-16"
    >
      {isSubmitted ? (
        <div className="p-4 bg-[#292c2e] border border-[#98ff03] text-[#98ff03] rounded-[8px] flex items-center gap-3 text-sm font-space">
          <Check className="size-5 shrink-0" />
          <span>{t("successMessage")}</span>
        </div>
      ) : null}

      {/* Field 1: Your Name */}
      <div className="flex flex-col gap-3">
        <label className="font-inter font-normal text-sm md:text-base text-white uppercase tracking-wide">
          // {t("fullName")}
        </label>
        <div className="relative border-b border-[#797F8B] pb-2">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t("fullNamePlaceholder")}
            className="w-full bg-transparent font-inter font-normal text-sm md:text-base text-white placeholder-[#797f8b] focus:outline-none"
            required
          />
        </div>
      </div>

      {/* Field 2: Your Email */}
      <div className="flex flex-col gap-3">
        <label className="font-inter font-normal text-sm md:text-base text-white uppercase tracking-wide">
          // {t("emailAddress")}
        </label>
        <div className="relative border-b border-[#797F8B] pb-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("emailPlaceholder")}
            className="w-full bg-transparent font-inter font-normal text-sm md:text-base text-white placeholder-[#797f8b] focus:outline-none"
            required
          />
        </div>
      </div>

      {/* Field 3: Message */}
      <div className="flex flex-col gap-3">
        <label className="font-inter font-normal text-sm md:text-base text-white uppercase tracking-wide">
          // {t("projectDescription")}
        </label>
        <div className="relative border-b border-[#797F8B] pb-2">
          <textarea
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t("projectPlaceholder")}
            className="w-full bg-transparent font-inter font-normal text-sm md:text-base text-white placeholder-[#797f8b] focus:outline-none resize-none"
            required
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full h-[50px] mt-4 flex items-center justify-center rounded-[12px] shadow-lg text-white font-inter font-medium text-sm md:text-base whitespace-nowrap transition-all duration-300 hover:opacity-90 transform hover:-translate-y-0.5 cursor-pointer disabled:opacity-50 active:scale-[0.98]"
        style={{
          backgroundImage:
            "linear-gradient(-84.55deg, rgb(41, 44, 46) 33.1%, rgb(132, 142, 148) 148.5%)",
        }}
      >
        {isPending ? t("submitting") : tCommon("startProject")}
      </button>
    </form>
  );
}

export default ContactForm;

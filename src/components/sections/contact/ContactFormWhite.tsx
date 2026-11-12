"use client";

import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import svgPaths from "@/lib/svgPaths";
import { useTranslations } from "next-intl";
import { AlertCircle, Check } from "lucide-react";
import { submitContactInquiryAction } from "@/lib/actions/inquiry.actions";
import ServiceSelect, { type ServiceOption } from "./ServiceSelect";

const serviceOptions: ServiceOption[] = [
  { value: "Digital Products", label: "Digital Products" },
  { value: "Full-Stack Development", label: "Full-Stack Development" },
  { value: "AI Automation", label: "AI Automation" },
  { value: "Mobile Development", label: "Mobile Development" },
  { value: "Other", label: "Other Inquiry" },
];

const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Full Name is required" })
    .min(2, { message: "Name must be at least 2 characters" }),
  email: z
    .string()
    .trim()
    .min(1, { message: "Email Address is required" })
    .email({ message: "Please enter a valid email address" }),
  phone: z.string().optional(),
  service: z.string().min(1, { message: "Please select a service" }),
  message: z
    .string()
    .trim()
    .min(1, { message: "Project description is required" })
    .min(10, { message: "Project description must be at least 10 characters" }),
  hpTrap: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export function ContactFormWhite() {
  const t = useTranslations("contactSection");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "Digital Products",
      message: "",
      hpTrap: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setStatus("idle");
    try {
      const result = await submitContactInquiryAction(data);
      if ("error" in result) {
        setStatus("error");
        return;
      }
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full h-full bg-white dark:bg-[#161819] border border-[#AEAEAE]/40 dark:border-white/10 p-8 md:p-12 flex flex-col justify-between gap-8 relative"
    >
      <h3 className="font-space font-bold text-xl md:text-2xl text-black dark:text-white uppercase tracking-tight">
        {t("sendUsMessage")}
      </h3>

      <div aria-live="polite">
        {status === "success" && (
          <p className="flex items-start gap-2.5 rounded-[8px] border border-lime-700/30 bg-lime-50 px-4 py-3 font-inter text-sm text-lime-900 dark:border-[#98ff03]/40 dark:bg-[#98ff03]/10 dark:text-[#98ff03]">
            <Check className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            {t("successMessage")}
          </p>
        )}
        {status === "error" && (
          <p role="alert" className="flex items-start gap-2.5 rounded-[8px] border border-red-300 bg-red-50 px-4 py-3 font-inter text-sm text-red-800 dark:border-red-500/40 dark:bg-red-950/40 dark:text-red-300">
            <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            {t("errorMessage")}
          </p>
        )}
      </div>

      {/* Honeypot: hidden from people and assistive tech; bots that fill it are ignored. */}
      {/* Named "hpTrap" (not "website") so browser autofill never fills it for real visitors. */}
      <input type="text" tabIndex={-1} autoComplete="new-password" aria-hidden="true" className="absolute -left-[9999px] h-px w-px opacity-0" {...register("hpTrap")} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Field 1: Name */}
        <div className="flex flex-col gap-2">
          <label className="font-inter font-medium text-xs md:text-sm text-[#292c2e] dark:text-zinc-300 uppercase tracking-wide">
            {t("fullName")} *
          </label>
          <div
            className={`border-b pb-2 transition-colors ${errors.name ? "border-red-500" : "border-[#AEAEAE] dark:border-white/20"
              }`}
          >
            <input
              type="text"
              {...register("name")}
              placeholder={t("fullNamePlaceholder")}
              className="w-full bg-transparent font-inter text-sm md:text-base text-black dark:text-white placeholder-[#999] dark:placeholder-zinc-500 focus:outline-none"
            />
          </div>
          {errors.name && (
            <span className="text-xs text-red-500 font-inter">
              {errors.name.message}
            </span>
          )}
        </div>

        {/* Field 2: Email */}
        <div className="flex flex-col gap-2">
          <label className="font-inter font-medium text-xs md:text-sm text-[#292c2e] dark:text-zinc-300 uppercase tracking-wide">
            {t("emailAddress")} *
          </label>
          <div
            className={`border-b pb-2 transition-colors ${errors.email ? "border-red-500" : "border-[#AEAEAE] dark:border-white/20"
              }`}
          >
            <input
              type="email"
              {...register("email")}
              placeholder={t("emailPlaceholder")}
              className="w-full bg-transparent font-inter text-sm md:text-base text-black dark:text-white placeholder-[#999] dark:placeholder-zinc-500 focus:outline-none"
            />
          </div>
          {errors.email && (
            <span className="text-xs text-red-500 font-inter">
              {errors.email.message}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Field 3: Phone */}
        <div className="flex flex-col gap-2">
          <label className="font-inter font-medium text-xs md:text-sm text-[#292c2e] dark:text-zinc-300 uppercase tracking-wide">
            {t("phoneNumber")}
          </label>
          <div
            className={`border-b pb-2 transition-colors ${errors.phone ? "border-red-500" : "border-[#AEAEAE] dark:border-white/20"
              }`}
          >
            <input
              type="tel"
              {...register("phone")}
              placeholder={t("phoneNumberPlaceholder")}
              className="w-full bg-transparent font-inter text-sm md:text-base text-black dark:text-white placeholder-[#999] dark:placeholder-zinc-500 focus:outline-none"
            />
          </div>
          {errors.phone && (
            <span className="text-xs text-red-500 font-inter">
              {errors.phone.message}
            </span>
          )}
        </div>

        {/* Field 4: Service Interested In */}
        <div className="flex flex-col gap-2">
          <label htmlFor="contact-service" className="font-inter font-medium text-xs md:text-sm text-[#292c2e] dark:text-zinc-300 uppercase tracking-wide">
            {t("serviceNeeded")}
          </label>
          <div
            className={`border-b pb-2 transition-colors ${errors.service ? "border-red-500" : "border-[#AEAEAE] dark:border-white/20"
              }`}
          >
            <Controller
              name="service"
              control={control}
              render={({ field }) => (
                <ServiceSelect
                  id="contact-service"
                  options={serviceOptions}
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  invalid={Boolean(errors.service)}
                  aria-describedby={errors.service ? "contact-service-error" : undefined}
                />
              )}
            />
          </div>
          {errors.service && (
            <span id="contact-service-error" className="text-xs text-red-500 font-inter">
              {errors.service.message}
            </span>
          )}
        </div>
      </div>

      {/* Field 5: Message */}
      <div className="flex flex-col gap-2">
        <label className="font-inter font-medium text-xs md:text-sm text-[#292c2e] dark:text-zinc-300 uppercase tracking-wide">
          {t("projectDescription")} *
        </label>
        <div
          className={`border-b pb-2 transition-colors ${errors.message ? "border-red-500" : "border-[#AEAEAE] dark:border-white/20"
            }`}
        >
          <textarea
            rows={4}
            {...register("message")}
            placeholder={t("projectPlaceholder")}
            className="w-full bg-transparent font-inter text-sm md:text-base text-black dark:text-white placeholder-[#999] dark:placeholder-zinc-500 focus:outline-none resize-none"
          />
        </div>
        {errors.message && (
          <span className="text-xs text-red-500 font-inter">
            {errors.message.message}
          </span>
        )}
      </div>

      {/* Submit Button Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-6 pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#292c2e] hover:bg-[#1a1c1d] dark:bg-[#98ff03] dark:hover:bg-[#86e200] disabled:opacity-50 text-white dark:text-[#161819] font-inter font-medium text-sm md:text-base px-8 py-3.5 rounded-[12px] shadow-md inline-flex items-center justify-center gap-3 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer active:scale-[0.98]"
        >
          <span>{isSubmitting ? t("submitting") : t("submitMessage")}</span>
          <div className="bg-[#98ff03] dark:bg-[#161819] p-1.5 rounded-[4px] flex items-center justify-center">
            <svg className="size-4" fill="none" viewBox="0 0 24 24">
              <path
                clipRule="evenodd"
                d={svgPaths.p127c5100}
                fill="currentColor"
                className="text-[#292C2E] dark:text-[#98ff03]"
                fillRule="evenodd"
              />
            </svg>
          </div>
        </button>
      </div>
    </form>
  );
}

export default ContactFormWhite;

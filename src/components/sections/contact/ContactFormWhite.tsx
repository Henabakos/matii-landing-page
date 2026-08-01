"use client";

import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import svgPaths from "@/lib/svgPaths";

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
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export function ContactFormWhite() {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
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
    },
  });

  const handleAttachmentClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const onSubmit = (data: ContactFormValues) => {
    alert(
      `Thank you, ${data.name}! Your message has been sent to Motion Digitals.`
    );
    reset();
    setFile(null);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full bg-white border border-[#AEAEAE]/40 p-8 md:p-12 flex flex-col gap-8 relative"
    >
      <h3 className="font-space font-bold text-xl md:text-2xl text-black uppercase tracking-tight">
        Send Us A Message
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Field 1: Name */}
        <div className="flex flex-col gap-2">
          <label className="font-inter font-medium text-xs md:text-sm text-[#292c2e] uppercase tracking-wide">
            Full Name *
          </label>
          <div
            className={`border-b pb-2 transition-colors ${
              errors.name ? "border-red-500" : "border-[#AEAEAE]"
            }`}
          >
            <input
              type="text"
              {...register("name")}
              placeholder="e.g. John Doe"
              className="w-full bg-transparent font-inter text-sm md:text-base text-black placeholder-[#999] focus:outline-none"
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
          <label className="font-inter font-medium text-xs md:text-sm text-[#292c2e] uppercase tracking-wide">
            Email Address *
          </label>
          <div
            className={`border-b pb-2 transition-colors ${
              errors.email ? "border-red-500" : "border-[#AEAEAE]"
            }`}
          >
            <input
              type="email"
              {...register("email")}
              placeholder="e.g. john@example.com"
              className="w-full bg-transparent font-inter text-sm md:text-base text-black placeholder-[#999] focus:outline-none"
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
          <label className="font-inter font-medium text-xs md:text-sm text-[#292c2e] uppercase tracking-wide">
            Phone Number
          </label>
          <div
            className={`border-b pb-2 transition-colors ${
              errors.phone ? "border-red-500" : "border-[#AEAEAE]"
            }`}
          >
            <input
              type="tel"
              {...register("phone")}
              placeholder="e.g. +1 (555) 000-0000"
              className="w-full bg-transparent font-inter text-sm md:text-base text-black placeholder-[#999] focus:outline-none"
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
          <label className="font-inter font-medium text-xs md:text-sm text-[#292c2e] uppercase tracking-wide">
            Interested Service
          </label>
          <div
            className={`border-b pb-2 transition-colors ${
              errors.service ? "border-red-500" : "border-[#AEAEAE]"
            }`}
          >
            <select
              {...register("service")}
              className="w-full bg-transparent font-inter text-sm md:text-base text-black focus:outline-none cursor-pointer"
            >
              <option value="Digital Products">Digital Products</option>
              <option value="Full-Stack Development">
                Full-Stack Development
              </option>
              <option value="AI Automation">AI Automation</option>
              <option value="Mobile Development">Mobile Development</option>
              <option value="Other">Other Inquiry</option>
            </select>
          </div>
          {errors.service && (
            <span className="text-xs text-red-500 font-inter">
              {errors.service.message}
            </span>
          )}
        </div>
      </div>

      {/* Field 5: Message */}
      <div className="flex flex-col gap-2">
        <label className="font-inter font-medium text-xs md:text-sm text-[#292c2e] uppercase tracking-wide">
          Tell us about your project *
        </label>
        <div
          className={`border-b pb-2 transition-colors ${
            errors.message ? "border-red-500" : "border-[#AEAEAE]"
          }`}
        >
          <textarea
            rows={4}
            {...register("message")}
            placeholder="Briefly describe your project, goals, or scope..."
            className="w-full bg-transparent font-inter text-sm md:text-base text-black placeholder-[#999] focus:outline-none resize-none"
          />
        </div>
        {errors.message && (
          <span className="text-xs text-red-500 font-inter">
            {errors.message.message}
          </span>
        )}
      </div>

      {/* File Attachment & Submit Button Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6 pt-2">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          type="button"
          onClick={handleAttachmentClick}
          className="inline-flex items-center gap-2.5 text-[#292c2e] hover:text-[#98ff03] transition-colors cursor-pointer group"
        >
          <div className="size-6 relative shrink-0 p-1 bg-[#292c2e] group-hover:bg-[#98ff03] rounded-xs transition-colors">
            <svg className="block size-full" fill="none" viewBox="0 0 24 24">
              <path
                d={svgPaths.p8e11300}
                fill="#98FF03"
                className="group-hover:fill-[#292c2e]"
              />
            </svg>
          </div>
          <span className="font-inter font-medium text-sm text-[#292c2e]">
            {file ? `Attached: ${file.name}` : "Attach Project Brief / Specs"}
          </span>
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#292c2e] hover:bg-[#1a1c1d] disabled:opacity-50 text-white font-inter font-medium text-sm md:text-base px-8 py-3.5 rounded-[12px] shadow-md inline-flex items-center justify-center gap-3 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
        >
          <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
          <div className="bg-[#98ff03] p-1.5 rounded-[4px] flex items-center justify-center">
            <svg className="size-4" fill="none" viewBox="0 0 24 24">
              <path
                clipRule="evenodd"
                d={svgPaths.p127c5100}
                fill="#292C2E"
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

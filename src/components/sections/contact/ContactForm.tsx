"use client";

import React, { useState, useRef, useTransition } from "react";
import svgPaths from "@/lib/svgPaths";
import { submitContactInquiryAction } from "@/lib/actions/inquiry.actions";
import { Check } from "lucide-react";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAttachmentClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    startTransition(async () => {
      try {
        await submitContactInquiryAction({
          name,
          email,
          message,
        });
        setIsSubmitted(true);
        setName("");
        setEmail("");
        setMessage("");
        setFile(null);
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
          <span>Thank you! Your project inquiry has been logged with our engineering team.</span>
        </div>
      ) : null}

      {/* Field 1: Your Name */}
      <div className="flex flex-col gap-3">
        <label className="font-inter font-normal text-sm md:text-base text-white uppercase tracking-wide">
          // Your name
        </label>
        <div className="relative border-b border-[#797F8B] pb-2">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="enter your full name"
            className="w-full bg-transparent font-inter font-normal text-sm md:text-base text-white placeholder-[#797f8b] focus:outline-none lowercase"
            required
          />
        </div>
      </div>

      {/* Field 2: Your Email */}
      <div className="flex flex-col gap-3">
        <label className="font-inter font-normal text-sm md:text-base text-white uppercase tracking-wide">
          // Your e-mail
        </label>
        <div className="relative border-b border-[#797F8B] pb-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="enter your e-mail"
            className="w-full bg-transparent font-inter font-normal text-sm md:text-base text-white placeholder-[#797f8b] focus:outline-none lowercase"
            required
          />
        </div>
      </div>

      {/* Field 3: Message */}
      <div className="flex flex-col gap-3">
        <label className="font-inter font-normal text-sm md:text-base text-white uppercase tracking-wide">
          // Tell us more about the project
        </label>
        <div className="relative border-b border-[#797F8B] pb-2">
          <textarea
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Leave us message"
            className="w-full bg-transparent font-inter font-normal text-sm md:text-base text-white placeholder-[#797f8b] focus:outline-none lowercase resize-none"
            required
          />
        </div>
      </div>

      {/* Hidden File Input & Attachment Trigger */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <div
        onClick={handleAttachmentClick}
        className="flex items-center gap-2.5 cursor-pointer hover:opacity-80 transition-opacity pt-2"
      >
        <div className="size-6 relative shrink-0">
          <svg className="block size-full" fill="none" viewBox="0 0 24 24">
            <path d={svgPaths.p8e11300} fill="#98FF03" />
          </svg>
        </div>
        <span className="font-inter font-normal text-sm md:text-base text-white lowercase">
          {file ? `Attached: ${file.name}` : "Add an Attachment"}
        </span>
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
        {isPending ? "Sending Inquiry..." : "Start Your Project"}
      </button>
    </form>
  );
}

export default ContactForm;

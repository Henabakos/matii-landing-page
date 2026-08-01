"use client";

import React, { useState, useRef } from "react";
import svgPaths from "@/lib/svgPaths";

export function ContactFormWhite() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("Digital Products");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
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
    alert(`Thank you, ${name || "Friend"}! Your message has been sent to Motion Digitals.`);
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
    setFile(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-white border border-[#AEAEAE]/40 p-8 md:p-12 shadow-sm flex flex-col gap-8 relative"
    >
      {/* Corner Accents matching Design System */}
      <div className="absolute bg-[#292c2e] size-[6px] -top-[3px] -left-[3px] z-10" />
      <div className="absolute bg-[#292c2e] size-[6px] -top-[3px] -right-[3px] z-10" />
      <div className="absolute bg-[#292c2e] size-[6px] -bottom-[3px] -left-[3px] z-10" />
      <div className="absolute bg-[#292c2e] size-[6px] -bottom-[3px] -right-[3px] z-10" />

      <h3 className="font-space font-bold text-xl md:text-2xl text-black uppercase tracking-tight">
        Send Us A Message
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Field 1: Name */}
        <div className="flex flex-col gap-2">
          <label className="font-inter font-medium text-xs md:text-sm text-[#292c2e] uppercase tracking-wide">
            // Full Name *
          </label>
          <div className="border-b border-[#AEAEAE] pb-2">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. John Doe"
              className="w-full bg-transparent font-inter text-sm md:text-base text-black placeholder-[#999] focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Field 2: Email */}
        <div className="flex flex-col gap-2">
          <label className="font-inter font-medium text-xs md:text-sm text-[#292c2e] uppercase tracking-wide">
            // Email Address *
          </label>
          <div className="border-b border-[#AEAEAE] pb-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. john@example.com"
              className="w-full bg-transparent font-inter text-sm md:text-base text-black placeholder-[#999] focus:outline-none"
              required
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Field 3: Phone */}
        <div className="flex flex-col gap-2">
          <label className="font-inter font-medium text-xs md:text-sm text-[#292c2e] uppercase tracking-wide">
            // Phone Number
          </label>
          <div className="border-b border-[#AEAEAE] pb-2">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. +1 (555) 000-0000"
              className="w-full bg-transparent font-inter text-sm md:text-base text-black placeholder-[#999] focus:outline-none"
            />
          </div>
        </div>

        {/* Field 4: Service Interested In */}
        <div className="flex flex-col gap-2">
          <label className="font-inter font-medium text-xs md:text-sm text-[#292c2e] uppercase tracking-wide">
            // Interested Service
          </label>
          <div className="border-b border-[#AEAEAE] pb-2">
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full bg-transparent font-inter text-sm md:text-base text-black focus:outline-none cursor-pointer"
            >
              <option value="Digital Products">Digital Products</option>
              <option value="Full-Stack Development">Full-Stack Development</option>
              <option value="AI Automation">AI Automation</option>
              <option value="Mobile Development">Mobile Development</option>
              <option value="Other">Other Inquiry</option>
            </select>
          </div>
        </div>
      </div>

      {/* Field 5: Message */}
      <div className="flex flex-col gap-2">
        <label className="font-inter font-medium text-xs md:text-sm text-[#292c2e] uppercase tracking-wide">
          // Tell us about your project *
        </label>
        <div className="border-b border-[#AEAEAE] pb-2">
          <textarea
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Briefly describe your project, goals, or scope..."
            className="w-full bg-transparent font-inter text-sm md:text-base text-black placeholder-[#999] focus:outline-none resize-none"
            required
          />
        </div>
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
              <path d={svgPaths.p8e11300} fill="#98FF03" className="group-hover:fill-[#292c2e]" />
            </svg>
          </div>
          <span className="font-inter font-medium text-sm text-[#292c2e]">
            {file ? `Attached: ${file.name}` : "Attach Project Brief / Specs"}
          </span>
        </button>

        <button
          type="submit"
          className="bg-[#292c2e] hover:bg-[#1a1c1d] text-white font-inter font-medium text-sm md:text-base px-8 py-3.5 rounded-[12px] shadow-md inline-flex items-center justify-center gap-3 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
        >
          <span>Send Message</span>
          <div className="bg-[#98ff03] p-1.5 rounded-[4px] flex items-center justify-center">
            <svg className="size-4" fill="none" viewBox="0 0 24 24">
              <path clipRule="evenodd" d={svgPaths.p127c5100} fill="#292C2E" fillRule="evenodd" />
            </svg>
          </div>
        </button>
      </div>
    </form>
  );
}

export default ContactFormWhite;

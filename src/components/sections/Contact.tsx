"use client";

import ContactTag from "./contact/ContactTag";
import ContactForm from "./contact/ContactForm";

export function Contact() {
  return (
    <section className="relative w-full pt-4 pb-12 md:pb-20 overflow-hidden">
      <div className="max-w-345 mx-auto bg-black text-white  border border-[rgba(174,174,174,0.4)] relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Direct Contact Info Column */}
          <div className="lg:col-span-6 flex flex-col items-start p-8 md:p-16 gap-8">
            <ContactTag />

            <div className="flex flex-col gap-4 font-space font-bold text-2xl sm:text-3xl lg:text-[36px] leading-tight text-white tracking-tight">
              <a
                href="mailto:contact@motiondigitals.com"
                className="hover:text-[#98ff03] transition-colors break-all"
              >
                contact@motiondigitals.com
              </a>
              <a
                href="tel:+251945014531"
                className="hover:text-[#98ff03] transition-colors"
              >
                +(251)-945-014-531
              </a>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-6 flex justify-start lg:justify-end w-full">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;

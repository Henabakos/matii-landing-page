"use client";

import ContactTag from "./contact/ContactTag";
import ContactForm from "./contact/ContactForm";
import ContactLocations from "./contact/ContactLocations";

export function Contact() {
  return (
    <section className="relative w-full pt-4 pb-12 md:pb-16 overflow-hidden" aria-label="Contact and Global Offices">
      <div className="max-w-345 mx-auto bg-black text-white border border-[rgba(174,174,174,0.4)] relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Direct Contact Info Column */}
          <div className="lg:col-span-6 flex flex-col items-start p-8 md:p-16 gap-8 w-full">
            <ContactTag />



            {/* Global Locations Showcase */}
            <ContactLocations variant="dark" />
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

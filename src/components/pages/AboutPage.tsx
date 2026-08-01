"use client";

import AboutStory from "../sections/about/AboutStory";
import AboutCoreValues from "../sections/about/AboutCoreValues";
import AboutServicesGrid from "../sections/about/AboutServicesGrid";
import AboutWhyChooseUs from "../sections/about/AboutWhyChooseUs";
import AboutCultureBanner from "../sections/about/AboutCultureBanner";
import AboutProcessStepper from "../sections/about/AboutProcessStepper";
import AboutCaseHighlights from "../sections/about/AboutCaseHighlights";
import AboutLeadership from "../sections/about/AboutLeadership";
import AboutUs from "../common/AboutUs";

export function AboutPage() {
  return (
    <div className="w-full px-4 md:px-8 py-8">
      <div className="max-w-[1380px] mx-auto space-y-16">
        {/* Hero Section & Stats */}
        <AboutUs />

        {/* Company Story & Mission & Vision */}
        <AboutStory />

        {/* Core Values */}
        <AboutCoreValues />

        {/* Services & Expertise */}
        <AboutServicesGrid />

        {/* Why Choose Us & Industries */}
        <AboutWhyChooseUs />

        {/* Studio Atmosphere Culture Banner */}
        <AboutCultureBanner />

        {/* 7-Step Development Process Stepper */}
        <AboutProcessStepper />

        {/* Featured Case Highlights */}
        <AboutCaseHighlights />

        {/* Leadership Team */}
        <AboutLeadership />
      </div>
    </div>
  );
}

export default AboutPage;

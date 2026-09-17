"use client";

import React, { useEffect } from "react";
import Script from "next/script";

declare global {
  interface Window {
    google?: any;
    googleTranslateElementInit?: () => void;
  }
}

export function GoogleTranslateScript() {
  useEffect(() => {
    // 1. Define global element init callback for Google Translate
    window.googleTranslateElementInit = function () {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,am,om,de,pl",
            autoDisplay: false,
          },
          "google_translate_element"
        );
      }
    };

    // 2. Auto-remove Google Translate Top Banner & reset body displacement
    const suppressGoogleBanner = () => {
      if (document.body) {
        if (document.body.style.top !== "0px" && document.body.style.top !== "") {
          document.body.style.top = "0px";
        }
        if (document.body.style.position === "relative") {
          document.body.style.position = "static";
        }
      }
      const banners = document.querySelectorAll(
        ".goog-te-banner-frame, iframe.skiptranslate, .VIpgJd-ZVi9od-ORHb-OEVmcd, body > .skiptranslate"
      );
      banners.forEach((el) => {
        const htmlEl = el as HTMLElement;
        if (!htmlEl.closest(".fip-lang-wrapper")) {
          htmlEl.style.setProperty("display", "none", "important");
          htmlEl.style.setProperty("visibility", "hidden", "important");
          htmlEl.style.setProperty("height", "0px", "important");
          htmlEl.style.setProperty("width", "0px", "important");
          htmlEl.style.setProperty("opacity", "0", "important");
          htmlEl.style.setProperty("pointer-events", "none", "important");
        }
      });
    };

    const intervalId = setInterval(suppressGoogleBanner, 100);

    // 3. Neutralize mouseover background highlight events on translated elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "FONT" ||
          target.closest("font") ||
          target.classList.contains("goog-text-highlight"))
      ) {
        const fontTarget = (
          target.tagName === "FONT" ? target : target.closest("font") || target
        ) as HTMLElement;
        if (fontTarget && fontTarget.style) {
          fontTarget.style.backgroundColor = "transparent";
          fontTarget.style.boxShadow = "none";
        }
      }
    };

    document.addEventListener("mouseover", handleMouseOver, true);

    // 4. MutationObserver for continuous banner suppression
    let observer: MutationObserver | null = null;
    if (typeof window !== "undefined" && window.MutationObserver && document.body) {
      observer = new MutationObserver(() => {
        suppressGoogleBanner();
      });
      observer.observe(document.body, {
        attributes: true,
        attributeFilter: ["style", "class"],
      });
    }

    return () => {
      clearInterval(intervalId);
      document.removeEventListener("mouseover", handleMouseOver, true);
      if (observer) observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Hidden container where Google Translate injects its core controller */}
      <div
        id="google_translate_element"
        style={{
          display: "none",
          position: "absolute",
          left: "-9999px",
          top: "-9999px",
        }}
      />

      {/* Pre-script init declaration to prevent any race condition */}
      <Script
        id="google-translate-inline-init"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.googleTranslateElementInit = window.googleTranslateElementInit || function() {
              if (window.google && window.google.translate) {
                new window.google.translate.TranslateElement({
                  pageLanguage: 'en',
                  includedLanguages: 'en,am,om,de,pl',
                  autoDisplay: false
                }, 'google_translate_element');
              }
            };
          `,
        }}
      />

      {/* Official Google Translate element script */}
      <Script
        id="google-translate-api-script"
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />
    </>
  );
}

export default GoogleTranslateScript;

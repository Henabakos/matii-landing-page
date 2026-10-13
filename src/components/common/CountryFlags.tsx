import React from "react";

interface FlagProps {
  className?: string;
}

const DEFAULT_FLAG_STYLE =
  "w-[22px] h-[15px] rounded-[2px] overflow-hidden border border-black/10 dark:border-white/20 shrink-0 shadow-xs inline-block align-middle";

/**
 * United Kingdom (Union Jack) - English
 */
export function FlagUK({ className = "" }: FlagProps) {
  return (
    <svg
      viewBox="0 0 60 36"
      className={`${DEFAULT_FLAG_STYLE} ${className}`}
      aria-label="United Kingdom Flag"
    >
      <clipPath id="uk-flag-clip">
        <rect width="60" height="36" />
      </clipPath>
      <g clipPath="url(#uk-flag-clip)">
        <rect width="60" height="36" fill="#012169" />
        <path d="M0,0 L60,36 M60,0 L0,36" stroke="#FFFFFF" strokeWidth="7" />
        <path d="M0,0 L60,36 M60,0 L0,36" stroke="#C8102E" strokeWidth="2.5" />
        <path d="M30,0 v36 M0,18 h60" stroke="#FFFFFF" strokeWidth="11" />
        <path d="M30,0 v36 M0,18 h60" stroke="#C8102E" strokeWidth="6.5" />
      </g>
    </svg>
  );
}

/**
 * Oromia / Oromo (Alaabaa Oromoo) with Sacred Odaa Tree - Afaan Oromoo
 */
export function FlagOromo({ className = "" }: FlagProps) {
  return (
    <svg
      viewBox="0 0 60 36"
      className={`${DEFAULT_FLAG_STYLE} ${className}`}
      aria-label="Oromia Flag"
    >
      <rect width="60" height="12" y="0" fill="#E11D48" />
      <rect width="60" height="12" y="12" fill="#FFFFFF" />
      <rect width="60" height="12" y="24" fill="#18181B" />
      
      {/* Sacred Odaa Tree */}
      <g transform="translate(30, 18)">
        <path
          d="M -1.8,4.8 L -2.5,0.5 L -1.2,-2.2 L 1.2,-2.2 L 2.5,0.5 L 1.8,4.8 Z"
          fill="#452714"
        />
        <path d="M -3.8,4.8 Q 0,3.6 3.8,4.8 Z" fill="#452714" />
        <ellipse cx="0" cy="-3.8" rx="6.8" ry="3.8" fill="#15803D" />
        <ellipse cx="-3.6" cy="-2.4" rx="3.8" ry="2.8" fill="#16A34A" />
        <ellipse cx="3.6" cy="-2.4" rx="3.8" ry="2.8" fill="#16A34A" />
        <ellipse cx="0" cy="-5" rx="4.5" ry="2.4" fill="#22C55E" />
      </g>
    </svg>
  );
}

/**
 * Ethiopia Flag with Central Star / Pentagram Emblem - Amharic (አማርኛ)
 */
export function FlagEthiopia({ className = "" }: FlagProps) {
  return (
    <svg
      viewBox="0 0 60 36"
      className={`${DEFAULT_FLAG_STYLE} ${className}`}
      aria-label="Ethiopian Flag"
    >
      <rect width="60" height="12" y="0" fill="#078930" />
      <rect width="60" height="12" y="12" fill="#FCDD09" />
      <rect width="60" height="12" y="24" fill="#DA121A" />
      
      {/* Central Blue Disc */}
      <circle cx="30" cy="18" r="6.2" fill="#0F47AF" />
      
      {/* Yellow Star / Pentagram */}
      <polygon
        points="30,13.2 31.8,17 36,17.2 32.6,19.8 33.9,23.8 30,21.3 26.1,23.8 27.4,19.8 24,17.2 28.2,17"
        fill="#FCDD09"
      />
      <line x1="30" y1="13.2" x2="30" y2="12" stroke="#FCDD09" strokeWidth="0.7" />
      <line x1="36" y1="17.2" x2="37.2" y2="16.5" stroke="#FCDD09" strokeWidth="0.7" />
      <line x1="33.9" y1="23.8" x2="34.8" y2="24.8" stroke="#FCDD09" strokeWidth="0.7" />
      <line x1="26.1" y1="23.8" x2="25.2" y2="24.8" stroke="#FCDD09" strokeWidth="0.7" />
      <line x1="24" y1="17.2" x2="22.8" y2="16.5" stroke="#FCDD09" strokeWidth="0.7" />
    </svg>
  );
}

/**
 * Germany Flag - German (Deutsch)
 */
export function FlagGermany({ className = "" }: FlagProps) {
  return (
    <svg
      viewBox="0 0 60 36"
      className={`${DEFAULT_FLAG_STYLE} ${className}`}
      aria-label="German Flag"
    >
      <rect width="60" height="12" y="0" fill="#18181B" />
      <rect width="60" height="12" y="12" fill="#DC2626" />
      <rect width="60" height="12" y="24" fill="#FACC15" />
    </svg>
  );
}

/**
 * Poland Flag - Polish (Polski)
 */
export function FlagPoland({ className = "" }: FlagProps) {
  return (
    <svg
      viewBox="0 0 60 36"
      className={`${DEFAULT_FLAG_STYLE} ${className}`}
      aria-label="Polish Flag"
    >
      <rect width="60" height="18" y="0" fill="#FFFFFF" />
      <rect width="60" height="18" y="18" fill="#DC2626" />
    </svg>
  );
}

/**
 * United States Flag (Stars and Stripes)
 */
export function FlagUSA({ className = "" }: FlagProps) {
  return (
    <svg
      viewBox="0 0 60 36"
      className={`${DEFAULT_FLAG_STYLE} ${className}`}
      aria-label="United States Flag"
    >
      <rect width="60" height="36" fill="#B22234" />
      <path
        d="M0,2.77 h60 M0,8.31 h60 M0,13.85 h60 M0,19.38 h60 M0,24.92 h60 M0,30.46 h60"
        stroke="#FFFFFF"
        strokeWidth="2.77"
      />
      <rect width="26" height="19.4" fill="#3C3B6E" />
      <g fill="#FFFFFF" opacity="0.95">
        <circle cx="4.5" cy="3.5" r="0.9" />
        <circle cx="9.5" cy="3.5" r="0.9" />
        <circle cx="14.5" cy="3.5" r="0.9" />
        <circle cx="19.5" cy="3.5" r="0.9" />
        <circle cx="7" cy="7" r="0.9" />
        <circle cx="12" cy="7" r="0.9" />
        <circle cx="17" cy="7" r="0.9" />
        <circle cx="22" cy="7" r="0.9" />
        <circle cx="4.5" cy="10.5" r="0.9" />
        <circle cx="9.5" cy="10.5" r="0.9" />
        <circle cx="14.5" cy="10.5" r="0.9" />
        <circle cx="19.5" cy="10.5" r="0.9" />
        <circle cx="7" cy="14" r="0.9" />
        <circle cx="12" cy="14" r="0.9" />
        <circle cx="17" cy="14" r="0.9" />
        <circle cx="22" cy="14" r="0.9" />
        <circle cx="4.5" cy="17" r="0.8" />
        <circle cx="9.5" cy="17" r="0.8" />
        <circle cx="14.5" cy="17" r="0.8" />
        <circle cx="19.5" cy="17" r="0.8" />
      </g>
    </svg>
  );
}

export function CountryFlag({ code, className = "" }: { code: string; className?: string }) {
  switch (code.toLowerCase()) {
    case "us":
    case "usa":
      return <FlagUSA className={className} />;
    case "om":
      return <FlagOromo className={className} />;
    case "am":
      return <FlagEthiopia className={className} />;
    case "de":
      return <FlagGermany className={className} />;
    case "pl":
      return <FlagPoland className={className} />;
    case "en":
    default:
      return <FlagUK className={className} />;
  }
}


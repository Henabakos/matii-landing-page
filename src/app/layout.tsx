import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk, Inter, Urbanist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://Matiidigitals.com"),
  title: {
    default: "Matii Digitals | Turning Ideas Into Digital Momentum",
    template: "%s | Matii Digitals",
  },
  description: "Transforming Ideas into Digital Momentum",
  other: {
    google: "notranslate",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      translate="no"
      className={`notranslate ${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${inter.variable} ${urbanist.variable} h-full antialiased bg-background text-foreground font-sans`}
    >
      <head>
        <meta name="google" content="notranslate" />
      </head>
      <body translate="no" className="notranslate min-h-full flex flex-col bg-background text-foreground overflow-x-hidden">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

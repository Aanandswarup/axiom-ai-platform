import type { Metadata, Viewport } from "next";
import { Space_Grotesk, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/global/theme-provider";
import { SmoothScroll } from "@/components/global/smooth-scroll";
import { CustomCursor } from "@/components/global/custom-cursor";
import { ScrollProgress } from "@/components/global/scroll-progress";
import { NoiseOverlay } from "@/components/global/noise-overlay";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "AXIOM // Autonomous Multi-Agent AI Platform",
  description:
    "Deploy autonomous multi-agent engineering fleets that plan, build, test, and ship software under your supervision. Zero boilerplate, zero hallucinations, 100% velocity.",
  keywords: [
    "autonomous AI agents",
    "developer tools",
    "software engineering agents",
    "code generation",
    "multi-agent orchestration",
  ],
  authors: [{ name: "AXIOM Technologies" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${dmSans.variable} ${jetbrainsMono.variable} dark`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] antialiased selection:bg-violet-500/30 selection:text-cyan-300">
        <ThemeProvider>
          <SmoothScroll>
            <ScrollProgress />
            <CustomCursor />
            <NoiseOverlay />
            <div className="relative z-10 flex flex-col min-h-screen">
              {children}
            </div>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}

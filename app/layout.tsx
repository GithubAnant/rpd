import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { TRPCProvider } from "@/components/providers/trpc-provider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arxiv Doomscroller | Research Papers Feed",
  description:
    "Discover the latest research papers in AI, ML, and Computer Science. Your addictive feed for cutting-edge science.",
  keywords: [
    "arxiv",
    "research papers",
    "AI",
    "machine learning",
    "computer science",
    "academic",
  ],
  authors: [{ name: "Arxiv Doomscroller" }],
  openGraph: {
    title: "Arxiv Doomscroller",
    description: "Your addictive feed for cutting-edge research",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arxiv Doomscroller",
    description: "Your addictive feed for cutting-edge research",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#09090b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} antialiased bg-zinc-950 text-zinc-100`}
      >
        <TRPCProvider>
          {children}
          <ThemeToggle />
        </TRPCProvider>
        <Analytics />
      </body>
    </html>
  );
}


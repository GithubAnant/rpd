import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { TRPCProvider } from "@/components/providers/trpc-provider";
import { ServiceWorkerRegister } from "@/components/service-worker-register";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arxiv Doomscroller",
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
  authors: [
    {
      name: "Anant Singhal",
      url: "https://github.com/GithubAnant"
    }
  ],
  creator: "Anant Singhal",
  publisher: "Anant Singhal",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
    ],
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Arxiv Doomscroller",
    description: "Your addictive feed for cutting-edge research. Built by Anant Singhal - dev + builder from New Delhi.",
    type: "website",
    siteName: "Arxiv Doomscroller",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Arxiv Doomscroller",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arxiv Doomscroller",
    description: "Your addictive feed for cutting-edge research",
    creator: "@anant_hq",
    site: "@anant_hq",
    images: ["/og-image.png"],
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
          <ServiceWorkerRegister />
        </TRPCProvider>
        <Analytics />
      </body>
    </html>
  );
}


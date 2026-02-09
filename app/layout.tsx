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
  title: "Xapers | Doomscroll Papers",
  description:
    "Doomscroll research papers like you doomscroll Twitter. AI, ML, Computer Science - get your daily dose of cutting-edge science.",
  keywords: [
    "doomscroller",
    "research paper",
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
    title: "Xapers | Doomscroll Papers",
    description: "Doomscroll research papers like you doomscroll Twitter. AI, ML, Computer Science - get your daily dose of research papers here.",
    type: "website",
    siteName: "Xapers",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Xapers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Xapers | Doomscroll Papers",
    description: "Doomscroll research papers like you doomscroll Twitter. Your feed for cutting-edge AI & ML research.",
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


import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Bungee, Caveat, Space_Mono } from "next/font/google";
import { LangProvider } from "@/lib/i18n";
import "./globals.css";

const display = Bungee({ subsets: ["latin"], weight: "400", variable: "--f-display", display: "swap" });
const hand = Caveat({ subsets: ["latin"], weight: ["500", "700"], variable: "--f-hand", display: "swap" });
const mono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--f-mono", display: "swap" });
const sans = Bricolage_Grotesque({ subsets: ["latin"], variable: "--f-sans", display: "swap" });

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  metadataBase: new URL("https://renalazy.github.io"),
  title: "Renaldy Bilal Setyawan | Software Engineer · Fullstack & Data",
  description:
    "Renaldy Bilal Setyawan is a software engineer in Surabaya, Indonesia with 7+ years building fullstack products, production integrations and data analysis.",
  authors: [{ name: "Renaldy Bilal Setyawan" }],
  icons: {
    icon: [
      { url: `${base}/assets/img/r-stamp-48.png?v=2`, sizes: "48x48", type: "image/png" },
      { url: `${base}/assets/img/r-stamp-512.png?v=2`, sizes: "512x512", type: "image/png" },
    ],
    apple: `${base}/assets/img/r-stamp-180.png?v=2`,
  },
  openGraph: {
    type: "website",
    url: `${base}/`,
    title: "Renaldy Bilal Setyawan | Software Engineer",
    description: "Fullstack products, production integrations and data analysis. 7+ years.",
    images: [`${base}/assets/img/displaypic.png`],
  },
};

export const viewport: Viewport = { themeColor: "#fbf8f1" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${hand.variable} ${mono.variable} ${sans.variable}`}>
      <body>
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}

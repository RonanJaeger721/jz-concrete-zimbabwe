import type { Metadata } from "next";
import { Archivo, Space_Mono } from "next/font/google";
import "./globals.css";

const archivo = Archivo({ variable: "--font-display", subsets: ["latin"] });
const mono = Space_Mono({ variable: "--font-mono", subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://jz-concrete-zimbabwe.vercel.app"),
  title: "J Z Concrete | Ready-Mix Concrete Zimbabwe",
  description: "Premium ready-mix concrete, intelligent production, reliable delivery and technical support for projects across Zimbabwe.",
  keywords: ["ready mix concrete Zimbabwe", "concrete Harare", "J Z Concrete", "Jianzhou Concrete"],
  icons: { icon: "/jz/logo-clean.jpeg", shortcut: "/jz/logo-clean.jpeg", apple: "/jz/logo-clean.jpeg" },
  openGraph: {
    title: "J Z Concrete | If it’s not JZ, it’s not concrete",
    description: "Premium ready-mix concrete, reliable delivery and technical support across Zimbabwe.",
    images: [{ url: "/jz/og.jpeg", width: 1280, height: 960, alt: "J Z Concrete plant and fleet" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "J Z Concrete Zimbabwe",
    description: "If it’s not JZ, it’s not concrete.",
    images: ["/jz/og.jpeg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${archivo.variable} ${mono.variable}`}>{children}</body></html>;
}

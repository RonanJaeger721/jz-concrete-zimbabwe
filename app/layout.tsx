import type { Metadata } from "next";
import { Archivo, Space_Mono } from "next/font/google";
import "./globals.css";

const archivo = Archivo({ variable: "--font-display", subsets: ["latin"] });
const mono = Space_Mono({ variable: "--font-mono", subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "J Z Concrete | Ready-Mix Concrete Zimbabwe",
  description: "Premium ready-mix concrete, intelligent production, reliable delivery and technical support for projects across Zimbabwe.",
  keywords: ["ready mix concrete Zimbabwe", "concrete Harare", "J Z Concrete", "Jianzhou Concrete"],
  icons: { icon: "/jz/logo.jpeg", shortcut: "/jz/logo.jpeg", apple: "/jz/logo.jpeg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${archivo.variable} ${mono.variable}`}>{children}</body></html>;
}

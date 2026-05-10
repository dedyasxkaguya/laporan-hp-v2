import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Raleway } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css";

const geistSans = Plus_Jakarta_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Raleway({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bijak Bergawai",
  description: "Formulir Laporan Gawai Informatika SMKN 1 Jakarta",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <SpeedInsights />
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

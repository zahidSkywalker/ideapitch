import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IdeaPitch — Turn Ideas into Pitch Decks Instantly",
  description: "Type your idea, get a stunning pitch deck in 10 seconds. AI-powered, beautiful, shareable.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#09090b] text-zinc-100 font-[var(--font-geist)]">
        {children}
      </body>
    </html>
  );
}
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/ui/nav-bar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NXT",
  description: "NXT by me",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark`}
    >
      <body
        className={` antialiased bg-[#1e1f20] text-[#FAFAFA] flex flex-col min-h-full`}
      >
        <nav className="p-6 sticky top-0">
          <div className="flex w-full h-14 rounded-2xl overflow-hidden shadow-lg bg-neutral-800/90 backdrop-blur-sm px-4">
            <Navbar />
          </div>
        </nav>
        <main className="flex-grow">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}

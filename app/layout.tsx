import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/navbar/nav-bar";
import { Providers } from "./providers";

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
      className={`${geistSans.variable} ${geistMono.variable} h-full w-full dark`}
    >
      <body
        className={` antialiased bg-[#1e1f20] text-[#FAFAFA] flex flex-col w-full min-h-full h-full`}
      >
        <Providers>
          <>
            <nav className="p-6 top-0 w-full flex-1 flex left-0 fixed z-50">
              <Navbar />
            </nav>
            <main className="flex-grow pt-24">{children}</main>
            <Toaster />
          </>
        </Providers>
      </body>
    </html>
  );
}

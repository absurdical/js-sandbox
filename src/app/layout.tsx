import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JS Sandbox",
  description: "Code in JS right in your browser",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white flex flex-col min-h-screen`}
      >
        {/* Header */}
        <header className="w-full flex justify-between items-center px-6 py-4 shadow-md bg-black">
          <Link
            href="/"
            className="text-3xl text-pink-500 smiledust-font hover:text-pink-400 transition"
          >
            smiledust
          </Link>
        </header>

        {/* Main content */}
        <main className="flex-grow w-full">{children}</main>

        {/* Footer */}
        <footer className="w-full text-center text-sm text-gray-500 py-4 bg-black">
          © 2025 smiledust
        </footer>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Welcome to Digicart",
  description: "Welcome to Digicart",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`flex flex-col h-screen antialiased ${geistSans.variable} ${geistMono.variable}`}
      >
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <div className="flex-1 bg-gray-50 overflow-y-auto">{children}</div>
        </div>
      </body>
    </html>
  );
}

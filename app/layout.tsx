import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar"; // Import here
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | GSTradeLink Chitwan",
    default: "GSTradeLink | Digital Beam Balance Sales & Repair",
  },
  description:
    "Authorized dealer for digital scales, beam balances, and weighing equipment in Bharatpur, Chitwan. Expert repair services and genuine spare parts available.",
  keywords: [
    "Digital Scale",
    "Weighing Machine",
    "Bharatpur",
    "Chitwan",
    "Beam Balance Repair",
    "Industrial Scales Nepal",
  ],
  openGraph: {
    title: "GSTradeLink - Precision Weighing Solutions",
    description: "Sales and Repair of Digital Balances in Bharatpur.",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased bg-bg-main text-text-primary flex flex-col min-h-screen`}
      >
        <Navbar />
        <main className="flex-grow">{children}</main>{" "}
        {/* Make main grow to push footer down */}
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}

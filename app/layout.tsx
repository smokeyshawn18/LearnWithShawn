import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import Footer from "@/components/Footer";
import InstallPopup from "@/components/InstallPopUp";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ShawnLearn - Your eBook Learning Hub",
  description: "Discover eBooks for web development and more at ShawnLearn.",
  manifest: "/manifest.json", // Optional, also include manually below
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#317EFB" />
          <link
            rel="apple-touch-icon"
            sizes="192x192"
            href="/icons/icon-192x192.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="512x512"
            href="/icons/icon-512x512.png"
          />
        </head>
        <body className={inter.className}>
          <Navbar />
          <main>
            {children}
            <InstallPopup />
          </main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}

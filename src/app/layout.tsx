/** @format */

import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

import { Suspense } from "react";

import { TanstackProvider } from "../lib/tanstack";

import Navbar from "@/components/atomic/navbar";
import Footer from "@/components/atomic/footer";
import LoadingPage from "@/components/atomic/loading";
import { AssetProvider } from "@/components/AssetProvider";

import "@/styles/globals.css";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://compro.example.com";

export const metadata: Metadata = {
  title: "Excelearn",
  description: "Company Profile",
  metadataBase: new URL(BASE_URL),
  icons: {
    icon: "/logo-simple.png",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: BASE_URL,
  },
};

const Mont = Montserrat({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={Mont.className}>
      <body>
        <Suspense fallback={<LoadingPage />}>
          <TanstackProvider>
            <AssetProvider>
              <Navbar />
              {children}
              <Footer />
            </AssetProvider>
          </TanstackProvider>
        </Suspense>
      </body>
    </html>
  );
}

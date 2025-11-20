/** @format */

import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

import { Suspense } from "react";

import { TanstackProvider } from "../lib/tanstack";

import Navbar from "@/components/atomic/navbar";
import Footer from "@/components/atomic/footer";
import LoadingPage from "@/components/atomic/loading";

import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Excelearn",
  description: "Company Profile",
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
            <Navbar />
            {children}
            <Footer />
          </TanstackProvider>
        </Suspense>
      </body>
    </html>
  );
}

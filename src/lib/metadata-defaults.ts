import type { Metadata } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://excelearn.example.com";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Executrain",
  description: "Company Profile",
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

export const pageMetadataDefaults = {
  home: {
    title: "Executrain - Company Profile",
    description: "Executrain company profile and solutions",
    type: "website",
  },
  about: {
    title: "About Us - Executrain",
    description: "Learn more about Executrain company",
    type: "website",
  },
  contact: {
    title: "Contact Us - Executrain",
    description: "Get in touch with Executrain team",
    type: "website",
  },
  product: {
    title: "Our Products - Executrain",
    description: "Explore our products and solutions",
    type: "website",
  },
  schedule: {
    title: "Schedule - Executrain",
    description: "View our schedule and availability",
    type: "website",
  },
  service: {
    title: "Services - Executrain",
    description: "Discover our services",
    type: "website",
  },
};

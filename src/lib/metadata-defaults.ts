import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://excelearn.example.com';

export const defaultMetadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: 'Excecutrain',
  description: 'Company Profile',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: BASE_URL,
  },
};

export const pageMetadataDefaults = {
  home: {
    title: 'Excecutrain - Company Profile',
    description: 'Excecutrain company profile and solutions',
    type: 'website',
  },
  about: {
    title: 'About Us - Excecutrain',
    description: 'Learn more about Excecutrain company',
    type: 'website',
  },
  contact: {
    title: 'Contact Us - Excecutrain',
    description: 'Get in touch with Excecutrain team',
    type: 'website',
  },
  product: {
    title: 'Our Products - Excecutrain',
    description: 'Explore our products and solutions',
    type: 'website',
  },
  schedule: {
    title: 'Schedule - Excecutrain',
    description: 'View our schedule and availability',
    type: 'website',
  },
  service: {
    title: 'Services - Excecutrain',
    description: 'Discover our services',
    type: 'website',
  },
};

import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://excelearn.example.com';

export const defaultMetadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: 'Excelearn',
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
    title: 'Excelearn - Company Profile',
    description: 'Excelearn company profile and solutions',
    type: 'website',
  },
  about: {
    title: 'About Us - Excelearn',
    description: 'Learn more about Excelearn company',
    type: 'website',
  },
  contact: {
    title: 'Contact Us - Excelearn',
    description: 'Get in touch with Excelearn team',
    type: 'website',
  },
  product: {
    title: 'Our Products - Excelearn',
    description: 'Explore our products and solutions',
    type: 'website',
  },
  schedule: {
    title: 'Schedule - Excelearn',
    description: 'View our schedule and availability',
    type: 'website',
  },
  service: {
    title: 'Services - Excelearn',
    description: 'Discover our services',
    type: 'website',
  },
};

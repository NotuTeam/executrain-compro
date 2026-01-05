/** @format */

import type { Metadata } from 'next';
import { getPageMetadata, generateMetadataObject } from '@/lib/metadata-api';
import Container from '@/components/atomic/container';
import HeroAbout from '@/components/hero/heroabout';
import PartnerList from '@/components/partnerlist';
import ProductList from '@/components/productlist';
import ServiceList from '@/components/servicelist';
import Statistic from '@/components/statistic';
import Visi from '@/components/visi';
import WhyChoose from '@/components/whychoose';
import CTA from '@/components/cta';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://excelearn.example.com';

// Fetch and generate metadata from API
export async function generateMetadata(): Promise<Metadata> {
  const pageMetadata = await getPageMetadata('about');
  
  if (pageMetadata) {
    return generateMetadataObject(pageMetadata, `${BASE_URL}/about`) || defaultMetadata;
  }
  
  return defaultMetadata;
}

const defaultMetadata: Metadata = {
  title: 'About Us - Excelearn',
  description: 'Learn more about Excelearn and our mission',
};

// Note: This component will be converted to Client Component for data fetching
// The metadata will be generated server-side at build/request time
async function AboutPageContent() {
  // Fetch data needed for page (if any server-side data is required)
  return (
    <Container>
      <HeroAbout />
      <Visi />
      <PartnerList data={[]} />
      <Statistic />
      <ServiceList />
      <ProductList data={[]} />
      <WhyChoose />
      <CTA />
    </Container>
  );
}

export default AboutPageContent;

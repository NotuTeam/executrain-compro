/** @format */

"use client";

import Container from "@/components/atomic/container";
import Hero from "@/components/hero/hero";
import AboutSection from "@/components/about";
import PartnerList from "@/components/partnerlist";
import ProductList from "@/components/productlist";
import ScheduleList from "@/components/schedulelist";
import ServiceList from "@/components/servicelist";
import Statistic from "@/components/statistic";
import WhyChoose from "@/components/whychoose";

import { usePartner } from "@/services/partner/hook";
import { useProduct } from "@/services/product/hook";
import { useSchedule } from "@/services/schedule/hook";

export default function Home() {
  const { data: partner = [], isLoading: partnerLoading } = usePartner();
  const { data: product = [], isLoading: productLoading } = useProduct();
  const { data: schedule = [], isLoading: scheduleLoading } = useSchedule();

  return (
    <Container>
      <Hero />
      <AboutSection />
      <PartnerList data={partner} isLoading={partnerLoading} />
      <Statistic />
      <ServiceList />
      <ProductList data={product} isLoading={productLoading} />
      <ScheduleList data={schedule} isLoading={scheduleLoading} />
      <WhyChoose />
    </Container>
  );
}

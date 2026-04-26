/** @format */

"use client";

import { useState } from "react";

import Container from "@/components/atomic/container";
import Hero from "@/components/hero/hero";
import FrameworkBanner from "@/components/frameworkHome";
import PartnerList from "@/components/partnerlist";
import ScheduleList from "@/components/schedulelist";
import ServiceList from "@/components/servicelist";
import WhyChoose from "@/components/whychoose";
import CTA from "@/components/cta";

import { usePartner } from "@/services/partner/hook";
import { useSchedule } from "@/services/schedule/hook";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: partner = [], isLoading: partnerLoading } = usePartner();
  const { data: schedule = [], isLoading: scheduleLoading } = useSchedule();

  return (
    <Container>
      <Hero searchValue={searchTerm} onSearchChange={setSearchTerm} />
      <FrameworkBanner />
      <ServiceList searchTerm={searchTerm} />
      <PartnerList data={partner} isLoading={partnerLoading} />
      <ScheduleList data={schedule} isLoading={scheduleLoading} />
      <WhyChoose />
      <section className="py-10 w-full">
        <CTA />
      </section>
    </Container>
  );
}

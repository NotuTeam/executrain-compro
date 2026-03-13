/** @format */

"use client";

import Container from "@/components/atomic/container";
import Hero from "@/components/hero/hero";
import PartnerList from "@/components/partnerlist";
import ScheduleList from "@/components/schedulelist";
import ServiceList from "@/components/servicelist";
import Statistic from "@/components/statistic";
import WhyChoose from "@/components/whychoose";

import { usePartner } from "@/services/partner/hook";
import { useSchedule } from "@/services/schedule/hook";

export default function Home() {
  const { data: partner = [], isLoading: partnerLoading } = usePartner();
  const { data: schedule = [], isLoading: scheduleLoading } = useSchedule();

  return (
    <Container>
      <Hero />
      <ServiceList />
      <Statistic />
      <PartnerList data={partner} isLoading={partnerLoading} />
      <ScheduleList data={schedule} isLoading={scheduleLoading} />
      <WhyChoose />
    </Container>
  );
}

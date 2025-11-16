/** @format */

"use client";

import { useParams } from "next/navigation";

import Container from "@/components/atomic/container";
import HeroScheduleDetail from "@/components/hero/heroscheduledetail";
import WhyChoose from "@/components/whychoose";

import { useScheduleDetail } from "@/services/schedule/hook";

export default function ScheduleDetail() {
  const params = useParams();
  const { id } = params;

  const { data, isLoading } = useScheduleDetail({ id: id as string });

  return (
    <Container>
      <HeroScheduleDetail data={data} />
      <div className="px-[10%] py-[5%] space-y-5">
        <p>{data?.schedule_description}</p>
      </div>
      <div className="pb-[5%] px-[5%] md:px-[15%] space-y-10">
        <h4 className="text-[49px] text-center font-semibold">
          {"What You'll Learn"}
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {data?.benefits?.map((each: string, index: number) => (
            <div
              className="bg-white/50 backdrop-blur-md border border-white/20 shadow-xl p-5 rounded-3xl text-[24px] flex flex-col items-center gap-5"
              key={index}
            >
              <span>{each}</span>
              <div className="w-[50%] border" />
            </div>
          ))}
        </div>
      </div>
      <WhyChoose />
    </Container>
  );
}

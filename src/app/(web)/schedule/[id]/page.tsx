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
      <div
        className="px-[10%] py-[5%] space-y-5 min-h-[60dvh]"
        style={{
          backgroundImage: `url('./body.png'), url('./body.png')`,
          backgroundSize: "20%",
          backgroundPosition: "-10% 80%, 110% 40%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <p>{data?.schedule_description}</p>
      </div>
      <div className="pb-[5%] px-[5%] md:px-[15%] space-y-10">
        <h4 className="text-[49px] text-center font-semibold">
          {"What You'll Learn"}
        </h4>
        <div className="flex items-center justify-center flex-wrap gap-5">
          {data?.benefits?.map((each: string, index: number) => (
            <div
              className="w-[100%] md:w-[23%] bg-white/50 backdrop-blur-md border border-white/20 shadow-xl p-5 rounded-3xl text-[24px] flex flex-col items-center gap-5"
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

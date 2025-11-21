/** @format */

"use client";

import { useRouter } from "next/navigation";

import Button from "./atomic/button";
import ScheduleCard from "./atomic/schedulecard";
import TestimoniList from "./testimonilist";

import { ArrowRightFromLine } from "lucide-react";

import { ScheduleProps } from "@/types/schedule";

interface CompProps {
  data?: ScheduleProps[];
}

export default function ScheduleList({ data = [] }: CompProps) {
  const router = useRouter();

  function updateScheduleStatus(schedules: ScheduleProps[]): ScheduleProps[] {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return schedules
      .filter((schedule) => {
        const scheduleDate = new Date(schedule.schedule_date);
        scheduleDate.setHours(0, 0, 0, 0);

        const dayDiff = scheduleDate.getTime() - today.getTime();
        const days = dayDiff / (1000 * 3600 * 24);

        if (days > 0) return schedule;
      })
      ?.map((schedule) => {
        const scheduleDate = new Date(schedule.schedule_date);
        scheduleDate.setHours(0, 0, 0, 0);

        const dayDiff = scheduleDate.getTime() - today.getTime();

        const days = dayDiff / (1000 * 3600 * 24);

        if (days < 0) return { ...schedule, status: "ENDED" };
        if (days === 0) return { ...schedule, status: "ON_GOING" };
        return schedule;
      });
  }

  return (
    <div
      className="w-full text-white flex flex-col items-center justify-center text-center py-[5%] space-y-5 px-[5%] md:px-0 border-white border-b-5 box-border"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 58, 79, 0.8) 20%, rgba(255,255,255) 80%), url('./hero4.webp')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h2 className="font-semibold text-[32px] md:text-[40px] lg:text-[49px] mb-6 md:mb-10">
        Running Schedule
      </h2>
      <div className="flex flex-col w-full px-0 md:px-[7%] lg:px-[10%] gap-4 md:gap-5 mb-6 md:mb-8">
        {updateScheduleStatus(data)?.map(
          (each: ScheduleProps, index: number) => (
            <ScheduleCard key={index} data={each} />
          )
        )}
      </div>
      <Button
        label="Load More"
        rounded
        type="primary"
        icon={<ArrowRightFromLine size={18} />}
        onClick={() => router.push("/schedule")}
      />
      <TestimoniList />
    </div>
  );
}

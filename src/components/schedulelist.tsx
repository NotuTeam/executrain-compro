/** @format */

"use client";

import { useRouter } from "next/navigation";

import Button from "./atomic/button";
import ScheduleCard from "./atomic/schedulecard";
import TestimoniList from "./testimonilist";
import { ScheduleCardSkeleton } from "@/components/skeleton";
import { useAssetContext } from "@/components/AssetProvider";
import { FadeInUp, StaggerContainer, StaggerItem } from "./atomic/motion";

import { ArrowRightFromLine } from "lucide-react";

import { ScheduleProps } from "@/types/schedule";

interface CompProps {
  data?: ScheduleProps[];
  isLoading?: boolean;
}

export default function ScheduleList({
  data = [],
  isLoading = false,
}: CompProps) {
  const router = useRouter();
  const { getAssetUrl } = useAssetContext();

  const stepsBackground = getAssetUrl("steps_background");

  return (
    <div
      className="w-full text-white flex flex-col items-center justify-center text-center pt-[5%] space-y-5 px-[5%] md:px-0 border-white border-b-5 box-border"
      style={{
        backgroundImage: `linear-gradient(to bottom, transparent, white), url('https://res.cloudinary.com/dyn73qnjx/image/upload/v1771233518/Subtract_hwkrrr.png'), url('${stepsBackground}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <FadeInUp delay={0.1} duration={0.5}>
        <h2 className="font-semibold text-[32px] md:text-[40px] lg:text-[49px] mb-6 md:mb-10">
          Running Schedule
        </h2>
      </FadeInUp>
      <StaggerContainer
        className="flex flex-col w-full px-0 md:px-[7%] lg:px-[10%] gap-4 md:gap-5 mb-6 md:mb-8"
        staggerDelay={0.12}
        delayChildren={0.2}
      >
        {isLoading ? (
          [1, 2, 3].map((i) => <ScheduleCardSkeleton key={i} />)
        ) : data?.length === 0 ? (
          <div className="bg-slate-50 flex flex-col items-center p-[8%] md:p-[5%] rounded-3xl gap-4 md:gap-5">
            <span className="font-[400] text-slate-500 text-[16px] md:text-[18px]">
              No Schedule Found
            </span>
          </div>
        ) : (
          data?.map((each: ScheduleProps, index: number) => (
            <StaggerItem key={index} direction="up">
              <ScheduleCard data={each} />
            </StaggerItem>
          ))
        )}
      </StaggerContainer>
      {!isLoading && data?.length > 0 && (
        <FadeInUp delay={0.4} duration={0.5}>
          <Button
            label="Load More"
            rounded
            type="primary"
            icon={<ArrowRightFromLine size={18} />}
            onClick={() => router.push("/schedule")}
          />
        </FadeInUp>
      )}
      <section className="flex flex-col w-full px-0 md:px-[7%] lg:px-[10%] gap-4 md:gap-5">
        <TestimoniList />
      </section>
    </div>
  );
}

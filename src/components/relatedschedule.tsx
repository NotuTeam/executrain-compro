/** @format */

"use client";

import { useRouter } from "next/navigation";

import Button from "./atomic/button";
import ScheduleCard from "./atomic/schedulecard";
import { ScheduleCardSkeleton } from "@/components/skeleton";

import { ArrowRightFromLine } from "lucide-react";

import { ScheduleProps } from "@/types/schedule";

interface CompProps {
  data?: ScheduleProps[];
  isLoading?: boolean;
}

export default function RelatedScheduleList({
  data = [],
  isLoading = false,
}: Readonly<CompProps>) {
  const router = useRouter();

  if (isLoading) {
    return [1, 2, 3].map((i) => <ScheduleCardSkeleton key={i} />);
  }

  return (
    <div className="w-full flex flex-col items-center justify-center text-center py-[8%] space-y-5 px-[5%] md:px-0 border-white border-b-5 box-border">
      <h2 className="font-semibold text-[32px] md:text-[40px] lg:text-[49px] mb-6 md:mb-10">
        Related Schedule
      </h2>
      <div className="flex w-full px-0 md:px-[7%] lg:px-[10%] gap-4 md:gap-5 mb-6 md:mb-8">
        {data?.length === 0 ? (
          <div className="bg-slate-50 flex flex-col items-center p-[8%] md:p-[5%] rounded-3xl gap-4 md:gap-5">
            <span className="font-[400] text-slate-500 text-[16px] md:text-[18px]">
              No Schedule Found
            </span>
          </div>
        ) : (
          data?.map((each: ScheduleProps, index: number) => (
            <ScheduleCard key={index + 1} data={each} type="small" />
          ))
        )}
      </div>
      {!isLoading && data?.length > 0 && (
        <Button
          label="Load More"
          rounded
          type="primary"
          icon={<ArrowRightFromLine size={18} />}
          onClick={() => router.push("/schedule")}
        />
      )}
    </div>
  );
}

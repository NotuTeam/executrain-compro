/** @format */

"use client";

import dayjs from "dayjs";
import Button from "./atomic/button";

import { Calendar } from "lucide-react";

import { FreeTrialScheduleProps } from "@/types/free-trial";

interface CompProps {
  data?: FreeTrialScheduleProps[];
  isLoading?: boolean;
}

export default function FreeTrialRelatedSchedule({
  data = [],
  isLoading = false,
}: Readonly<CompProps>) {
  if (isLoading) {
    return null;
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
          data?.map((each: FreeTrialScheduleProps, index: number) => (
            <div
              key={index + 1}
              className="w-full space-y-2 p-[3%] md:p-[2%] rounded-2xl border border-primary-600"
            >
              <div className="flex gap-3 items-center justify-between flex-wrap md:flex-nowrap">
                <div className="flex gap-3 items-center">
                  <span className="inline-block px-3 py-1 rounded-full text-xs border border-primary-600 text-primary-600">
                    {each?.status?.replace("_", " ") || "UNSET"}
                  </span>
                </div>
              </div>
              <div className="max-w-full  text-left">
                <h3 className="flex gap-3 text-[18px] md:text-[20px] lg:text-[24px] font-semibold leading-6 md:leading-7">
                  <Calendar />
                  {dayjs(each?.schedule_date).format("D MMMM YYYY")}
                </h3>
              </div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-3 md:gap-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] md:text-[12px]">
                    {each.schedule_name}
                  </span>
                </div>
                <Button
                  label="Join Class"
                  rounded
                  type="primary"
                  onClick={() =>
                    window.location.assign(`/free-trial/schedule/${each._id}`)
                  }
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

/** @format */

"use client";

import { useRouter } from "next/navigation";

import Tag from "./tag";
import Button from "./button";
import { Calendar } from "lucide-react";

import dayjs from "dayjs";

import { ScheduleProps } from "@/types/schedule";

interface CompProps {
  data: ScheduleProps;
  type?: "plain" | "default" | "small";
}

export default function ScheduleCard({ data, type = "default" }: CompProps) {
  const router = useRouter();

  if (type === "plain") {
    return (
      <div className="w-full space-y-2 p-[3%] md:p-[2%] rounded-2xl border border-primary-600">
        <div className="flex gap-3 items-center justify-between flex-wrap md:flex-nowrap">
          <div className="flex gap-3 items-center">
            <Tag label={data?.status?.replace("_", " ") || "UNSET"} />
            <span className="text-[10px] md:text-[12px]">
              {dayjs(data?.schedule_date).format("D MMMM YYYY")}
            </span>
          </div>
        </div>
        <div className="max-w-full md:max-w-[60%] lg:max-w-[40%] text-left">
          <h3 className="text-[18px] md:text-[20px] lg:text-[24px] font-semibold leading-6 md:leading-7">
            {data.schedule_name}
          </h3>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-3 md:gap-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] md:text-[12px]">
              Close Registration:{" "}
              {dayjs(data?.schedule_close_registration_date).format(
                "DD MMMM YYYY",
              )}
            </span>
          </div>
          <Button
            label="Join Class"
            rounded
            type="primary"
            onClick={() => router.push(`/schedule/${data._id}`)}
          />
        </div>
      </div>
    );
  }

  if (type === "small") {
    return (
      <div className="w-full space-y-2 p-[3%] md:p-[2%] rounded-2xl border border-primary-600">
        <div className="flex gap-3 items-center justify-between flex-wrap md:flex-nowrap">
          <div className="flex gap-3 items-center">
            <Tag label={data?.status?.replace("_", " ") || "UNSET"} />
            <span className="text-[10px] md:text-[12px]"></span>
          </div>
        </div>
        <div className="max-w-full text-left">
          <h3 className="text-[18px] md:text-[20px] lg:text-[24px] font-semibold leading-6 md:leading-7 flex gap-3">
            <Calendar />
            {dayjs(data?.schedule_date).format("D MMMM YYYY")}
          </h3>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-3 md:gap-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] md:text-[12px]">
              {data.schedule_name}
            </span>
          </div>
          <Button
            label="Join Class"
            rounded
            type="primary"
            onClick={() => router.push(`/schedule/${data._id}`)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-2 p-[3%] md:p-[2%] rounded-xl bg-white/20 backdrop-blur-md border border-white/20 shadow-xl">
      <div className="flex gap-3 items-center justify-between flex-wrap md:flex-nowrap">
        <div className="flex gap-3 items-center">
          <Tag label={data?.status?.replace("_", " ") || "UNSET"} />
          <span className="text-[10px] md:text-[12px]">
            {dayjs(data?.schedule_date).format("D MMMM YYYY")}
          </span>
        </div>
      </div>
      <div className="max-w-full md:max-w-[60%] lg:max-w-[40%] text-left">
        <h3 className="text-[18px] md:text-[20px] lg:text-[24px] font-semibold leading-6 md:leading-7">
          {data.schedule_name}
        </h3>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-3 md:gap-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[10px] md:text-[12px]">
            Close Registration:{" "}
            {dayjs(data?.schedule_close_registration_date).format(
              "DD MMMM YYYY",
            )}
          </span>
        </div>
        <Button
          label="Join Class"
          rounded
          type="primary"
          onClick={() => router.push(`/schedule/${data._id}`)}
        />
      </div>
    </div>
  );
}

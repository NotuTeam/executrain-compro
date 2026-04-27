/** @format */

"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Tooltip } from "antd";

import Tag from "./atomic/tag";
import Button from "./atomic/button";

import {
  CornerRightUp,
  Users,
  Calendar,
  CalendarOff,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import dayjs from "dayjs";

import HeroBG from "@/assets/banner.jpg";

import { ScheduleProps } from "@/types/schedule";

interface CompProps {
  data?: ScheduleProps[];
  is_search?: boolean;
  fetchNext?: () => void;
  hasNext?: boolean;
  isFetching?: boolean;
  isLoading?: boolean;
  currentPage?: number;
  totalPages?: number;
  totalSchedules?: number;
  onPageChange?: (page: number) => void;
}

function ScheduleCard({ data }: { data: ScheduleProps }) {
  const router = useRouter();
  const eachDateStr = dayjs(data.schedule_date).format("YYYY-MM-DD");

  const today = dayjs().format("YYYY-MM-DD");

  let status = data.status;

  if (dayjs(data.schedule_close_registration_date).isBefore(dayjs(), "day")) {
    status = "CLOSE_REGISTRATION";
  } else if (dayjs(data.schedule_date).isBefore(dayjs(), "day")) {
    status = "ENDED";
  } else if (eachDateStr === today) {
    status = "ON_GOING";
  }

  return (
    <div
      onClick={() => router.push(`/schedule/${data?._id}`)}
      className="rounded-xl overflow-hidden shadow-[0px_0px_50px_5px_rgba(0,0,0,0.11)] grid grid-cols-1 md:grid-cols-4 w-full cursor-pointer"
    >
      <div className="h-48 md:h-auto bg-slate-100 overflow-hidden">
        <Image
          src={data?.product_banner?.url || HeroBG}
          alt={data?.product_banner?.public_id || ""}
          className="w-full h-full object-cover"
          width={1000}
          height={0}
        />
      </div>
      <div className="md:col-span-3">
        <div className="flex flex-col justify-between items-start p-5 md:p-8 gap-2">
          <div className="flex gap-3 items-center">
            <Tag label={status?.replace("_", " ") || "UNSET"} />
          </div>
          <Tooltip placement="top" title={data?.schedule_name || "-"}>
            <h3 className="text-[18px] md:text-[20px] lg:text-[24px] font-semibold w-full truncate text-left">
              {data?.schedule_name || "-"}
            </h3>
          </Tooltip>
          <p className="text-left text-sm md:text-base line-clamp-3">
            {data?.schedule_description || "-"}
          </p>
          <div className="flex justify-between w-full mt-5 md:mt-8 items-end md:items-center gap-3 md:gap-0">
            <div className="flex flex-wrap gap-2 md:gap-5 md:items-center">
              <div className="flex items-center gap-1">
                <CornerRightUp size={12} color="#BE0F34" />
                <span className="text-[12px] capitalize">
                  {data?.skill_level?.replace("_", " ").toLowerCase() || "-"}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Users size={12} color="#BE0F34" />
                <span className="text-[12px]">{data?.quota || "-"}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={12} color="#BE0F34" />
                <span className="text-[12px]">
                  {dayjs(data?.schedule_date).format("D MMMM YYYY")}
                </span>
              </div>
            </div>
            {status === "OPEN_SEAT" ? (
              <Button
                onClick={() => {
                  router.push(`/schedule/${data?._id}`);
                }}
                label="Register Now"
                rounded
                type="primary"
              />
            ) : (
              <Button label="Register Now" rounded type="disable" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SelectedSchedule({
  data = [],
  isLoading = false,
  currentPage = 1,
  totalPages = 1,
  totalSchedules = 0,
  onPageChange,
}: Readonly<CompProps>) {
  if (isLoading) {
    return (
      <div className="w-full px-[5%] md:px-[7%] lg:px-[10%] py-[5%] order-2 lg:order-1">
        <div className="space-y-3 md:space-y-4">
          <div className="bg-slate-50 flex flex-col items-center p-[8%] md:p-[5%] rounded-3xl gap-4 md:gap-5">
            <span className="font-[400] text-slate-500">Loading...</span>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full px-[5%] md:px-[7%] lg:px-[10%] py-[5%] order-2 lg:order-1">
      <div className="space-y-3 md:space-y-4">
        {data.length > 0 ? (
          data.map((each: ScheduleProps, index: number) => (
            <ScheduleCard key={index} data={each} />
          ))
        ) : (
          <div className="bg-slate-50 flex flex-col items-center p-[8%] md:p-[5%] rounded-3xl gap-4 md:gap-5">
            <CalendarOff
              color="gray"
              size={36}
              className="md:w-[48px] md:h-[48px]"
            />
            <span className="font-[400] text-slate-500">No Schedule Found</span>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            onClick={() =>
              onPageChange && onPageChange(Math.max(1, currentPage - 1))
            }
            disabled={currentPage === 1}
            className="p-1 text-black disabled:opacity-40 disabled:cursor-not-allowed"
            type="button"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-2">
            {(totalPages <= 4
              ? Array.from({ length: totalPages }, (_, i) => i + 1)
              : currentPage <= 2
                ? [1, 2, 3, "ellipsis"]
                : currentPage >= totalPages - 1
                  ? ["ellipsis", totalPages - 2, totalPages - 1, totalPages]
                  : [
                      "ellipsis",
                      currentPage - 1,
                      currentPage,
                      currentPage + 1,
                      "ellipsis",
                    ]
            ).map((item, index) => (
              <button
                key={`${item}-${index}`}
                onClick={() =>
                  typeof item === "number" && onPageChange && onPageChange(item)
                }
                disabled={item === "ellipsis"}
                className={`w-10 h-10 rounded-full border text-sm font-semibold transition-colors ${
                  item === "ellipsis"
                    ? "border-black bg-[#f5f5f5] text-black cursor-default"
                    : item === currentPage
                      ? "border-black bg-black text-white"
                      : "border-black bg-white text-black"
                }`}
                type="button"
              >
                {item === "ellipsis" ? "..." : item}
              </button>
            ))}
          </div>

          <button
            onClick={() =>
              onPageChange &&
              onPageChange(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
            className="p-1 text-black disabled:opacity-40 disabled:cursor-not-allowed"
            type="button"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
}

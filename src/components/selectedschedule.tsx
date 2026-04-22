/** @format */

"use client";

import { useRouter } from "next/navigation";
import Button from "./atomic/button";

import {
  Clock,
  Users,
  CalendarOff,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import dayjs from "dayjs";

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

const borderColor = {
  FULL_BOOKED: "border-red-500",
  CLOSE_REGISTRATION: "border-red-500",
  OPEN_SEAT: "border-yellow-300",
  ON_GOING: "border-green-500",
  ENDED: "border-gray-500",
};

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
      className={`bg-white p-4 md:p-6 border-l-4 flex items-start md:items-center justify-between gap-3 md:gap-0 ${borderColor[status]}`}
    >
      <div className="flex-1">
        <span className="text-[12px] mb-3 block">
          {dayjs(data.schedule_date).format("dddd, DD MMMM YYYY")}
        </span>
        <h4 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">
          {data?.schedule_name || "-"}
        </h4>
        <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
          <Users className="w-4 h-4 md:w-4 md:h-4 text-primary-500" />
          <span>{data?.quota || "-"}</span>
        </div>
      </div>
      <div className="flex flex-col md:items-end gap-2 md:gap-3 w-auto">
        <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
          <Clock className="w-4 h-4 md:w-4 md:h-4 text-primary-500" />
          <span>
            {data?.schedule_start} - {data?.schedule_end} WIB
          </span>
        </div>
        {status === "OPEN_SEAT" ? (
          <Button
            onClick={() => router.push(`/schedule/${data?._id}`)}
            label="Register Now"
            rounded
            type="primary"
          />
        ) : (
          <Button label="Register Now" rounded type="disable" />
        )}
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
            onClick={() => onPageChange && onPageChange(Math.max(1, currentPage - 1))}
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
                  : ["ellipsis", currentPage - 1, currentPage, currentPage + 1, "ellipsis"]
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
            onClick={() => onPageChange && onPageChange(Math.min(totalPages, currentPage + 1))}
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

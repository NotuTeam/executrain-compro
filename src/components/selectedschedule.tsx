/** @format */

"use client";

import { useRouter } from "next/navigation";
import Button from "./atomic/button";

import {
  Clock,
  Users,
  Calendar,
  CalendarOff,
  ChevronRight,
  Home,
} from "lucide-react";
import dayjs, { Dayjs } from "dayjs";

import { ScheduleProps } from "@/types/schedule";

interface CompProps {
  data?: ScheduleProps[];
  selectedDate?: Dayjs | null;
  selectedMonth: Dayjs;
  is_search?: boolean;
  onClearDate?: () => void;
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
      className={`bg-white p-4 md:p-6 border-l-4 flex items-start md:items-center justify-between border-l gap-3 md:gap-0 ${borderColor[status]}`}
    >
      <div className="flex-1">
        <h4 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">
          {data?.schedule_name || "-"}
        </h4>
        <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
          <Users className="w-4 h-4 md:w-4 md:h-4 text-[#00AEEF]" />
          <span>{data?.quota || "-"}</span>
        </div>
      </div>
      <div className="flex flex-col md:items-end gap-2 md:gap-3 w-auto">
        <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
          <Clock className="w-4 h-4 md:w-4 md:h-4 text-[#00AEEF]" />
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
  selectedDate,
  selectedMonth,
  is_search = false,
  onClearDate,
}: CompProps) {
  let showData: ScheduleProps[] = data;
  const showDate: string[] = [];

  // Jika ada pencarian, group by date
  if (is_search) {
    data.forEach((each: ScheduleProps) => {
      const eachDateStr: string = dayjs(each.schedule_date).format(
        "YYYY-MM-DD"
      );
      if (!showDate.includes(eachDateStr)) return showDate.push(eachDateStr);
    });
  }
  // Jika ada tanggal yang dipilih, filter by specific date
  else if (selectedDate) {
    showData = data.filter((each: ScheduleProps) => {
      const selectedDateStr = dayjs(selectedDate).format("YYYY-MM-DD");
      const eachDateStr = dayjs(each.schedule_date).format("YYYY-MM-DD");
      return selectedDateStr === eachDateStr;
    });
  }
  // Default: tampilkan semua data yang digroup by date
  else {
    data.forEach((each: ScheduleProps) => {
      const eachDateStr: string = dayjs(each.schedule_date).format(
        "YYYY-MM-DD"
      );
      if (!showDate.includes(eachDateStr)) return showDate.push(eachDateStr);
    });
  }

  return (
    <div className="w-full px-[5%] md:px-[7%] lg:px-[10%] py-[5%] order-2 lg:order-1">
      {/* Breadcrumb */}
      {!is_search && (
        <div className="flex items-center gap-2 mb-6 text-sm md:text-base">
          <button
            onClick={onClearDate}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors font-[600]`}
          >
            <span>All Schedule</span>
          </button>

          {selectedDate && (
            <>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold">
                <span>{dayjs(selectedDate).format("dddd, DD MMMM YYYY")}</span>
              </div>
            </>
          )}
        </div>
      )}

      {selectedDate && (
        <>
          <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
            <Calendar className="w-5 h-5 md:w-6 md:h-6 text-[#00AEEF]" />
            <h3 className="text-lg md:text-2xl font-semibold">
              {dayjs(`${selectedDate}`, "YYYY-MM-DD").format(
                "dddd, DD MMMM YYYY"
              )}
            </h3>
          </div>
        </>
      )}

      {/* Jika ada pencarian atau tidak ada tanggal yang dipilih (default view) */}
      <div className="space-y-3 md:space-y-4">
        {showData.length > 0 ? (
          showData.map((each: ScheduleProps, index: number) => (
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
    </div>
  );
}

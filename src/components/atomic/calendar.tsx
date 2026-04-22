/** @format */
"use client";

import { useState } from "react";

import dayjs, { Dayjs } from "dayjs";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { ScheduleProps } from "@/types/schedule";

interface CalendarProps {
  onDateSelect?: (date: Dayjs | null) => void;
  onMonthSelect?: (date: Dayjs) => void;
  selectedDate?: Dayjs | null;
  data?: ScheduleProps[];
}

export default function Calendar({
  onDateSelect,
  onMonthSelect,
  selectedDate,
  data = [],
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  const startOfMonth = currentMonth.startOf("month");
  const endOfMonth = currentMonth.endOf("month");
  const startDate = startOfMonth.startOf("week");
  const endDate = endOfMonth.endOf("week");

  const daysInCalendar = [];
  let day = startDate;

  while (day.isBefore(endDate) || day.isSame(endDate, "day")) {
    daysInCalendar.push(day);
    day = day.add(1, "day");
  }

  const weeks: Dayjs[][] = [];
  for (let i = 0; i < daysInCalendar.length; i += 7) {
    weeks.push(daysInCalendar.slice(i, i + 7));
  }

  const handlePrevMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, "month"));
    if (onMonthSelect)
      onMonthSelect(currentMonth.subtract(1, "month").add(1, "day"));
  };

  const handleNextMonth = () => {
    setCurrentMonth(currentMonth.add(1, "month"));
    if (onMonthSelect)
      onMonthSelect(currentMonth.add(1, "month").add(1, "day"));
  };

  const handleDateClick = (date: Dayjs) => {
    if (onDateSelect) {
      onDateSelect(date);
    }
  };

  const getDateStatus = (date: Dayjs) => {
    return data
      .filter((each: ScheduleProps) => {
        const eachDateStr = dayjs(each.schedule_date).format("YYYY-MM-DD");
        const selectedDateStr = date.format("YYYY-MM-DD");

        if (eachDateStr === selectedDateStr) return each;
      })
      .map((each: ScheduleProps) => {
        const eachDateStr = dayjs(each.schedule_date).format("YYYY-MM-DD");
        const today = dayjs().format("YYYY-MM-DD");

        if (date.isBefore(dayjs(), "day")) {
          return "ENDED";
        } else if (eachDateStr === today) {
          return "ON_GOING";
        } else {
          return each.status;
        }
      });
  };

  return (
    <div className="rounded-4xl p-5 md:p-8 w-full md:w-[85%] lg:w-[80%] mx-auto space-y-6 md:space-y-6 bg-white/30 backdrop-blur-md border border-white/20 shadow-xl">
      <div className="flex items-center justify-center gap-2 md:gap-10 flex-wrap">
        <div className="flex items-center gap-2 text-xs md:text-sm">
          <span className="w-3 h-3 rounded-full bg-green-500"></span>
          <span className="text-[12px]">On Going</span>
        </div>
        <div className="flex items-center gap-2 text-xs md:text-sm">
          <span className="w-3 h-3 rounded-full bg-yellow-300"></span>
          <span className="text-[12px]">Open Seat</span>
        </div>
        <div className="flex items-center gap-2 text-xs md:text-sm">
          <span className="w-3 h-3 rounded-full bg-red-500"></span>
          <span className="text-[12px]">Full Booked</span>
        </div>
        <div className="flex items-center gap-2 text-xs md:text-sm">
          <span className="w-3 h-3 rounded-full bg-gray-400"></span>
          <span className="text-[12px]">Ended</span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 md:gap-4">
        <button
          onClick={handlePrevMonth}
          className="p-1 md:p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>
        <h3
          className="text-lg md:text-2xl font-semibold min-w-[150px] md:min-w-[200px] text-center cursor-pointer"
          onClick={() => onDateSelect && onDateSelect(null)}
        >
          {currentMonth.format("MMMM YYYY")}
        </h3>
        <button
          onClick={handleNextMonth}
          className="p-1 md:p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 md:gap-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-center font-semibold text-gray-700 py-1 md:py-2 text-xs md:text-sm"
          >
            {day}
          </div>
        ))}

        {weeks.map((week, weekIndex) =>
          week.map((date, dateIndex) => {
            const isCurrentMonth = date.month() === currentMonth.month();
            const isToday = date.isSame(dayjs(), "day");
            const isSelected = selectedDate && date.isSame(selectedDate, "day");
            const status = getDateStatus(date);
            return (
              <div
                key={`${weekIndex}-${dateIndex}`}
                className="aspect-square flex flex-col items-center justify-center"
              >
                <button
                  onClick={() => handleDateClick(date)}
                  className={`
                  text-xs md:text-sm transition-all p-2 md:p-3 rounded-full aspect-square cursor-pointer
                  ${!isCurrentMonth ? "text-gray-300" : "text-gray-900"}
                  ${isToday ? "font-bold bg-[#BE0F34] text-white" : ""}
                  ${isSelected ? "bg-[#ade9ff]" : ""}
                  ${isCurrentMonth ? "hover:bg-gray-100" : ""}
                `}
                >
                  {date.date()}
                </button>
                <div className="min-h-2 w-full mt-1 md:mt-2 flex items-center justify-center">
                  {status.length > 0 && (
                    <div className="flex gap-0.5 md:gap-1">
                      {status?.map(
                        (
                          each:
                            | "OPEN_SEAT"
                            | "FULL_BOOKED"
                            | "ENDED"
                            | "CLOSE_REGISTRATION"
                            | "ON_GOING",
                          index: number,
                        ) => (
                          <span
                            key={index}
                            className={`
                       w-1.5 h-1.5 md:w-2 md:h-2 rounded-full block
                      ${each === "ON_GOING" ? "bg-green-500" : ""}
                      ${each === "OPEN_SEAT" ? "bg-yellow-300" : ""}
                      ${each === "FULL_BOOKED" ? "bg-red-500" : ""}
                      ${each === "CLOSE_REGISTRATION" ? "bg-red-500" : ""}
                      ${each === "ENDED" ? "bg-gray-400" : ""}
                    `}
                          ></span>
                        ),
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          }),
        )}
      </div>
    </div>
  );
}

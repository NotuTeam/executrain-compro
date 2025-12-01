/** @format */
"use client";

import { useState } from "react";

import dayjs, { Dayjs } from "dayjs";

import Calendar from "@/components/atomic/calendar";
import Container from "@/components/atomic/container";
import HeroSchedule from "@/components/hero/heroschedule";
import SelectedSchedule from "@/components/selectedschedule";
import SearchBar from "@/components/atomic/schedulesearchbar";

import { useScheduleFiltered } from "@/services/schedule/hook";
import { useDebounce } from "@/lib/useDebounce";

export default function Schedule() {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<Dayjs>(
    dayjs().add(1, "day")
  );
  const [searchValue, setSearchValue] = useState("");

  const debouncedSearchValue = useDebounce(searchValue, 500);

  const { data: schedule = [], isLoading: scheduleLoading } =
    useScheduleFiltered({
      search: debouncedSearchValue || undefined,
      date: selectedMonth,
    });

  return (
    <Container>
      <HeroSchedule>
        <SearchBar searchValue={searchValue} onSearchChange={setSearchValue} />
      </HeroSchedule>
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full mt-10">
        {/* Calendar - tampil di atas pada mobile */}
        <div
          className="w-[80%] md:w-full py-[5%] order-1 lg:order-2 mx-auto"
          style={{
            backgroundImage: `url('./body.png')`,
            backgroundSize: "80%",
            backgroundPosition: "0% 0%",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Calendar
            selectedDate={selectedDate}
            onDateSelect={(date) => setSelectedDate(date)}
            onMonthSelect={(date) => setSelectedMonth(date)}
            data={schedule}
          />
        </div>

        {/* Selected Schedule - tampil di bawah pada mobile */}
        <SelectedSchedule
          is_search={searchValue !== ""}
          data={schedule}
          selectedDate={selectedDate}
          selectedMonth={selectedMonth}
        />
      </div>
    </Container>
  );
}

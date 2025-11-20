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
  const [selectedMonth, setSelectedMonth] = useState<Dayjs>(dayjs());
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
      {searchValue === "" && (
        <div
          className="w-full px-[10%] mt-[-2.5%]"
          style={{
            backgroundImage: `url('./body.png'), url('./body.png')`,
            backgroundSize: "30%",
            backgroundPosition: "10% 50%, 90% 30%",
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
      )}

      <SelectedSchedule
        is_search={searchValue !== ""}
        data={schedule}
        selectedDate={selectedDate}
        selectedMonth={selectedMonth}
      />
    </Container>
  );
}

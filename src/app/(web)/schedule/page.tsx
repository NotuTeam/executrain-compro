/** @format */
"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import Container from "@/components/atomic/container";
import HeroSchedule from "@/components/hero/heroschedule";
import SelectedSchedule from "@/components/selectedschedule";
import SearchBar from "@/components/atomic/schedulesearchbar";

import {
  useScheduleCategories,
  useScheduleFiltered,
} from "@/services/schedule/hook";
import { useDebounce } from "@/lib/useDebounce";

export default function Schedule() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [searchValue, setSearchValue] = useState("");
  const [scheduleCategories, setScheduleCategories] = useState<string[]>(
    categoryParam ? [categoryParam] : [],
  );
  const [productCategory, setProductCategory] = useState<string | undefined>(
    undefined,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const debouncedSearchValue = useDebounce(searchValue, 500);

  const { data, isLoading } = useScheduleFiltered({
    search: debouncedSearchValue || undefined,
    schedule_category:
      scheduleCategories.length > 0 ? scheduleCategories : undefined,
    product_category: productCategory,
    page: currentPage,
    limit: itemsPerPage,
  });

  const { data: categories = [] } = useScheduleCategories();

  const schedules = useMemo(() => data?.data || [], [data]);
  const pagination = useMemo(
    () =>
      data?.pagination || {
        current_page: 1,
        total_pages: 1,
        total_schedules: 0,
        per_page: 6,
        has_next: false,
        has_prev: false,
      },
    [data],
  );
  const totalPages = pagination.total_pages;

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchValue, scheduleCategories, productCategory]);

  return (
    <Container>
      <HeroSchedule>
        <SearchBar
          searchValue={searchValue}
          scheduleCategoryValue={scheduleCategories}
          productCategoryValue={productCategory}
          onSearchChange={setSearchValue}
          onScheduleCategoryChange={setScheduleCategories}
          onProductCategoryChange={setProductCategory}
          scheduleCategoryList={categories}
        />
      </HeroSchedule>
      <div className=" w-full px-[5%] md:px-[7%] lg:px-[10%] pt-[5%] flex flex-wrap gap-3">
        {categories?.map((each: string) => (
          <button
            onClick={() => {
              if (scheduleCategories.includes(each)) {
                setScheduleCategories(
                  scheduleCategories.filter((each2) => each2 !== each),
                );
              } else {
                setScheduleCategories(
                  Array.from(new Set([...scheduleCategories, each])),
                );
              }
            }}
            type="button"
            className={`border-2 border-primary-600 px-4 py-1 rounded-full text-primary-600 cursor-pointer ${scheduleCategories.includes(each) ? "bg-primary-50" : ""}`}
            key={each}
          >
            {each}
          </button>
        ))}
      </div>
      <SelectedSchedule
        is_search={
          searchValue !== "" ||
          scheduleCategories.length > 0 ||
          productCategory !== undefined
        }
        data={schedules}
        isLoading={isLoading}
        currentPage={currentPage}
        totalPages={totalPages}
        totalSchedules={pagination.total_schedules || schedules.length}
        onPageChange={setCurrentPage}
      />
    </Container>
  );
}

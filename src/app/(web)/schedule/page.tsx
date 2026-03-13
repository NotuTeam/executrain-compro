/** @format */
"use client";

import { useState } from "react";

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
  const [searchValue, setSearchValue] = useState("");
  const [scheduleCategories, setScheduleCategories] = useState<string[]>([]);
  const [productCategory, setProductCategory] = useState<string | undefined>(
    undefined,
  );

  const debouncedSearchValue = useDebounce(searchValue, 500);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useScheduleFiltered({
      search: debouncedSearchValue || undefined,
      schedule_category:
        scheduleCategories.length > 0 ? scheduleCategories : undefined,
      product_category: productCategory,
    });

  const { data: categories = [] } = useScheduleCategories();

  const allSchedules = data?.pages.flatMap((page) => page.data) || [];

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
        data={allSchedules}
        fetchNext={fetchNextPage}
        hasNext={hasNextPage}
        isFetching={isFetchingNextPage}
        isLoading={isLoading}
      />
    </Container>
  );
}

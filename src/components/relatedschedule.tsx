/** @format */

"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import ScheduleCard from "./atomic/schedulecard";
import { ScheduleCardSkeleton } from "@/components/skeleton";

import { ScheduleProps } from "@/types/schedule";

interface CompProps {
  data?: ScheduleProps[];
  isLoading?: boolean;
}

export default function RelatedScheduleList({
  data = [],
  isLoading = false,
}: Readonly<CompProps>) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth >= 1024) {
        setVisibleCount(3);
      } else if (window.innerWidth >= 768) {
        setVisibleCount(2);
      } else {
        setVisibleCount(1);
      }
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);

    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const maxIndex = Math.max(0, data.length - visibleCount);

  const scrollToIndex = (index: number) => {
    const container = sliderRef.current;
    const item = itemRefs.current[index];

    if (!container || !item) return;

    const targetLeft =
      item.offsetLeft - (container.clientWidth - item.clientWidth) / 2;

    container.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: "smooth",
    });
  };

  const handleSlide = (direction: "prev" | "next") => {
    setActiveIndex((prev) => {
      const safePrev = Math.min(prev, maxIndex);
      const nextIndex =
        direction === "next"
          ? Math.min(safePrev + 1, maxIndex)
          : Math.max(safePrev - 1, 0);

      scrollToIndex(nextIndex);
      return nextIndex;
    });
  };

  const handleScroll = () => {
    const container = sliderRef.current;
    if (!container || itemRefs.current.length === 0) return;

    const currentLeft = container.scrollLeft;
    let closestIndex = 0;
    let smallestDiff = Number.POSITIVE_INFINITY;

    itemRefs.current.forEach((item, index) => {
      if (!item) return;
      const diff = Math.abs(item.offsetLeft - currentLeft);
      if (diff < smallestDiff) {
        smallestDiff = diff;
        closestIndex = index;
      }
    });

    setActiveIndex(Math.min(closestIndex, maxIndex));
  };

  if (isLoading) {
    return [1, 2, 3].map((i) => <ScheduleCardSkeleton key={i} />);
  }

  return (
    <div className="w-full flex flex-col items-center justify-center text-center py-[8%] space-y-5 px-[5%] md:px-0 border-white border-b-5 box-border">
      <h2 className="font-semibold text-[32px] md:text-[40px] lg:text-[49px] mb-6 md:mb-10">
        Related Schedule
      </h2>

      {data?.length === 0 ? (
        <div className="bg-slate-50 flex flex-col items-center p-[8%] md:p-[5%] rounded-3xl gap-4 md:gap-5">
          <span className="font-normal text-slate-500 text-[16px] md:text-[18px]">
            No Schedule Found
          </span>
        </div>
      ) : (
        <div className="w-full px-0 md:px-[7%] lg:px-[10%] mb-6 md:mb-8">
          <div className="flex items-center gap-3 lg:gap-4">
            {data.length > 1 && (
              <button
                type="button"
                onClick={() => handleSlide("prev")}
                aria-label="Previous schedule"
                disabled={activeIndex <= 0}
                className="hidden md:flex shrink-0 border-primary-500 text-primary-500 bg-white border-2 w-[42px] h-[42px] items-center justify-center rounded-full shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={20} />
              </button>
            )}

            <div
              ref={sliderRef}
              onScroll={handleScroll}
              className="flex-1 flex gap-4 md:gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory py-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {data?.map((each: ScheduleProps, index: number) => (
                <div
                  key={index + 1}
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  className="shrink-0 snap-start basis-full md:basis-[calc((100%-1.25rem)/2)] lg:basis-[calc((100%-2.5rem)/3)]"
                >
                  <ScheduleCard data={each} type="small" />
                </div>
              ))}
            </div>

            {data.length > 1 && (
              <button
                type="button"
                onClick={() => handleSlide("next")}
                aria-label="Next schedule"
                disabled={activeIndex >= maxIndex}
                className="hidden md:flex shrink-0 border-primary-500 text-primary-500 bg-white border-2 w-[42px] h-[42px] items-center justify-center rounded-full shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronRight size={20} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

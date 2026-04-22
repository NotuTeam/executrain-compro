/** @format */

"use client";

import { useRouter } from "next/navigation";

import Button from "./atomic/button";
import FreeTrialCard from "./atomic/freetrialcard";
import { ProductCardSkeleton } from "@/components/skeleton";
import { FadeInUp, StaggerContainer, StaggerItem } from "./atomic/motion";

import { ArrowRightFromLine, ChevronLeft, ChevronRight } from "lucide-react";

import { FreeTrialProductProps } from "@/types/free-trial";

interface CompProps {
  title?: string;
  size?: string;
  data?: FreeTrialProductProps[];
  fetchNext?: () => void;
  hasNext?: boolean;
  isFetching?: boolean;
  isLoading?: boolean;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export default function FreeTrialList({
  size = "lg",
  data = [],
  title = "Free Trial",
  isLoading = false,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}: CompProps) {
  const router = useRouter();

  if (size === "md") {
    return (
      <div className="w-full text-center py-[5%] flex flex-col items-center px-[5%] md:px-0">
        <FadeInUp delay={0.1} duration={0.5}>
          <h2 className="font-semibold text-[32px] md:text-[40px] lg:text-[49px]">
            {title}
          </h2>
        </FadeInUp>
        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5 md:mt-8 gap-4 md:gap-5 mb-6 md:mb-8 w-full"
          staggerDelay={0.1}
          delayChildren={0.3}
        >
          {isLoading ? (
            [1, 2, 3].map((i) => <ProductCardSkeleton key={i} />)
          ) : data.length === 0 ? (
            <div className="col-span-full bg-slate-50 flex flex-col items-center p-[8%] md:p-[5%] rounded-3xl gap-4 md:gap-5">
              <span className="font-[400] text-slate-500 text-[16px] md:text-[18px]">
                No Free Trial Found
              </span>
            </div>
          ) : (
            data.map((each: FreeTrialProductProps, index: number) => (
              <StaggerItem key={index} direction="up">
                <FreeTrialCard data={each} />
              </StaggerItem>
            ))
          )}
        </StaggerContainer>
        {!isLoading && data.length > 0 && (
          <FadeInUp delay={0.5} duration={0.5}>
            <Button
              label="View All Free Trial"
              rounded
              type="primary"
              icon={<ArrowRightFromLine size={18} />}
              onClick={() => router.push("/free-trial")}
            />
          </FadeInUp>
        )}
      </div>
    );
  }

  return (
    <div className="w-full text-center py-[5%] flex flex-col items-center">
      <StaggerContainer
        className="flex flex-col mt-5 md:mt-8 px-[5%] md:px-[7%] lg:px-[10%] gap-4 md:gap-5 mb-6 md:mb-8 w-full"
        staggerDelay={0.1}
        delayChildren={0.1}
      >
        {isLoading ? (
          [1, 2, 3].map((i) => <ProductCardSkeleton key={i} />)
        ) : data.length === 0 ? (
          <div className="bg-slate-50 flex flex-col items-center p-[8%] md:p-[5%] rounded-3xl gap-4 md:gap-5">
            <span className="font-[400] text-slate-500 text-[16px] md:text-[18px]">
              No Free Trial Found
            </span>
          </div>
        ) : (
          data.map((each: FreeTrialProductProps, index: number) => (
            <StaggerItem key={index} direction="up">
              <FreeTrialCard data={each} size="lg" />
            </StaggerItem>
          ))
        )}
      </StaggerContainer>
      {!isLoading && data.length > 0 && totalPages > 1 && (
        <div className="flex items-center justify-center gap-3">
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

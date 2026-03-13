/** @format */

"use client";

import { useRouter } from "next/navigation";

import Button from "./atomic/button";
import ProductCard from "./atomic/productcard";
import { ProductCardSkeleton } from "@/components/skeleton";

import { ArrowRightFromLine } from "lucide-react";

import { ProductProps } from "@/types/product";

interface CompProps {
  title?: string;
  size?: string;
  data?: ProductProps[];
  fetchNext?: () => void;
  hasNext?: boolean;
  isFetching?: boolean;
  isLoading?: boolean;
}

export default function ProductList({
  size = "md",
  data = [],
  title = "Product",
  fetchNext,
  hasNext,
  isFetching,
  isLoading = false,
}: CompProps) {
  const router = useRouter();

  if (size === "md") {
    return (
      <div className="w-full text-center py-[5%] flex flex-col items-center px-[5%] md:px-0">
        <h2 className="font-semibold text-[32px] md:text-[40px] lg:text-[49px]">
          {title}
        </h2>
        {title === "Product" && (
          <h3 className="text-[16px] md:text-[20px] font-semibold">
            Top-Rated Picks
          </h3>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5 md:mt-8 gap-4 md:gap-5 mb-6 md:mb-8 w-full">
          {isLoading ? (
            [1, 2, 3].map((i) => <ProductCardSkeleton key={i} />)
          ) : data.length === 0 ? (
            <div className="col-span-full bg-slate-50 flex flex-col items-center p-[8%] md:p-[5%] rounded-3xl gap-4 md:gap-5">
              <span className="font-[400] text-slate-500 text-[16px] md:text-[18px]">
                No Product Found
              </span>
            </div>
          ) : (
            data.map((each: ProductProps, index: number) => (
              <ProductCard key={index} data={each} />
            ))
          )}
        </div>
        {!isLoading && data.length > 0 && (
          <Button
            label="Load More"
            rounded
            type="primary"
            icon={<ArrowRightFromLine size={18} />}
            onClick={() => router.push("/product")}
          />
        )}
      </div>
    );
  } else if (size === "lg") {
    return (
      <div className="w-full text-center py-[5%] flex flex-col items-center">
        <div className="flex flex-col mt-5 md:mt-8 px-[5%] md:px-[7%] lg:px-[10%] gap-4 md:gap-5 mb-6 md:mb-8 w-full">
          {isLoading ? (
            [1, 2, 3].map((i) => <ProductCardSkeleton key={i} />)
          ) : data.length === 0 ? (
            <div className="bg-slate-50 flex flex-col items-center p-[8%] md:p-[5%] rounded-3xl gap-4 md:gap-5">
              <span className="font-[400] text-slate-500 text-[16px] md:text-[18px]">
                No Product Found
              </span>
            </div>
          ) : (
            data.map((each: ProductProps, index: number) => (
              <ProductCard key={index} data={each} size="lg" />
            ))
          )}
        </div>
        {!isLoading && data.length > 0 && hasNext && (
          <Button
            label={isFetching ? "Loading..." : "Load More"}
            rounded
            type={isFetching ? "disable" : "primary"}
            icon={<ArrowRightFromLine size={18} />}
            onClick={() => fetchNext && fetchNext()}
          />
        )}
      </div>
    );
  } else {
    return;
  }
}

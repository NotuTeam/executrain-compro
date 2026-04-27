/** @format */
"use client";

import React from "react";
import Image from "next/image";

import CountUp from "./atomic/countup";
import { PartnerLogoSkeleton } from "@/components/skeleton";
import { FadeInUp, FadeInDown } from "./atomic/motion";

import { PartnerProps } from "@/types/partner";

interface CompProps {
  data?: PartnerProps[];
  isLoading?: boolean;
}

export default function PartnerList({
  data = [],
  isLoading = false,
}: CompProps) {
  const duplicatedData = React.useMemo(() => {
    const minItems = 12;

    if (data.length === 0) {
      return [];
    }

    if (data.length < minItems) {
      const timesToDuplicate = Math.ceil(minItems / data.length);
      return Array.from({ length: timesToDuplicate }, () => data).flat();
    }

    return data;
  }, [data]);

  if (data.length === 0) {
    return null;
  }

  return (
    <div className="w-full text-center py-[5%] px-[5%] md:px-0 overflow-hidden">
      <FadeInUp delay={0.1} duration={0.5}>
        <h2 className="font-semibold text-[32px] md:text-[40px] lg:text-[49px] mb-3 md:mb-0">
          Partners
        </h2>
      </FadeInUp>
      <FadeInUp delay={0.2} duration={0.5}>
        <h3 className="text-[14px] md:text-[18px] lg:text-[20px] font-semibold">
          Over{" "}
          <CountUp
            from={15000}
            to={17200}
            separator=","
            direction="up"
            duration={2}
          />{" "}
          companies grow their teams with Executrain
        </h3>
      </FadeInUp>

      <FadeInDown delay={0.3} duration={0.6}>
        <div className="relative mt-5 md:mt-8 w-full">
          <div className="overflow-hidden">
            {isLoading ? (
              <div className="flex gap-3 md:gap-5 justify-center">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <PartnerLogoSkeleton key={i} />
                ))}
              </div>
            ) : (
              <div className="flex gap-3 md:gap-5 animate-infinite-scroll hover:pause-animation">
                {[...duplicatedData, ...duplicatedData, ...duplicatedData].map(
                  (each: PartnerProps, index: number) => (
                    <div
                      key={`${each.partner_name}-${index}`}
                      className="flex-shrink-0 flex items-center justify-center w-[60px] h-[60px] md:w-[80px] md:h-[80px] lg:w-[100px] lg:h-[100px]"
                    >
                      <Image
                        src={each.logo.url}
                        alt={each.partner_name}
                        width={100}
                        height={100}
                        className="object-contain w-[80%] h-[80%]"
                      />
                    </div>
                  ),
                )}
              </div>
            )}
          </div>

          <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
          <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
        </div>
      </FadeInDown>
    </div>
  );
}

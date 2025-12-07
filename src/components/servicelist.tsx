/** @format */

"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import { useServices } from "@/services/service/hook";
import { serviceToSlug } from "@/lib/utils";
import { ServiceCardSkeleton } from "@/components/skeleton";

// Default icons for fallback
import IT_TRAINING_ICON from "@/assets/icons/it_training.svg";

export default function ServiceList() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { data: services = [], isLoading } = useServices();

  if (isLoading) {
    return (
      <div className="px-[5%] md:px-[7%] lg:px-[10%] py-[5%] text-center w-full space-y-6 md:space-y-10 min-h-[30dvh] md:min-h-[50dvh]">
        <h2 className="font-semibold text-[32px] md:text-[40px] lg:text-[49px]">
          Services
        </h2>
        <div className="flex justify-evenly gap-4 md:gap-6">
          {[1, 2, 3].map((i) => (
            <ServiceCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="px-[5%] md:px-[7%] lg:px-[10%] py-[5%] text-center w-full space-y-6 md:space-y-10 min-h-[30dvh] md:min-h-[50dvh]">
      <h2 className="font-semibold text-[32px] md:text-[40px] lg:text-[49px]">
        Services
      </h2>
      <div className="flex justify-evenly gap-4 md:gap-6">
        {services.map((each: any, index: number) => (
          <Link
            key={each._id || index}
            href={`/service?type=${serviceToSlug(each.service_name)}`}
            className="flex flex-col items-center justify-start gap-5 text-center flex-1 group relative overflow-hidden"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div
              className={`w-full rounded-3xl p-5 md:p-8 flex flex-col items-center justify-center gap-3 md:gap-5 min-h-[250px] md:min-h-[350px] transition-all duration-500 relative ${
                hoveredIndex === index
                  ? "bg-gradient-to-br from-[#1a3a52] via-[#0d4d6b] to-[#00AEEF]"
                  : "bg-white border-gray-200"
              }`}
            >
              <div
                className={`w-[80px] h-[80px] md:w-[120px] md:h-[120px] rounded-2xl flex items-center justify-center transition-all duration-500 ${
                  hoveredIndex === index
                    ? "bg-white/10 backdrop-blur-sm"
                    : "bg-transparent"
                }`}
              >
                {each.logo?.url ? (
                  <Image
                    src={each.logo.url}
                    alt={`${each.service_name} logo`}
                    width={80}
                    height={80}
                    className={`md:w-[80px] md:h-[80px] object-contain transition-all duration-500 ${
                      hoveredIndex === index ? "brightness-0 invert" : ""
                    }`}
                  />
                ) : (
                  <Image
                    src={IT_TRAINING_ICON}
                    alt={`${each.service_name} logo`}
                    width={60}
                    height={60}
                    className={`md:w-[80px] md:h-[80px] transition-all duration-500 ${
                      hoveredIndex === index ? "brightness-0 invert" : ""
                    }`}
                  />
                )}
              </div>

              <h3
                className={`text-[18px] md:text-[24px] font-semibold transition-all duration-500 ${
                  hoveredIndex === index ? "text-white" : "text-black"
                }`}
              >
                {each.service_name}
              </h3>

              <p
                className={`text-[12px] md:text-[14px] font-[400] leading-relaxed transition-all duration-500 ${
                  hoveredIndex === index
                    ? "text-white opacity-100 max-h-[200px]"
                    : "text-transparent opacity-0 max-h-0"
                }`}
              >
                {each.service_description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

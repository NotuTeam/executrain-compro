/** @format */

import Image from "next/image";

import { TestimoniProps } from "@/types/testimoni";

interface CompProps {
  data: TestimoniProps;
}

export default function TestimoniCard({ data }: CompProps) {
  return (
    <div className="flex flex-col">
      {/* Quote Text */}
      <p className="text-[15px] md:text-[16px] text-[#333] leading-relaxed mb-6">
        <span className="text-[#bf1f40] text-2xl">"</span>
        {data?.testimonial}
        <span className="text-[#bf1f40] text-2xl">"</span>
      </p>

      {/* Profile Section */}
      <div className="flex items-center gap-4">
        {/* Avatar with red accent */}
        <div className="relative w-[50px] h-[50px] flex-shrink-0">
          <div
            className="w-full h-full bg-gray-200"
            style={{
              backgroundImage: `url(${data?.photo?.url || ""})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </div>

        {/* Info Text */}
        <div className="flex flex-col items-start">
          <span className="font-bold text-[#111] text-[14px]">
            {data?.person_name}
          </span>
          <span className="text-[12px] text-[#888]">{data?.person_title}</span>
        </div>
      </div>
    </div>
  );
}

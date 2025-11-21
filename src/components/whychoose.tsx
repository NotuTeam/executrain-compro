/** @format */

"use client";

import { useState } from "react";

const whyChooseData = [
  {
    title: "Layanan Lengkap & Terintegrasi",
    description:
      "Pelatihan, IT managed service, hingga solusi teknologi dalam satu atap untuk mendukung pertumbuhan bisnis Anda.",
  },
  {
    title: "Kustom Sesuai Kebutuhan",
    description:
      "Setiap program dan layanan kami dirancang sesuai karakteristik dan tujuan organisasi Anda.",
  },
  {
    title: "Profesional & Berpengalaman",
    description:
      "Tim ahli kami mengedepankan integritas, kualitas, dan inovasi untuk memastikan hasil terbaik bagi klien.",
  },
];

export default function WhyChoose({ type = "dark" }: { type?: string }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className="px-[5%] md:px-[7%] lg:px-[10%] min-w-[99dvw] py-[5%] flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-20 duration-300 min-h-[40dvh] md:min-h-[90dvh] "
      style={
        type === "dark"
          ? {
              backgroundImage: `url('./body.png')`,
              backgroundSize: "contain",
              backgroundPosition: "right",
              backgroundRepeat: "no-repeat",
            }
          : {}
      }
    >
      <div className="hidden md:block w-full md:w-auto text-center md:text-left">
        <h2
          className={`text-[40px] md:text-[50px] lg:text-[61px] font-semibold leading-[1] ${
            type === "light" ? "text-white" : "text-black"
          }`}
        >
          Why
          <br />
          Choose
          <br />
          <span className="text-[#00AEEF]">ExceLEARN?</span>
        </h2>
      </div>
      <div className="block md:hidden w-full md:w-auto text-center md:text-left">
        <h2
          className={`text-[40px] md:text-[50px] lg:text-[61px] font-semibold leading-[1] ${
            type === "light" ? "text-white" : "text-black"
          }`}
        >
          Why Choose <span className="text-[#00AEEF]">ExceLEARN?</span>
        </h2>
      </div>
      <div className="flex flex-col gap-3 flex-1">
        {whyChooseData.map((each, index: number) => (
          <div
            className={`flex gap-3 md:gap-5 bg-white/50 backdrop-blur-md border border-white/20 rounded-2xl md:rounded-3xl px-4 md:px-5 py-3 items-stretch shadow-[0px_0px_50px_5px_rgba(0,0,0,0.11)] transition-all duration-300 cursor-pointer ${
              hoveredIndex === index ? "bg-white/80" : ""
            }`}
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div>
              <div
                className={`flex items-center justify-center text-[18px] md:text-[24px] font-semibold border-2 rounded-full flex-shrink-0 ${
                  type === "light"
                    ? "border-black text-black"
                    : "border-[#00AEEF] text-[#00AEEF]"
                } h-[40px] md:h-[50px] aspect-square`}
              >
                {index + 1}
              </div>
            </div>
            <div className="flex-1 flex justify-center flex-col">
              <span className="text-[16px] md:text-[20px] lg:text-[24px] font-semibold block">
                {each.title}
              </span>
              <p
                className={`max-h-[200px] opacity-100 md:opacity-0 md:max-h-[0] text-[12px] md:text-[14px] lg:text-[16px] font-[400] text-gray-700 overflow-hidden transition-all duration-300 ${
                  hoveredIndex === index
                    ? "!max-h-[200px] !opacity-100 mt-2"
                    : "max-h-0 opacity-0"
                }`}
              >
                {each.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

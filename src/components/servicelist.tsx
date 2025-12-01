/** @format */

"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import { ServiceProps } from "@/types/service";

import IT_TRAINING_ICON from "@/assets/icons/it_training.svg";
import IT_CONSULTANT_LOGO from "@/assets/icons/it_consultant.svg";
import IT_SUPPORT_LOGO from "@/assets/icons/it_support.svg";

const services = [
  {
    name: "IT Training",
    icon: IT_TRAINING_ICON,
    description:
      "Pelatihan IT terkini oleh instruktur berpengalaman, lengkap dengan layanan konsultasi dan program khusus sesuai kebutuhan peserta maupun perusahaan.",
  },
  {
    name: "IT Consultant",
    icon: IT_CONSULTANT_LOGO,
    description:
      "Panduan strategis dan dukungan ahli untuk menyelaraskan strategi IT dengan tujuan bisnis Anda.",
  },
  {
    name: "IT Support",
    icon: IT_SUPPORT_LOGO,
    description:
      "Layanan dukungan IT responsif dan profesional untuk menjaga kelancaran operasional bisnis Anda.",
  },
];

export default function ServiceList() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="px-[5%] md:px-[7%] lg:px-[10%] py-[5%] text-center w-full space-y-6 md:space-y-10 min-h-[30dvh] md:min-h-[50dvh]">
      <h2 className="font-semibold text-[32px] md:text-[40px] lg:text-[49px]">
        Services
      </h2>
      <div className="flex justify-evenly gap-4 md:gap-6">
        {services.map((each: ServiceProps, index: number) => (
          <Link
            key={index}
            href={`/service?type=${each.name
              ?.toLowerCase()
              ?.replace(" ", "-")}`}
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
                <Image
                  src={each.icon}
                  alt={`${each.name} logo`}
                  width={60}
                  height={60}
                  className={`md:w-[80px] md:h-[80px] transition-all duration-500 ${
                    hoveredIndex === index ? "brightness-0 invert" : ""
                  }`}
                />
              </div>

              <h3
                className={`text-[18px] md:text-[24px] font-semibold transition-all duration-500 ${
                  hoveredIndex === index ? "text-white" : "text-black"
                }`}
              >
                {each.name}
              </h3>

              <p
                className={`text-[12px] md:text-[14px] font-[400] leading-relaxed transition-all duration-500 ${
                  hoveredIndex === index
                    ? "text-white opacity-100 max-h-[200px]"
                    : "text-transparent opacity-0 max-h-0"
                }`}
              >
                {each.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

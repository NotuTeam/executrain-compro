/** @format */
"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";

import ServiceBG from "@/assets/hero.webp";
import IT_TRAINING_ICON from "@/assets/icons/it_training.svg";
import IT_CONSULTANT_LOGO from "@/assets/icons/it_consultant.svg";
import IT_SUPPORT_LOGO from "@/assets/icons/it_support.svg";
import IT_TRAINING_DISABLE_ICON from "@/assets/icons/it_training_disable.svg";
import IT_CONSULTANT_DISABLE_LOGO from "@/assets/icons/it_consultant_disable.svg";
import IT_SUPPORT_DISABLE_LOGO from "@/assets/icons/it_support_disable.svg";

import { ServiceProps } from "@/types/service";

const data = [
  {
    key: "it-training",
    name: "IT Training",
    description:
      "ExceLEARN menyediakan pelatihan teknis terkini dalam berbagai bidang IT, dipimpin oleh instruktur ahli dengan pengalaman praktis. Kami juga menawarkan konsultasi karier dan layanan khusus perusahaan untuk memenuhi kebutuhan unik dari setiap peserta kursus dan klien kami.",
    icon: IT_TRAINING_ICON,
    icon_disable: IT_TRAINING_DISABLE_ICON,
  },
  {
    key: "it-consultant",
    name: "IT Consultant",
    description:
      "ExceLEARN menyediakan pelatihan teknis terkini dalam berbagai bidang IT, dipimpin oleh instruktur ahli dengan pengalaman praktis. Kami juga menawarkan konsultasi karier dan layanan khusus perusahaan untuk memenuhi kebutuhan unik dari setiap peserta kursus dan klien kami.",
    icon: IT_CONSULTANT_LOGO,
    icon_disable: IT_CONSULTANT_DISABLE_LOGO,
  },
  {
    key: "it-support",
    name: "IT Support",
    description:
      "ExceLEARN menyediakan pelatihan teknis terkini dalam berbagai bidang IT, dipimpin oleh instruktur ahli dengan pengalaman praktis. Kami juga menawarkan konsultasi karier dan layanan khusus perusahaan untuk memenuhi kebutuhan unik dari setiap peserta kursus dan klien kami.",
    icon: IT_SUPPORT_LOGO,
    icon_disable: IT_SUPPORT_DISABLE_LOGO,
  },
];

interface ServiceDetailProps {
  initialService?: string | null;
}

export default function ServiceDetail({ initialService }: ServiceDetailProps) {
  const initialSelectedService = useMemo(() => {
    if (initialService) {
      const foundService = data.find(
        (service) => service.key === initialService
      );
      return foundService || data[0];
    }
    return data[0];
  }, [initialService]);

  const [selected, setSelected] = useState<ServiceProps>(
    initialSelectedService
  );

  useEffect(() => {
    if (initialService) {
      setTimeout(() => {
        document
          .getElementById("service-detail")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [initialService]);

  return (
    <div
      id="service-detail"
      className="pt-[5%] px-[5%] md:px-[7%] lg:px-[10%] w-full"
    >
      <div className="space-x-3 md:space-x-6 lg:space-x-8 border-b-2 border-slate-300 pb-3 flex overflow-x-auto">
        {data.map((each: ServiceProps) => (
          <div
            onClick={() => {
              setSelected(each);
            }}
            key={each.key}
            className={`font-semibold text-[16px] md:text-[20px] lg:text-[24px] cursor-pointer duration-150 flex gap-2 md:gap-3 items-center transition-colors whitespace-nowrap ${
              selected.key === each.key ? "text-[#00AEEF]" : "text-slate-300"
            } hover:text-[#00AEEF]/70`}
          >
            <Image
              src={
                selected.key === each.key
                  ? each.icon
                  : each?.icon_disable
                  ? each?.icon_disable
                  : ""
              }
              alt={each.name}
              height={16}
              width={16}
              className="md:h-[18px] md:w-[18px] lg:h-[20px] lg:w-[20px]"
            />
            {each.name}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 md:mt-8">
        <div className="flex flex-col justify-center order-2 md:order-1">
          <h3 className="font-semibold text-[28px] md:text-[40px] lg:text-[49px] mb-3 md:mb-5">
            {selected.name}
          </h3>
          <p className="text-[14px] md:text-[16px] text-justify leading-relaxed">
            {selected.description}
          </p>
        </div>
        <div className="p-[5%] md:p-[10%] order-1 md:order-2">
          <Image
            src={ServiceBG}
            alt="service pict"
            height={0}
            width={0}
            className="rounded-lg shadow-[0px_0px_50px_5px_rgba(0,0,0,0.11)] w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}

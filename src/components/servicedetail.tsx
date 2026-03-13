/** @format */
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import IT_TRAINING_ICON from "@/assets/icons/it_training.svg";
import IT_TRAINING_DISABLE_ICON from "@/assets/icons/it_training_disable.svg";

import { useServices } from "@/services/service/hook";
import { serviceToSlug, findServiceBySlug } from "@/lib/utils";
import { ServiceDetailSkeleton } from "@/components/skeleton";
import { useAssetContext } from "@/components/AssetProvider";

interface ServiceDetailProps {
  initialService?: string | null;
}

function ServiceDetailContent({ initialService }: ServiceDetailProps) {
  const router = useRouter();
  const { data: services = [], isLoading } = useServices();
  const { getAssetUrl } = useAssetContext();

  const servicesImage = getAssetUrl("services_image");

  // Tentukan initial selected berdasarkan initialService
  const getInitialService = () => {
    if (initialService && services.length > 0) {
      const foundService = findServiceBySlug(services, initialService);
      return foundService || services[0];
    }
    return services[0];
  };

  const [selected, setSelected] = useState<any>(getInitialService());

  // Update selected saat services atau initialService berubah
  useEffect(() => {
    if (services.length > 0) {
      const newService = getInitialService();
      if (newService) {
        setSelected(newService);
      }
    }
  }, [services, initialService]);

  // Scroll ke section saat initialService ada
  useEffect(() => {
    if (initialService) {
      const timer = setTimeout(() => {
        document
          .getElementById("service-detail")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [initialService]);

  if (isLoading) {
    return <ServiceDetailSkeleton />;
  }

  if (!services.length) {
    return (
      <div className="pt-[5%] px-[5%] md:px-[7%] lg:px-[10%] w-full">
        <div className="bg-slate-50 flex flex-col items-center p-[8%] md:p-[5%] rounded-3xl gap-4 md:gap-5">
          <span className="font-[400] text-slate-500 text-[16px] md:text-[18px]">
            No Service Found
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      id="service-detail"
      className="pt-[5%] px-[5%] md:px-[7%] lg:px-[10%] w-full"
    >
      {/* Tab container with wrap */}
      <div className="flex flex-wrap gap-3 md:gap-6 lg:gap-8 border-b-2 border-slate-300 pb-3">
        {services.map((each: any) => {
          const slug = serviceToSlug(each.service_name);
          const isSelected = selected?._id === each._id;

          return (
            <div
              onClick={() => {
                setSelected(each);
                router.push(`/service?type=${slug}`);
              }}
              key={each._id}
              className={`font-semibold text-[16px] md:text-[20px] lg:text-[24px] cursor-pointer duration-150 flex gap-2 md:gap-3 items-center transition-colors ${
                isSelected ? "text-primary-500" : "text-slate-300"
              } hover:text-primary-500/70`}
            >
              {each.logo?.url ? (
                <Image
                  src={each.logo.url}
                  alt={each.service_name}
                  height={20}
                  width={20}
                  className={`md:h-[18px] md:w-[18px] lg:h-[20px] lg:w-[20px] object-contain ${
                    isSelected ? "opacity-100" : "opacity-50"
                  }`}
                />
              ) : (
                <Image
                  src={isSelected ? IT_TRAINING_ICON : IT_TRAINING_DISABLE_ICON}
                  alt={each.service_name}
                  height={16}
                  width={16}
                  className="md:h-[18px] md:w-[18px] lg:h-[20px] lg:w-[20px]"
                />
              )}
              {each.service_name}
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 md:mt-8">
        <div className="flex flex-col justify-center order-2 md:order-1">
          <h3 className="font-semibold text-[28px] md:text-[40px] lg:text-[49px] mb-3 md:mb-5">
            {selected?.service_name}
          </h3>
          <p className="text-[14px] md:text-[16px] text-justify leading-relaxed">
            {selected?.service_description}
          </p>
        </div>
        <div className="p-[5%] md:p-[10%] order-1 md:order-2">
          <img
            src={servicesImage}
            alt="service pict"
            className="rounded-2xl shadow-[0px_0px_50px_5px_rgba(0,0,0,0.11)] w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}

export default function ServiceDetail({ initialService }: ServiceDetailProps) {
  // Gunakan key prop untuk force re-mount component saat initialService berubah
  return (
    <ServiceDetailContent
      key={initialService}
      initialService={initialService}
    />
  );
}

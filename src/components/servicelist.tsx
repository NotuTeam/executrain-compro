/** @format */

"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

import { useServices } from "@/services/service/hook";
import { useProduct } from "@/services/product/hook";
import { useDebounce } from "@/lib/useDebounce";
import { ServiceCardSkeleton } from "@/components/skeleton";
import ProductList from "./productlist";
import { FadeInUp, StaggerContainer, StaggerItem } from "./atomic/motion";

import IT_TRAINING_ICON from "@/assets/icons/it_training.svg";
import IT_TRAINING_DISABLE_ICON from "@/assets/icons/it_training_disable.svg";

export default function ServiceList({
  searchTerm = "",
}: {
  searchTerm?: string;
}) {
  const [selected, setSelected] = useState<any>();
  const { data: services = [], isLoading } = useServices();
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const hasSearch = debouncedSearchTerm.trim().length > 0;

  const { data: product = [], isLoading: productLoading } = useProduct({
    product_category: hasSearch ? undefined : selected?.slug || undefined,
    product_name: debouncedSearchTerm || undefined,
  });

  useEffect(() => {
    if (services.length > 0) {
      const newService = services[0];
      if (newService) {
        setSelected(newService);
      }
    }
  }, [services]);

  if (isLoading) {
    return (
      <div className="px-[5%] md:px-[7%] lg:px-[10%] py-[5%] text-center w-full space-y-6 md:space-y-6 min-h-[30dvh] md:min-h-[50dvh]">
        <h2 className="font-semibold text-[32px] md:text-[40px] lg:text-[49px] leading-10 md:leading-15">
          Our Business Solutions
        </h2>
        <h3 className="text-[14px] md:text-[18px] lg:text-[20px] font-semibold">
          Delivering reliable technology solutions for modern business needs.
        </h3>
        <div className="flex justify-evenly gap-4 md:gap-6">
          {[1, 2, 3].map((i) => (
            <ServiceCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="py-[5%] text-center w-full space-y-6 md:space-y-6 min-h-[30dvh] md:min-h-[50dvh]">
      <FadeInUp delay={0.1} duration={0.5}>
        <h2 className="font-semibold text-[32px] md:text-[40px] lg:text-[49px] leading-10 md:leading-15">
          Our Business Solutions
        </h2>
      </FadeInUp>
      <FadeInUp delay={0.2} duration={0.5}>
        <h3 className="text-[14px] md:text-[18px] lg:text-[20px] font-semibold">
          Delivering reliable technology solutions for modern business needs.
        </h3>
      </FadeInUp>
      {services.length === 0 ? (
        <div className="bg-slate-50 flex flex-col items-center p-[8%] md:p-[5%] rounded-3xl gap-4 md:gap-5">
          <span className="font-[400] text-slate-500 text-[16px] md:text-[18px]">
            No Service Found
          </span>
        </div>
      ) : (
        <div
          id="service-detail"
          className="pt-[5%] px-[5%] md:px-[7%] lg:px-[10%] w-full"
        >
          {!hasSearch && (
            <StaggerContainer
              className="flex flex-wrap gap-3 md:gap-6 lg:gap-8 border-b-2 border-slate-300 pb-3"
              staggerDelay={0.1}
              delayChildren={0.3}
            >
              {services.map((each: any) => {
                const isSelected = selected?._id === each._id;

                return (
                  <StaggerItem key={each._id}>
                    <div
                      onClick={() => {
                        setSelected(each);
                      }}
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
                          src={
                            isSelected
                              ? IT_TRAINING_ICON
                              : IT_TRAINING_DISABLE_ICON
                          }
                          alt={each.service_name}
                          height={16}
                          width={16}
                          className="md:h-[18px] md:w-[18px] lg:h-[20px] lg:w-[20px]"
                        />
                      )}
                      {each.service_name}
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          )}
          <ProductList data={product} isLoading={productLoading} />
        </div>
      )}
    </div>
  );
}

/** @format */

"use client";

import { useAssetContext } from "@/components/AssetProvider";

interface BenefitProps {
  data: string[];
}

export default function Benefit({ data }: BenefitProps) {
  const { getAssetUrl, getStaticAsset } = useAssetContext();

  const bannerPlain = getStaticAsset("banner_plain");
  const stepsBackground = getAssetUrl("steps_background");

  return (
    <div className="w-full px-[5%] md:px-[7%] lg:px-[10%] pt-[5%]">
      <div
        className="text-white rounded-4xl"
        style={{
          backgroundImage: `url('${bannerPlain}'), url('${stepsBackground}')`,
          backgroundSize: "cover",
          backgroundPosition: "bottom",
        }}
      >
        <div className="p-[4%] flex justify-between items-center">
          <h2 className="text-[28px] md:text-[40px] lg:text-[49px] font-semibold text-center w-full">
            What You&apos;ll Learn
          </h2>
        </div>
        <div className="bg-white text-black border-x border-b border-primary-500 rounded-b-4xl flex flex-col md:flex-row justify-between py-[5%] gap-5 md:gap-0">
          {data?.map((each: string, index: number) => (
            <div
              className={`flex md:flex-col items-start flex-1 gap-5 px-[5%] ${
                index > 0 ? "md:border-l border-t md:border-t-0" : ""
              } border-primary-500 pt-5 md:pt-0`}
              key={index + 1}
            >
              <div className="space-y-3">
                <p className="text-sm md:text-base">{each}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

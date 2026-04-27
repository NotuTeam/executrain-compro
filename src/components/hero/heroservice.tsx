/** @format */

"use client";

import CountUp from "../atomic/countup";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useAssetContext } from "@/components/AssetProvider";
import { FadeInUp } from "../atomic/motion";

export default function HeroService() {
  const { getAssetUrl, getStaticAsset } = useAssetContext();

  const bannerPlain = getStaticAsset("banner_plain");
  const heroBackground = getAssetUrl("hero_service");

  return (
    <div
      className="min-w-[99dvw] min-h-[90dvh] text-white flex items-center justify-start px-[5%] md:px-[7%] lg:px-[10%]"
      style={{
        backgroundImage: `url('${bannerPlain}'), url('${heroBackground}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col gap-5 md:gap-8 items-start w-full pt-[10%]">
        <div className="font-[500] flex gap-3">
          <Link href="/">Home</Link>
          <ChevronRight />
          <Link href="/service">Service</Link>
        </div>
        <h1 className="text-[32px] md:text-[45px] lg:text-[61px] font-semibold">
          Our Service
        </h1>
        <p className="text-sm md:text-base">
          Our training programs are delivered through flexible scheduling
          options to suit your business operations. <br />
          <br />
          Choose from regular classes, corporate training schedules, or
          customized sessions, available both onsite and online to ensure
          minimal disruption and maximum impact.
        </p>
        <div className="h-full flex items-end w-full">
          <div className="w-full text-white grid grid-cols-4 gap-5">
            <div className="flex flex-col items-center justify-start">
              <span className="text-[24px] md:text-[40px] lg:text-[49px] font-[700]">
                <CountUp
                  from={0}
                  to={10}
                  separator=","
                  direction="up"
                  duration={2}
                />
                +
              </span>
              <span className="text-[12px] md:text-[14px] lg:text-[14px] text-center">
                Years Experience
              </span>
            </div>
            <div className="flex flex-col items-center justify-start">
              <span className="text-[24px] md:text-[40px] lg:text-[49px] font-[700]">
                <CountUp
                  from={0}
                  to={50}
                  separator=","
                  direction="up"
                  duration={2}
                />
                K+
              </span>
              <span className="text-[12px] md:text-[14px] lg:text-[14px] text-center">
                Participants
              </span>
            </div>
            <div className="flex flex-col items-center justify-start">
              <span className="text-[24px] md:text-[40px] lg:text-[49px] font-[700]">
                <CountUp
                  from={0}
                  to={500}
                  separator=","
                  direction="up"
                  duration={2}
                />
                +
              </span>
              <span className="text-[12px] md:text-[14px] lg:text-[14px] text-center">
                Topics
              </span>
            </div>
            <div className="flex flex-col items-center justify-start">
              <span className="text-[24px] md:text-[40px] lg:text-[49px] font-[700]">
                <CountUp
                  from={0}
                  to={4}
                  separator=","
                  direction="up"
                  duration={2}
                />
                K+
              </span>
              <span className="text-[12px] md:text-[14px] lg:text-[14px] text-center">
                Training Completed
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

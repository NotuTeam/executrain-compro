/** @format */

"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useAssetContext } from "@/components/AssetProvider";

export default function HeroSchedule({ children }: { children: ReactNode }) {
  const { getAssetUrl, getStaticAsset } = useAssetContext();

  const bannerPlain = getStaticAsset("banner_plain");
  const heroBackground = getAssetUrl("hero_schedule");

  return (
    <div
      className="min-w-[99dvw] min-h-[105dvh] text-white flex items-center justify-start px-[5%] md:px-[7%] lg:px-[10%]"
      style={{
        backgroundImage: `url('${bannerPlain}'), url('${heroBackground}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col gap-5 md:gap-8 items-start max-w-full">
        <div className="font-[500] flex gap-3">
          <Link href="/">Home</Link>
          <ChevronRight />
          <Link href="/">Schedule</Link>
        </div>
        <h1 className="text-[32px] md:text-[45px] lg:text-[61px] font-semibold">
          Schedule
        </h1>
        <p className="text-sm md:text-base">
          Our training programs are delivered through flexible scheduling
          options to suit your business operations. <br />
          <br />
          Choose from regular classes, corporate training schedules, or
          customized sessions, available both onsite and online to ensure
          minimal disruption and maximum impact.
        </p>
        {children}
      </div>
    </div>
  );
}

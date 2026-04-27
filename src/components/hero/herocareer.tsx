/** @format */

"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useAssetContext } from "@/components/AssetProvider";

export default function HeroCareer() {
  const { getAssetUrl, getStaticAsset } = useAssetContext();

  const bannerPlain = getStaticAsset("banner_plain");
  const heroBackground = getAssetUrl("hero_career");

  return (
    <div
      className="min-w-[99dvw] min-h-[70dvh] text-white flex items-center justify-start px-[5%] md:px-[7%] lg:px-[10%]"
      style={{
        backgroundImage: `url('${bannerPlain}'), url('${heroBackground}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col items-start max-w-full pt-[10%]">
        <div className="font-[500] flex gap-3 mb-5">
          <Link href="/">Home</Link>
          <ChevronRight />
          <Link href="/career">Career</Link>
        </div>
        <h1 className="text-[32px] md:text-[45px] lg:text-[61px] font-semibold">
          Leading the Future, Together
        </h1>
        <p className="text-sm md:text-base">
          A professional environment built on collaboration, expertise, and
          long-term growth.
        </p>
      </div>
    </div>
  );
}

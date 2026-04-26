/** @format */

"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useAssetContext } from "@/components/AssetProvider";

export default function HeroLearningPath() {
  const { getAssetUrl, getStaticAsset } = useAssetContext();

  const bannerPlain = getStaticAsset("banner_plain");
  const heroBackground = getAssetUrl("hero_background");

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
          <Link href="/learning-path">Learning Path</Link>
        </div>
        <h1 className="text-[32px] md:text-[45px] lg:text-[61px] font-semibold">
          Learning Path
        </h1>
        <p className="text-sm md:text-base">
          Our structured learning paths are designed to guide professionals from
          foundational skills to advanced expertise. We ensure every participant
          gains the right competencies through a progressive and practical
          approach—helping individuals and teams continuously grow and adapt to
          changing business demands.
        </p>
      </div>
    </div>
  );
}

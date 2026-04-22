/** @format */

"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useAssetContext } from "@/components/AssetProvider";

export default function HeroFreeTrial({ children }: { children: ReactNode }) {
  const { getAssetUrl, getStaticAsset } = useAssetContext();

  const bannerPlain = getStaticAsset("banner_plain");
  const heroBackground = getAssetUrl("hero_background");

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
          <Link href="/free-trial">Free Trial</Link>
        </div>
        <h1 className="text-[32px] md:text-[45px] lg:text-[61px] font-semibold">
          Free Trial
        </h1>
        <p className="text-sm md:text-base">
          Jelajahi program free trial Executrain untuk merasakan pengalaman
          pembelajaran sebelum mengikuti program penuh.
        </p>
        {children}
      </div>
    </div>
  );
}

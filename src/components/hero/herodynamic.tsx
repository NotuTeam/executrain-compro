/** @format */

"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useAssetContext } from "@/components/AssetProvider";

export default function HeroDynamic({ name }: { name: string }) {
  const { getAssetUrl, getStaticAsset } = useAssetContext();

  const bannerPlain = getStaticAsset("banner_plain");
  const heroBackground = getAssetUrl("hero_background");

  return (
    <div
      className="min-w-[99dvw] min-h-[60dvh] text-white flex items-center justify-start px-[5%] md:px-[7%] lg:px-[10%]"
      style={{
        backgroundImage: `url('${bannerPlain}'), url('${heroBackground}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col gap-5 items-start max-w-full">
        <div className="font-[500] flex gap-3 capitalize">
          <Link href="/">Home</Link>
          <ChevronRight />
          <Link href="/contact">{name?.toLowerCase() || "-"}</Link>
        </div>
        <h1 className="text-[32px] md:text-[45px] lg:text-[61px] font-semibold capitalize">
          {name?.toLowerCase() || "-"}
        </h1>
      </div>
    </div>
  );
}

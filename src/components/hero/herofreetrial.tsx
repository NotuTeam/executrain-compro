/** @format */

"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useAssetContext } from "@/components/AssetProvider";

export default function HeroFreeTrial({ children }: { children: ReactNode }) {
  const { getAssetUrl, getStaticAsset } = useAssetContext();

  const bannerPlain = getStaticAsset("banner_plain");
  const heroBackground = getAssetUrl("hero_free_trial");

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
        <h1 className="text-[32px] md:text-[45px] lg:text-[55px] font-semibold leading-14">
          Free Trial{" "}
          <span className="font-light">(Professional Skill Accelerator)</span>
        </h1>
        <p className="text-sm md:text-base">
          It is a program which combine hands-on technical training and Applied
          Professional Skills such as Emotional Intelligence and Project
          Management for Proffesionals. Proffesionals are able to perform more
          effectively, collaborate more productively, and deliver results with
          greater consistency. They do not only understand how to use tools and
          technologies, but also how to manage tasks, priorities, stakeholders,
          and emotions in real workplace situations
        </p>
        {children}
      </div>
    </div>
  );
}

/** @format */

"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "../atomic/button";
import { useAssetContext } from "@/components/AssetProvider";

import { ArrowRightFromLine, ChevronRight } from "lucide-react";

export default function HeroAbout() {
  const router = useRouter();
  const { getAssetUrl, getStaticAsset } = useAssetContext();

  const bannerPlain = getStaticAsset("banner_plain");
  const heroBackground = getAssetUrl("hero_background");
  const bodyPattern = getStaticAsset("body_pattern");
  const aboutImage = getAssetUrl("about_image");

  return (
    <div
      className="min-w-[99dvw] min-h-[105dvh] text-white flex items-center justify-start px-[5%] md:px-[7%] lg:px-[10%]"
      style={{
        backgroundImage: `url('${bannerPlain}'), url('${heroBackground}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="relative z-10 px-[5%] py-[5%] md:py-[2.5%] rounded-lg space-y-5 bg-white/50 backdrop-blur-md border border-white/20 shadow-xl"
        style={{
          backgroundImage: `url('${bodyPattern}')`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="font-[500] flex gap-3 text-black">
          <Link href="/">Home</Link>
          <ChevronRight />
          <Link href="/about">About</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-6 md:gap-10">
          <div className="items-start justify-start hidden md:flex">
            <img
              src={aboutImage}
              alt="about pict"
              className="h-[300px] w-[300px] md:h-[350px] md:w-[350px] lg:h-[400px] lg:w-[400px] object-contain"
            />
          </div>
          <div className="space-y-5 text-black flex flex-col items-center md:items-start justify-center">
            <h2 className="text-[32px] md:text-[40px] lg:text-[49px] font-semibold">
              About <span className="text-[#BE0F34]">Executrain</span>
            </h2>
            <p className="text-sm md:text-base text-left">
              Executrain adalah pusat pengembangan SDM, teknologi, dan solusi
              bisnis yang berdedikasi untuk membantu organisasi meningkatkan
              produktivitas dan beradaptasi di era transformasi digital. Kami
              menghadirkan pelatihan IT, layanan IT managed service, serta
              solusi teknologi terintegrasi yang dirancang khusus sesuai
              kebutuhan klien.
            </p>
            {/* <Button
              onClick={() => router.push("/contact")}
              label="Get to Know Us"
              rounded
              type="primary"
              icon={<ArrowRightFromLine size={18} />}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

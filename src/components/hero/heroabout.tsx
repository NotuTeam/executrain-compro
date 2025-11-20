/** @format */

import Image from "next/image";
import Link from "next/link";
import Button from "../atomic/button";

import AboutPict from "@/assets/about.png";

import { ArrowRightFromLine, ChevronRight } from "lucide-react";

export default function HeroAbout() {
  return (
    <div
      className="min-w-[99dvw] min-h-[105dvh] text-white flex items-center justify-start px-[5%] md:px-[7%] lg:px-[10%]"
      style={{
        backgroundImage: `url('./bannerplain.png'), url('./hero.webp')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative z-10 px-[5%] py-[5%] md:py-[2.5%] rounded-lg space-y-5 bg-white/50 backdrop-blur-md border border-white/20 shadow-xl">
        <div className="font-[500] flex gap-3 text-black">
          <Link href="/">Home</Link>
          <ChevronRight />
          <Link href="/about">About</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-6 md:gap-10">
          <div className="items-start justify-start hidden md:flex">
            <Image
              src={AboutPict}
              alt="testimoni pict"
              height={300}
              width={300}
              className="md:h-[350px] md:w-[350px] lg:h-[400px] lg:w-[400px]"
            />
          </div>
          <div className="space-y-5 text-black flex flex-col items-center md:items-start justify-center">
            <h2 className="text-[32px] md:text-[40px] lg:text-[49px] font-semibold">
              About <span className="text-[#00AEEF]">ExceLEARN</span>
            </h2>
            <p className="text-sm md:text-base text-center md:text-justify">
              ExceLEARN adalah pusat pengembangan SDM, teknologi, dan solusi
              bisnis yang berdedikasi untuk membantu organisasi meningkatkan
              produktivitas dan beradaptasi di era transformasi digital. Kami
              menghadirkan pelatihan IT, layanan IT managed service, serta
              solusi teknologi terintegrasi yang dirancang khusus sesuai
              kebutuhan klien.
            </p>
            <Button
              label="Get to Know Us"
              rounded
              type="primary"
              icon={<ArrowRightFromLine size={18} />}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/** @format */

"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import AboutPict from "@/assets/about.png";
import Button from "./atomic/button";

import { ArrowRightFromLine } from "lucide-react";

export default function AboutSection() {
  const router = useRouter();

  return (
    <div
      className="px-[5%] md:px-[7%] lg:px-[10%] py-[5%] grid grid-cols-1 md:grid-cols-2 w-full gap-6 md:gap-10 mt-[5%]"
      style={{
        backgroundImage: `url('./body.png')`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex items-center justify-center">
        <Image
          src={AboutPict}
          alt="testimoni pict"
          height={300}
          width={300}
          className="md:h-[350px] md:w-[350px] lg:h-[400px] lg:w-[400px]"
        />
      </div>
      <div className="space-y-3 md:space-y-5 flex flex-col justify-center items-center">
        <h2 className="text-[32px] md:text-[40px] lg:text-[49px] font-semibold">
          About <span className="text-[#00AEEF]">ExceLEARN</span>
        </h2>
        <p className="text-sm md:text-base text-left">
          ExceLEARN adalah pusat pengembangan SDM, teknologi, dan solusi bisnis
          yang berdedikasi untuk membantu organisasi meningkatkan produktivitas
          dan beradaptasi di era transformasi digital. Kami menghadirkan
          pelatihan IT, layanan IT managed service, serta solusi teknologi
          terintegrasi yang dirancang khusus sesuai kebutuhan klien.
        </p>
        <Button
          label="Get to Know Us"
          rounded
          type="primary"
          icon={<ArrowRightFromLine size={18} />}
          onClick={() => router.push("/about")}
        />
      </div>
    </div>
  );
}

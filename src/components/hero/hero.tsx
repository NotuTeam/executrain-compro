/** @format */

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "../atomic/button";
import { ArrowRightFromLine } from "lucide-react";
import { useAssetContext } from "@/components/AssetProvider";

export default function Hero() {
  const router = useRouter();
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const { getAssetUrl, getStaticAsset } = useAssetContext();

  const heroBackground = getAssetUrl("hero_background");
  const heroVideo = getAssetUrl("hero_video");
  const bannerOverlay = getStaticAsset("banner_overlay");

  return (
    <div className="relative min-w-[99dvw] min-h-[105dvh] text-white flex items-center justify-start px-[5%] md:px-[7%] lg:px-[10%] overflow-hidden">
      {/* Fallback Background Image - ditampilkan saat video loading */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          isVideoLoaded ? "opacity-0" : "opacity-100"
        }`}
        style={{
          backgroundImage: `url('${bannerOverlay}'), url('${heroBackground}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          isVideoLoaded ? "opacity-100" : "opacity-0"
        }`}
        onLoadedData={() => setIsVideoLoaded(true)}
        poster={heroBackground}
      >
        <source src={heroVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Banner.png Overlay - Layer di atas video */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          isVideoLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundImage: `url('${bannerOverlay}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          pointerEvents: "none",
        }}
      />

      {/* Optional: Overlay gelap tambahan untuk meningkatkan readability text */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-3 md:gap-5 items-start max-w-full md:max-w-[80%] lg:max-w-[50%]">
        <h1 className="text-[32px] md:text-[45px] lg:text-[61px] font-semibold">
          Excecutrain
        </h1>
        <p className="text-sm md:text-base">
          Excecutrain adalah penyedia layanan pelatihan bisnis dan IT terkemuka
          di bawah naungan PT. Bina Kinerja Nusantara. Kami berkomitmen untuk
          menghasilkan profesional TI berkualitas tinggi. Sejak tahun 2017, kami
          berkomitmen membantu berbagai perusahaan meningkatkan keterampilan
          teknis dan produktivitas karyawannya.
        </p>
        <Button
          onClick={() => router.push("/contact")}
          label="Start Consultation"
          rounded
          icon={<ArrowRightFromLine size={18} />}
        />
      </div>
    </div>
  );
}

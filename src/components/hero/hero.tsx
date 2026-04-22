/** @format */

"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import CountUp from "../atomic/countup";
import { useAssetContext } from "@/components/AssetProvider";
import { FadeInUp } from "../atomic/motion";

interface HeroProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
}

export default function Hero({ searchValue, onSearchChange }: HeroProps) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const { getAssetUrl, getStaticAsset } = useAssetContext();

  const heroBackground = getAssetUrl("hero_background");
  const heroVideo = getAssetUrl("hero_video");
  const bannerOverlay = getStaticAsset("banner_overlay");

  return (
    <div className="relative min-w-[99dvw] min-h-[105dvh] text-white flex items-end justify-start py-[5%] md:py-[7%] lg:py-[10%] px-[5%] md:px-[7%] lg:px-[10%] overflow-hidden">
      {/* Fallback Background Image - ditampilkan saat video loading */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          isVideoLoaded ? "opacity-0" : "opacity-100"
        }`}
        style={{
          backgroundImage: `url('${heroBackground}')`,
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
      <div className="absolute top-0 bottom-0 left-0 right-0 inset-0 bg-black/60" />

      {/* Content */}
      <div className="w-full relative z-10 max-w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-5">
        <FadeInUp delay={0.2} duration={0.6}>
          <div className="space-y-5 md:space-y-6">
            <h1 className="text-[32px] md:text-[45px] lg:text-[61px] font-semibold">
              Executrain
            </h1>
            <div className="w-full max-w-[680px] bg-white rounded-full border border-[#BE0F34] p-1.5 md:p-2 flex items-center">
              <input
                type="text"
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="search for product"
                className="w-full px-4 md:px-6 bg-transparent text-gray-700 placeholder:text-gray-400 outline-none text-[12px] md:text-[16px] leading-none"
              />
              <button
                type="button"
                aria-label="Search product"
                className="rounded-full bg-[#BE0F34] text-white flex items-center justify-center p-2"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>
        </FadeInUp>
        <FadeInUp delay={0.4} duration={0.6}>
          <div className="h-full flex items-end">
            <div className="w-full text-white grid grid-cols-4 gap-5">
              <div className="flex flex-col items-center justify-start">
                <span className="text-[24px] md:text-[32px] lg:text-[40px] font-[700]">
                  <CountUp
                    from={0}
                    to={10}
                    separator=","
                    direction="up"
                    duration={2}
                  />
                  +
                </span>
                <span className="text-[12px] md:text-[14px] lg:text-[14px] text-center">
                  Years Experience
                </span>
              </div>
              <div className="flex flex-col items-center justify-start">
                <span className="text-[24px] md:text-[32px] lg:text-[40px] font-[700]">
                  <CountUp
                    from={0}
                    to={50}
                    separator=","
                    direction="up"
                    duration={2}
                  />
                  K+
                </span>
                <span className="text-[12px] md:text-[14px] lg:text-[14px] text-center">
                  Participants
                </span>
              </div>
              <div className="flex flex-col items-center justify-start">
                <span className="text-[24px] md:text-[32px] lg:text-[40px] font-[700]">
                  <CountUp
                    from={0}
                    to={500}
                    separator=","
                    direction="up"
                    duration={2}
                  />
                  +
                </span>
                <span className="text-[12px] md:text-[14px] lg:text-[14px] text-center">
                  Topics
                </span>
              </div>
              <div className="flex flex-col items-center justify-start">
                <span className="text-[24px] md:text-[32px] lg:text-[40px] font-[700]">
                  <CountUp
                    from={0}
                    to={4}
                    separator=","
                    direction="up"
                    duration={2}
                  />
                  K+
                </span>
                <span className="text-[12px] md:text-[14px] lg:text-[14px] text-center">
                  Training Completed
                </span>
              </div>
            </div>
          </div>
        </FadeInUp>
      </div>
    </div>
  );
}

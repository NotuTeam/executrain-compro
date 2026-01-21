/** @format */

"use client";

import { useParams, useRouter } from "next/navigation";

import Container from "@/components/atomic/container";
import Button from "@/components/atomic/button";
import HeroScheduleDetail from "@/components/hero/heroscheduledetail";
import { Skeleton, HeroScheduleDetailSkeleton } from "@/components/skeleton";
import { useAssetContext } from "@/components/AssetProvider";

import { useScheduleDetail } from "@/services/schedule/hook";
import { Home } from "lucide-react";

export default function ScheduleDetail() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const { getAssetUrl, getStaticAsset } = useAssetContext();

  const { data, isLoading } = useScheduleDetail({ id: id as string });

  const bodyPattern = getStaticAsset("body_pattern");
  const bannerPlain = getStaticAsset("banner_plain");
  const heroBackground = getAssetUrl("hero_background");
  const ctaScheduleImage = getAssetUrl("cta_schedule_image");

  // Loading State
  if (isLoading) {
    return (
      <Container>
        <HeroScheduleDetailSkeleton />
        <div
          className="px-[10%] py-[15%] space-y-5 min-h-[60dvh] w-full"
          style={{
            backgroundImage: `url('${bodyPattern}'), url('${bodyPattern}')`,
            backgroundSize: "20%",
            backgroundPosition: "-10% 80%, 110% 40%",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <div className="pb-[5%] px-[5%] md:px-[15%] space-y-10 w-full">
          <Skeleton className="h-12 w-1/2 mx-auto" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-40" />
            ))}
          </div>
        </div>
        <div className="min-h-[100px] w-full px-[10dvw] py-[10dvh]">
          <Skeleton className="w-full h-[200px]" />
        </div>
      </Container>
    );
  }

  // Not Found State
  if (!data) {
    return (
      <Container>
        <div
          className="min-w-[99dvw] min-h-[80dvh] flex items-center justify-center px-[5%] md:px-[7%] lg:px-[10%]"
          style={{
            backgroundImage: `url('${bannerPlain}'), url('${heroBackground}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="bg-white/50 backdrop-blur-md border border-white/20 rounded-3xl p-[8%] md:p-[5%] flex flex-col items-center gap-5 text-center max-w-lg">
            <h2 className="text-[32px] md:text-[40px] font-semibold text-gray-800">
              Schedule Not Found
            </h2>
            <p className="text-[16px] md:text-[18px] text-gray-600">
              The schedule you are looking for does not exist or has been removed.
            </p>
            <Button
              label="Back to Home"
              rounded
              type="primary"
              icon={<Home size={18} />}
              onClick={() => router.push("/")}
            />
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <HeroScheduleDetail data={data} />
      <div
        className="px-[10%] py-[15%] space-y-5 min-h-[60dvh] w-full"
        style={{
          backgroundImage: `url('${bodyPattern}'), url('${bodyPattern}')`,
          backgroundSize: "20%",
          backgroundPosition: "-10% 80%, 110% 40%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <p>{data?.schedule_description}</p>
      </div>
      {Array.isArray(data?.benefits) && data?.benefits[0] !== '-' && (
 <div className="pb-[5%] px-[5%] md:px-[15%] space-y-10 w-full">
        <h4 className="text-[49px] text-center font-semibold">
          {"What You'll Learn"}
        </h4>
        <div className="flex items-center justify-center flex-wrap gap-5">
          {data?.benefits?.map((each: string, index: number) => (
            <div
                className="text-[14px] min-h-[30dvh] justify-between w-[100%] md:w-[23%] bg-white/50 backdrop-blur-md border border-white/20 shadow-xl p-5 rounded-3xl flex flex-col items-center gap-5"
                key={index}
              >
                <p className="text-center">{each}</p>
                <div className="w-[50%] border" />
              </div>
          ))}
        </div>
      </div>
      )}
     
      <div className="min-h-[100px] w-full px-[10dvw] py-[10dvh]">
        <div
          className="bg-blue-200 w-full min-h-[200px] rounded-2xl flex items-center justify-between px-[5%]"
          style={{
            backgroundImage: `url('${bannerPlain}'), url('${ctaScheduleImage}')`,
            backgroundSize: "cover",
            backgroundPosition: "0 25%",
          }}
        >
          <div className="text-white text-[49px] font-[500]">
            <h2>Join & Learn - Public Class</h2>
            <p className="text-[35px] font-[400]">Register here</p>
          </div>
          <div>
            <Button
              onClick={() => {
                if (data?.link && data.link.trim() !== "") {
                  window.open(data.link, "_blank", "noopener,noreferrer");
                } else {
                  router.push("https://wa.me/62895805254925");
                }
              }}
              label={
                data?.link && data.link.trim() !== ""
                  ? "Register Now"
                  : "Contact Us"
              }
              rounded
            />
          </div>
        </div>
      </div>
    </Container>
  );
}

/** @format */

"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import dayjs from "dayjs";

import Container from "@/components/atomic/container";
import Button from "@/components/atomic/button";
import HeroScheduleDetail from "@/components/hero/heroscheduledetail";
import { Skeleton, HeroScheduleDetailSkeleton } from "@/components/skeleton";
import { useAssetContext } from "@/components/AssetProvider";
import Benefit from "@/components/benefit";
import ScheduleRegistrationModal from "@/components/scheduleregistrationmodal";

import { useFreeTrialScheduleDetail } from "@/services/free-trial/hook";
import { ScheduleProps } from "@/types/schedule";
import { Home } from "lucide-react";

export default function FreeTrialScheduleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const [openRegistration, setOpenRegistration] = useState(false);
  const { getAssetUrl, getStaticAsset } = useAssetContext();

  const { data, isLoading } = useFreeTrialScheduleDetail({ id: id as string });

  const bodyPattern = getStaticAsset("body_pattern");
  const bannerPlain = getStaticAsset("banner_plain");
  const heroBackground = getAssetUrl("hero_background");
  const ctaScheduleImage = getAssetUrl("cta_schedule_image");

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
      </Container>
    );
  }

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
              The free trial schedule you are looking for does not exist or has
              been removed.
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
      <HeroScheduleDetail
        data={data as unknown as ScheduleProps}
        onRegister={() => setOpenRegistration(true)}
      />
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
      {Array.isArray(data?.benefits) && data?.benefits[0] !== "-" ? (
        <Benefit data={data?.benefits || []} />
      ) : null}

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
            <h2>Join & Learn - Free Trial Class</h2>
            <p className="text-[35px] font-[400]">Register here</p>
          </div>
          <div>
            <Button
              onClick={() => setOpenRegistration(true)}
              label="Register Now"
              rounded
            />
          </div>
        </div>
      </div>

      <ScheduleRegistrationModal
        isOpen={openRegistration}
        onClose={() => setOpenRegistration(false)}
        productName={data?.product_name || data?.schedule_name || "-"}
        scheduleDate={dayjs(data?.schedule_date).format("DD MMMM YYYY")}
        scheduleType="FREE_TRIAL"
      />
    </Container>
  );
}

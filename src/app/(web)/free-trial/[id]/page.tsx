/** @format */

"use client";

import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";

import Container from "@/components/atomic/container";
import HeroFreeTrialDetail from "@/components/hero/herofreetrialdetail";
import FreeTrialList from "@/components/freetriallist";
import Button from "@/components/atomic/button";
import { Skeleton, HeroProductDetailSkeleton } from "@/components/skeleton";
import CTA from "@/components/cta";
import Benefit from "@/components/benefit";
import FreeTrialRelatedSchedule from "@/components/freetrialrelatedschedule";

import {
  useFreeTrialDetail,
  useFreeTrialFiltered,
  useFreeTrialScheduleByProduct,
} from "@/services/free-trial/hook";
import { Home } from "lucide-react";

export default function FreeTrialDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const { data, isLoading } = useFreeTrialDetail({ id: id as string });
  const { data: relatedProductsData, isLoading: relatedProductsLoading } =
    useFreeTrialFiltered({
      product_category: data?.product_category,
      sort_order: "desc",
    });

  const { data: relatedSchedule = [], isLoading: scheduleLoading } =
    useFreeTrialScheduleByProduct({
      product_id: id as string,
    });

  const relatedProducts = useMemo(() => {
    const all = relatedProductsData?.data || [];
    return all.filter((item) => item._id !== id).slice(0, 6);
  }, [relatedProductsData, id]);

  if (isLoading) {
    return (
      <Container>
        <HeroProductDetailSkeleton />
        <div className="px-[10%] py-[15%] space-y-5 w-full">
          <Skeleton className="h-12 w-1/2" />
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
            backgroundImage: `url('https://res.cloudinary.com/dyn73qnjx/image/upload/v1771233518/Subtract_hwkrrr.png'), url('https://res.cloudinary.com/dgd3iusxa/image/upload/v1777208395/executrain/assets/ddxseg9njypotvqwkgdb.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="bg-white/50 backdrop-blur-md border border-white/20 rounded-3xl p-[8%] md:p-[5%] flex flex-col items-center gap-5 text-center max-w-lg">
            <h2 className="text-[32px] md:text-[40px] font-semibold text-gray-800">
              Free Trial Not Found
            </h2>
            <p className="text-[16px] md:text-[18px] text-gray-600">
              The free trial you are looking for does not exist or has been
              removed.
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
      <HeroFreeTrialDetail data={data} />
      <div className="px-[10%] py-[15%] space-y-5 w-full">
        <h3 className="text-[49px] font-semibold">Free Trial Overview</h3>
        <p>{data?.product_description}</p>
      </div>
      {Array.isArray(data?.benefits) && data?.benefits[0] !== "-" ? (
        <Benefit data={data?.benefits || []} />
      ) : null}
      <FreeTrialRelatedSchedule
        data={relatedSchedule}
        isLoading={scheduleLoading}
      />
      {/* <div className="px-[5%] md:px-[7%] lg:px-[10%] w-full">
        <FreeTrialList
          data={relatedProducts}
          title="Related Free Trial"
          isLoading={relatedProductsLoading}
        />
      </div> */}
      <CTA />
    </Container>
  );
}

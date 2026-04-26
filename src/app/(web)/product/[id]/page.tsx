/** @format */

"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

import Container from "@/components/atomic/container";
import HeroProductDetail from "@/components/hero/heroproductdetail";
import ProductList from "@/components/productlist";
import Button from "@/components/atomic/button";
import { Skeleton, HeroProductDetailSkeleton } from "@/components/skeleton";
import CTA from "@/components/cta";
import Benefit from "@/components/benefit";
import RelatedScheduleList from "@/components/relatedschedule";

import { useProduct, useProductDetail } from "@/services/product/hook";
import { useScheduleByProduct } from "@/services/schedule/hook";
import { Home } from "lucide-react";

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const { data, isLoading } = useProductDetail({ id: id as string });
  const { data: product = [], isLoading: productLoading } = useProduct({
    product_category: data?.product_category,
  });
  const { data: relatedSchedule = [], isLoading: scheduleLoading } =
    useScheduleByProduct({
      product_id: id as string,
    });

  // Loading State
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
        <div className="w-full mb-20 px-[5%] md:px-[15%] py-[5%]">
          <Skeleton className="h-12 w-1/2 mx-auto mb-10" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-40" />
            ))}
          </div>
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
            backgroundImage: `url('https://res.cloudinary.com/dyn73qnjx/image/upload/v1771233518/Subtract_hwkrrr.png'), url('https://res.cloudinary.com/dgd3iusxa/image/upload/v1777208395/executrain/assets/ddxseg9njypotvqwkgdb.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="bg-white/50 backdrop-blur-md border border-white/20 rounded-3xl p-[8%] md:p-[5%] flex flex-col items-center gap-5 text-center max-w-lg">
            <h2 className="text-[32px] md:text-[40px] font-semibold text-gray-800">
              Product Not Found
            </h2>
            <p className="text-[16px] md:text-[18px] text-gray-600">
              The product you are looking for does not exist or has been
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
      <HeroProductDetail data={data} />
      <div className="px-[10%] py-[15%] space-y-5 w-full">
        <h3 className="text-[49px] font-semibold">Product Overview</h3>
        <p>{data?.product_description}</p>
      </div>
      {Array.isArray(data?.benefits) && data?.benefits[0] !== "-" ? (
        <Benefit data={data?.benefits || []} />
      ) : null}
      {/* {data?.learning_path_banner?.url && (
        <div className="flex flex-col items-center justify-center text-center pt-[8%] space-y-5 px-[5%] md:px-[7%] lg:px-[10%] w-full border-white border-b-5 box-border">
          <h2 className="font-semibold text-[32px] md:text-[40px] lg:text-[49px] mb-6 md:mb-10">
            Learning Path
          </h2>
          <Image
            alt="learning-path"
            src={data?.learning_path_banner?.url || ""}
            width={100}
            height={100}
            className="w-full h-auto"
          />
          {data?.learning_path_redirect_url && (
            <Button
              onClick={() => {
                window.open(
                  data?.learning_path_redirect_url,
                  "_blank",
                  "noopener,noreferrer",
                );
              }}
              label={"Explore More →"}
              rounded
              type="primary"
            />
          )}
        </div>
      )} */}
      <RelatedScheduleList data={relatedSchedule} isLoading={scheduleLoading} />
      <div className="px-[5%] md:px-[7%] lg:px-[10%] w-full">
        <ProductList
          data={product}
          title="Related Product"
          isLoading={productLoading}
        />
      </div>
      <CTA />
    </Container>
  );
}

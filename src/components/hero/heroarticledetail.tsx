/** @format */

"use client";

import { ArticleProps } from "@/types/article";
import Image from "next/image";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function HeroArticleDetail({
  data,
  isLoading = false,
}: {
  data?: ArticleProps;
  isLoading?: boolean;
}) {
  if (!data && !isLoading) {
    return null;
  }

  return (
    <div
      className="min-w-[99dvw] min-h-[80dvh] text-white flex items-center justify-start px-[5%] md:px-[7%] lg:px-[10%]"
      style={{
        backgroundImage: `url('https://res.cloudinary.com/dyn73qnjx/image/upload/v1771233518/Subtract_hwkrrr.png'), url('https://res.cloudinary.com/dgd3iusxa/image/upload/v1764557996/hero_ygtlgs.webp')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col gap-5 md:gap-8 items-start bg-white/50 backdrop-blur-md border border-white/20 text-black rounded-lg w-full p-[5%] md:p-[5%] mt-[10%] md:mb-[-10%]">
        <div className="font-[500] flex gap-3 text-black">
          <Link href="/">Home</Link>
          <ChevronRight />
          <Link href="/about">Blog</Link>
          <ChevronRight />
          <span>{data?.title || ""}</span>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-3 md:gap-0">
          <h1 className="text-[28px] md:text-[40px] lg:text-[49px] font-semibold max-w-[75%]">
            {data?.title || "-"}
          </h1>
        </div>
        <div
          className="hidden md:grid rounded-2xl w-full min-h-[60dvh] grid-cols-1 md:grid-cols-3 p-5 md:p-10"
          style={{
            backgroundImage: `url('${data?.featured_image?.url}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="md:col-span-2"></div>
        </div>
        <div className="grid md:hidden rounded-2xl w-full min-h-[100px] grid-cols-1 md:grid-cols-3 p-5 md:p-10">
          <div className="md:col-span-2">
            <Image
              src={data?.featured_image?.url || ""}
              alt={data?.title || ""}
              width={1000}
              height={1000}
              className="w-full rounded-t-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

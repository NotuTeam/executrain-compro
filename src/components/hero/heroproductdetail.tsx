/** @format */

"use client";

import { useRouter } from "next/navigation";
import Button from "../atomic/button";
import Tag from "../atomic/tag";
import Link from "next/link";

import {
  CornerRightUp,
  Users,
  BookOpenCheck,
  UserRound,
  Clock,
  ChevronRight,
} from "lucide-react";

import { ProductProps } from "@/types/product";
import Image from "next/image";

export default function HeroProductDetail({
  data,
  isLoading = false,
}: {
  data?: ProductProps;
  isLoading?: boolean;
}) {
  const router = useRouter();

  // Don't render if no data and not loading
  if (!data && !isLoading) {
    return null;
  }

  return (
    <div
      className="min-w-[100dvw] min-h-[80dvh] text-white flex items-center justify-start md:px-[7%] lg:px-[10%]"
      style={{
        backgroundImage: `url('https://res.cloudinary.com/dyn73qnjx/image/upload/v1771233518/Subtract_hwkrrr.png'), url('https://res.cloudinary.com/dgd3iusxa/image/upload/v1777208395/executrain/assets/ddxseg9njypotvqwkgdb.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col gap-5 md:gap-8 items-start bg-white/50 backdrop-blur-md border border-white/20 text-black md:rounded-lg w-full max-w-[100dvw] md:max-w-[90dvw] p-[5%] md:p-[5%] mt-[15%] mt-[7%] md:mb-[-10%]">
        <div className="font-[500] flex items-center gap-3 text-black w-full max-w-full min-w-0 overflow-hidden whitespace-nowrap">
          <Link href="/" className="shrink-0">
            Home
          </Link>
          <ChevronRight className="shrink-0" />
          <Link href="/product" className="shrink-0">
            Product
          </Link>
          <ChevronRight className="shrink-0" />
          <span
            className="min-w-0 max-w-[50%] truncate"
            title={data?.product_name || ""}
          >
            {data?.product_name || ""}
          </span>
        </div>
        <Tag label={data?.product_category.replace("_", " ") || "UNSET"} />
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-3 md:gap-0">
          <h1 className="text-[28px] md:text-[40px] lg:text-[49px] font-semibold w-full max-w-full md:max-w-[60%] lg:max-w-[75%] min-w-0 leading-[1.15] md:leading-[1.1] wrap-break-words">
            {data?.product_name || "-"}
          </h1>
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
                ? "Learn More →"
                : "Request Proposal"
            }
            rounded
            type="primary"
          />
        </div>
        <div
          className="hidden md:grid rounded-2xl w-full min-h-[100px] grid-cols-1 md:grid-cols-3 p-5 md:p-10"
          style={{
            backgroundImage: `url('${data?.banner?.url}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="md:col-span-2"></div>
          <div className="min-h-[50dvh] flex items-center">
            <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-xl p-5 md:p-8 rounded-3xl space-y-3 h-fit ">
              <h5 className="font-[500] text-[18px] md:text-[24px]">
                Course Feature
              </h5>
              <div className="grid grid-cols-2 border-t border-[#BE0F34] pt-3 gap-4">
                <div className="flex flex-col gap-4 font-[300] text-xs md:text-sm">
                  <span className="flex items-center gap-2">
                    <CornerRightUp size={14} color="#BE0F34" />
                    Skill Level
                  </span>
                  <span className="flex items-center gap-2">
                    <Users size={14} color="#BE0F34" />
                    Students
                  </span>
                  <span className="flex items-center gap-2">
                    <BookOpenCheck size={14} color="#BE0F34" />
                    Language
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock size={14} color="#BE0F34" />
                    Duration
                  </span>
                </div>
                <div className="flex flex-col gap-4 font-[400] text-xs md:text-sm">
                  <span className="capitalize">
                    {data?.skill_level?.toLowerCase().replace("_", " ") || "-"}
                  </span>
                  <span>{data?.max_participant || "-"}</span>
                  <span className="capitalize">
                    {data?.language?.toLowerCase() || "-"}
                  </span>
                  <span>{data?.duration || "-"} Minutes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid md:hidden rounded-2xl w-full min-h-[100px] grid-cols-1 md:grid-cols-3 p-5 md:p-10">
          <div className="md:col-span-2">
            <Image
              src={data?.banner?.url || ""}
              alt={data?.product_name || ""}
              width={1000}
              height={1000}
              className="w-full rounded-t-2xl"
            />
          </div>
          <div>
            <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-xl p-5 md:p-8 rounded-b-2xl space-y-3">
              <h5 className="font-[500] text-[18px] md:text-[24px]">
                Course Feature
              </h5>
              <div className="grid grid-cols-2 border-t border-[#BE0F34] pt-3">
                <div className="flex flex-col gap-2 font-[300] text-xs md:text-sm">
                  <span className="flex items-center gap-2">
                    <CornerRightUp size={14} color="#BE0F34" />
                    Skill Level
                  </span>
                  <span className="flex items-center gap-2">
                    <Users size={14} color="#BE0F34" />
                    Students
                  </span>
                  <span className="flex items-center gap-2">
                    <UserRound size={14} color="#BE0F34" />
                    Lecturers
                  </span>
                  <span className="flex items-center gap-2">
                    <BookOpenCheck size={14} color="#BE0F34" />
                    Language
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock size={14} color="#BE0F34" />
                    Duration
                  </span>
                </div>
                <div className="flex flex-col gap-2 font-[400] text-xs md:text-sm">
                  <span className="capitalize">
                    {data?.skill_level?.toLowerCase().replace("_", " ") || "-"}
                  </span>
                  <span>{data?.max_participant || "-"}</span>
                  <span>{data?.instructors || "-"}</span>
                  <span className="capitalize">
                    {data?.language?.toLowerCase() || "-"}
                  </span>
                  <span>{data?.duration || "-"} Minutes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

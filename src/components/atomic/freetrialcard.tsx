/** @format */

"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { CornerRightUp, Users } from "lucide-react";
import { Tooltip } from "antd";

import Tag from "./tag";
import Button from "./button";
import { ArrowRightFromLine } from "lucide-react";

import HeroBG from "@/assets/banner.jpg";

import { FreeTrialProductProps } from "@/types/free-trial";

interface CompProps {
  data: FreeTrialProductProps;
  size?: string;
}

export default function FreeTrialCard({ data, size = "md" }: CompProps) {
  const router = useRouter();

  if (size === "md") {
    return (
      <div
        onClick={() => router.push(`/free-trial/${data._id}`)}
        className="rounded-xl overflow-hidden shadow-[0px_0px_50px_5px_rgba(0,0,0,0.11)] cursor-pointer"
      >
        <div className="h-36 md:h-48 bg-slate-100 overflow-hidden">
          <Image
            src={data?.banner?.url || HeroBG}
            alt={data?.banner?.public_id || ""}
            className="w-full h-full object-cover"
            width={1000}
            height={0}
          />
        </div>

        <div className="p-[5%]">
          <div className="flex justify-between items-start pb-5 md:pb-8 border-b-2 border-[#BE0F34]">
            <Tooltip placement="top" title={data?.product_name || "-"}>
              <h3 className="text-[16px] md:text-[20px] lg:text-[24px] font-semibold text-left max-w-[65%] truncate">
                {data?.product_name || "-"}
              </h3>
            </Tooltip>

            <Tag label={data?.product_category || "UNSET"} />
          </div>
          <div className="flex justify-between pt-2 md:pt-3">
            <div className="flex gap-3 items-center">
              <div className="flex items-center gap-1">
                <CornerRightUp size={12} color="#BE0F34" />
                <span className="text-[12px] capitalize">
                  {data?.skill_level?.replace("_", " ").toLowerCase() || "-"}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Users size={12} color="#BE0F34" />
                <span className="text-[12px]">{data?.max_participant}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl overflow-hidden shadow-[0px_0px_50px_5px_rgba(0,0,0,0.11)] grid grid-cols-1 md:grid-cols-4 w-full">
      <div
        className="h-48 md:h-auto"
        style={{
          backgroundImage: `url(${data?.banner?.url || "https://res.cloudinary.com/dgd3iusxa/image/upload/v1777208395/executrain/assets/ddxseg9njypotvqwkgdb.jpg"})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="md:col-span-3">
        <div className="flex flex-col justify-between items-start p-5 md:p-8 gap-2">
          <Tag label={data?.product_category?.replace("_", " ") || "UNSET"} />
          <Tooltip placement="top" title={data?.product_name || "-"}>
            <h3 className="text-[18px] md:text-[20px] lg:text-[24px] font-semibold w-full truncate text-left">
              {data?.product_name || "-"}
            </h3>
          </Tooltip>
          <p className="text-left text-sm md:text-base line-clamp-3">
            {data?.product_description || "-"}
          </p>
          <div className="flex justify-between w-full mt-5 md:mt-8 items-end md:items-center gap-3 md:gap-0">
            <div className="flex gap-1 md:gap-5 items-center w-[40%] md:w-[70%] flex-wrap">
              <div className="flex items-center gap-1">
                <CornerRightUp size={12} color="#BE0F34" />
                <span className="text-[12px] capitalize">
                  {data?.skill_level?.replace("_", " ").toLowerCase() || "-"}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Users size={12} color="#BE0F34" />
                <span className="text-[12px]">{data?.max_participant}</span>
              </div>
            </div>
            <Button
              onClick={() => router.push(`/free-trial/${data._id}`)}
              label="Read More"
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

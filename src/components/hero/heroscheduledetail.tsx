/** @format */

"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "../atomic/button";
import {
  CornerRightUp,
  Users,
  BookOpenCheck,
  UserRound,
  Clock,
  ShieldCheck,
  CircleCheckBig,
  MapPin,
} from "lucide-react";
import dayjs from "dayjs";

import { ScheduleProps } from "@/types/schedule";

export default function HeroScheduleDetail({ 
  data, 
  isLoading = false 
}: { 
  data?: ScheduleProps; 
  isLoading?: boolean;
}) {
  const router = useRouter();

  // Don't render if no data and not loading
  if (!data && !isLoading) {
    return null;
  }

  return (
    <div
      className="min-w-[99dvw] min-h-[80dvh] text-white flex items-center justify-start px-[5%] md:px-[7%] lg:px-[10%]"
      style={{
        backgroundImage: `url('https://res.cloudinary.com/dgd3iusxa/image/upload/v1764559418/bannerplain_dojpcb.png'), url('https://res.cloudinary.com/dgd3iusxa/image/upload/v1764559418/bannerplain_dojpcb.png'), url('https://res.cloudinary.com/dgd3iusxa/image/upload/v1764557996/hero_ygtlgs.webp')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col gap-5 md:gap-8 items-start bg-white/50 backdrop-blur-md border border-white/20 text-black rounded-lg w-full p-[5%] md:p-[5%] mt-[10%] md:mb-[-10%]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-3 md:gap-0">
          <h1 className="text-[28px] md:text-[40px] lg:text-[49px] font-semibold">
            {data?.schedule_name}
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
                ? "Register Now →"
                : "Contact Us"
            }
            rounded
            type="primary"
          />
        </div>
        <div
          className="hidden md:grid rounded-2xl w-full min-h-[250px] md:min-h-[450px] grid-cols-1 md:grid-cols-3 p-5 md:p-10"
          style={{
            backgroundImage: `url('${data?.banner?.url}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="hidden md:block md:col-span-2"></div>
          <div>
            <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-xl p-5 md:p-8 rounded-3xl space-y-3">
              <h5 className="font-[500] text-[18px] md:text-[24px]">
                Course Feature
              </h5>
              <div className="grid grid-cols-2 border-t border-[#00AEEF] pt-3">
                <div className="flex flex-col gap-2 font-[300] text-xs md:text-sm">
                  <span className="flex items-center gap-2">
                    <CornerRightUp size={14} color="#00AEEF" />
                    Skill Level
                  </span>
                  <span className="flex items-center gap-2">
                    <Users size={14} color="#00AEEF" />
                    Students
                  </span>
                  <span className="flex items-center gap-2">
                    <UserRound size={14} color="#00AEEF" />
                    Lecturers
                  </span>
                  <span className="flex items-center gap-2">
                    <BookOpenCheck size={14} color="#00AEEF" />
                    Language
                  </span>
                  <span className="flex items-center gap-2">
                    <ShieldCheck size={14} color="#00AEEF" />
                    Certification
                  </span>
                </div>
                <div className="flex flex-col gap-2 font-[400] text-xs md:text-sm">
                  <span className="capitalize">
                    {data?.skill_level?.toLowerCase().replace("_", " ") || "-"}
                  </span>
                  <span>{data?.quota || "-"}</span>
                  <span>{data?.lecturer || "-"}</span>
                  <span className="capitalize">
                    {data?.language?.toLowerCase() || "-"}
                  </span>
                  <span>{data?.is_assestment ? "Yes" : "No"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid md:hidden rounded-2xl w-full min-h-[250px] md:min-h-[450px] grid-cols-1 md:grid-cols-3 p-5 md:p-10">
          <div className="md:col-span-2">
            <Image
              src={data?.banner?.url || ""}
              alt={data?.schedule_name || ""}
              width={1000}
              height={1000}
              className="w-full rounded-t-2xl"
            />
          </div>
          <div>
            <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-xl p-5 md:p-8 rounded-b-3xl space-y-3 relative pt-[15%]">
              <h5 className="font-[500] text-[18px] md:text-[24px]">
                Course Feature
              </h5>
              <div className="grid grid-cols-2 border-t border-[#00AEEF] pt-3">
                <div className="flex flex-col gap-2 font-[300] text-xs md:text-sm">
                  <span className="flex items-center gap-2">
                    <CornerRightUp size={14} color="#00AEEF" />
                    Skill Level
                  </span>
                  <span className="flex items-center gap-2">
                    <Users size={14} color="#00AEEF" />
                    Students
                  </span>
                  <span className="flex items-center gap-2">
                    <UserRound size={14} color="#00AEEF" />
                    Lecturers
                  </span>
                  <span className="flex items-center gap-2">
                    <BookOpenCheck size={14} color="#00AEEF" />
                    Language
                  </span>
                  <span className="flex items-center gap-2">
                    <ShieldCheck size={14} color="#00AEEF" />
                    Certification
                  </span>
                </div>
                <div className="flex flex-col gap-2 font-[400] text-xs md:text-sm">
                  <span className="capitalize">
                    {data?.skill_level?.toLowerCase().replace("_", " ") || "-"}
                  </span>
                  <span>{data?.quota || "-"}</span>
                  <span>{data?.lecturer || "-"}</span>
                  <span className="capitalize">
                    {data?.language?.toLowerCase() || "-"}
                  </span>
                  <span>{data?.is_assestment ? "Yes" : "No"}</span>
                </div>
              </div>
              <div className="absolute top-[-30%] left-0 right-0 px-[15%]">
                <div className="flex rounded-2xl overflow-hidden shadow-xl">
                  <div className="flex-1 flex flex-col items-center text-center bg-white/80 backdrop-blur-md border border-white/20 p-4 md:p-5 gap-3 md:gap-4">
                    <Clock
                      size={28}
                      className="md:w-[34px] md:h-[34px]"
                      color="#00AEEF"
                    />
                    <div className="flex flex-col text-sm md:text-base gap-1">
                      <span className="font-semibold">Start</span>
                      <span className="text-xs md:text-sm">
                        {data?.schedule_start || "-"} WIB
                      </span>
                      <span className="text-xs md:text-sm">
                        {dayjs(data?.schedule_date).format("DD MMM YYYY")}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col items-center text-center bg-white/80 backdrop-blur-md border border-white/20 p-4 md:p-5 gap-3 md:gap-4">
                    <CircleCheckBig
                      size={28}
                      className="md:w-[34px] md:h-[34px]"
                      color="#00AEEF"
                    />
                    <div className="flex flex-col text-sm md:text-base gap-1">
                      <span className="font-semibold">End</span>
                      <span className="text-xs md:text-sm">
                        {data?.schedule_end || "-"} WIB
                      </span>
                      <span className="text-xs md:text-sm">
                        {dayjs(data?.schedule_date).format("DD MMM YYYY")}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col items-center text-center bg-white/80 backdrop-blur-md border border-white/20 p-4 md:p-5 gap-3 md:gap-4">
                    <MapPin
                      size={28}
                      className="md:w-[34px] md:h-[34px]"
                      color="#00AEEF"
                    />
                    <div className="flex flex-col text-sm md:text-base gap-1">
                      <span className="font-semibold">Location</span>
                      <span className="text-xs md:text-sm">
                        {data?.location || "-"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5 mt-[-5%] md:mt-[-10%] px-[3%]">
          <div className="flex bg-white/80 backdrop-blur-md border border-white/20 shadow-xl rounded-xl p-4 md:p-5 gap-3 md:gap-4">
            <Clock
              size={28}
              className="md:w-[34px] md:h-[34px]"
              color="#00AEEF"
            />
            <div className="flex flex-col text-sm md:text-base">
              <span className="font-semibold">Start</span>
              <span className="text-xs md:text-sm">
                {data?.schedule_start || "-"} WIB
              </span>
              <span className="text-xs md:text-sm">
                {dayjs(data?.schedule_date).format("DD MMM YYYY")}
              </span>
            </div>
          </div>
          <div className="flex bg-white/80 backdrop-blur-md border border-white/20 shadow-xl rounded-xl p-4 md:p-5 gap-3 md:gap-4">
            <CircleCheckBig
              size={28}
              className="md:w-[34px] md:h-[34px]"
              color="#00AEEF"
            />
            <div className="flex flex-col text-sm md:text-base">
              <span className="font-semibold">End</span>
              <span className="text-xs md:text-sm">
                {data?.schedule_end || "-"} WIB
              </span>
              <span className="text-xs md:text-sm">
                {dayjs(data?.schedule_date).format("DD MMM YYYY")}
              </span>
            </div>
          </div>
          <div className="flex bg-white/80 backdrop-blur-md border border-white/20 shadow-xl rounded-xl p-4 md:p-5 gap-3 md:gap-4">
            <MapPin
              size={28}
              className="md:w-[34px] md:h-[34px]"
              color="#00AEEF"
            />
            <div className="flex flex-col text-sm md:text-base">
              <span className="font-semibold">Location</span>
              <span className="text-xs md:text-sm">
                {data?.location || "-"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

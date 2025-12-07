/** @format */

"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { X } from "lucide-react";
import Button from "./atomic/button";

import { PromoProps } from "@/types/promo";

dayjs.extend(duration);

interface CompProps {
  size?: string;
  data: PromoProps | null;
}

export default function Promo({ size = "md", data }: CompProps) {
  const router = useRouter();

  const promoEndDate = useMemo(() => {
    if (data && data?.end_date) {
      return typeof data?.end_date === "string"
        ? dayjs(data?.end_date)
        : data?.end_date;
    }
    return dayjs().add(3, "day").hour(23).minute(59).second(59);
  }, [data?.end_date]);

  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isExpired, setIsExpired] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = dayjs();
      const diff = promoEndDate.diff(now);

      if (diff <= 0) {
        setIsExpired(true);
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const dur = dayjs.duration(diff);

      setTimeLeft({
        hours: Math.floor(dur.asHours()),
        minutes: dur.minutes(),
        seconds: dur.seconds(),
      });
    };

    calculateTimeLeft();

    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [promoEndDate]);

  const formatNumber = (num: number) => String(num).padStart(2, "0");

  if (isExpired || isClosed) {
    return null;
  }

  if (size === "sm" || size === "md") {
    return (
      <div className="bg-red-500 flex justify-between text-white items-center px-[5%] py-5 relative">
        <div className="flex gap-2 flex-col max-w-[65%]">
          <span className="text-[20px] md:text-[24px] font-semibold">
            {data?.promo_name} with{" "}
            <span className="font-[700]">{data?.percentage}% OFF!</span>
          </span>
          <p className="hidden md:block text-[12px] md:text-[14px] font-[200]">
            {data?.promo_description}
          </p>
        </div>

        <div className="flex items-center gap-3 md:gap-5 flex-col md:flex-row">
          <div className="flex gap-1 md:gap-2">
            <div className="flex flex-col items-center ">
              <span className="text-[18px] md:text-[24px] font-semibold">
                {formatNumber(timeLeft.hours)}
              </span>
              <span className="text-[8px] md:text-[10px] hidden md:block">
                Hours
              </span>
            </div>
            <div>
              <span className="text-[18px] md:text-[24px] font-semibold">
                :
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[18px] md:text-[24px] font-semibold">
                {formatNumber(timeLeft.minutes)}
              </span>
              <span className="text-[8px] md:text-[10px] hidden md:block">
                Mins
              </span>
            </div>
            <div>
              <span className="text-[18px] md:text-[24px] font-semibold">
                :
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[18px] md:text-[24px] font-semibold">
                {formatNumber(timeLeft.seconds)}
              </span>
              <span className="text-[8px] md:text-[10px] hidden md:block">
                Secs
              </span>
            </div>
          </div>

          <Button
            label="Grab the Deal"
            rounded
            onClick={() => {
              if (data?.link && data.link.trim() !== "") {
                window.open(data.link, "_blank", "noopener,noreferrer");
              } else {
                router.push("/");
              }
            }}
          />

          <button
            onClick={() => setIsClosed(true)}
            className="p-1 hover:bg-white/20 rounded transition-colors absolute top-2 right-5"
            aria-label="Close promo"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-red-500 flex justify-between text-white items-center z-100 rounded-2xl text-left gap-3 py-[3%] px-[5%] md:py-[2%] md:px-[3%]">
      <div className="space-y-2 max-w-[65%]">
        <h1 className="text-[20px] md:text-[24px] font-semibold">
          {data?.promo_name}{" "}
          <span className="font-[700]">{data?.percentage}% OFF!</span>
        </h1>
        <p className="hidden md:block text-[12px] md:text-[14px] font-[200]">
          {data?.promo_description}
        </p>
      </div>
      <div className="flex flex-col items-center gap-3">
        <div className="flex gap-1 md:gap-2">
          <div className="flex flex-col items-center">
            <span className="text-[18px] md:text-[24px] font-semibold">
              {formatNumber(timeLeft.hours)}
            </span>
            <span className="text-[8px] md:text-[10px]">Hours</span>
          </div>
          <div>
            <span className="text-[18px] md:text-[24px] font-semibold">:</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[18px] md:text-[24px] font-semibold">
              {formatNumber(timeLeft.minutes)}
            </span>
            <span className="text-[8px] md:text-[10px]">Mins</span>
          </div>
          <div>
            <span className="text-[18px] md:text-[24px] font-semibold">:</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[18px] md:text-[24px] font-semibold">
              {formatNumber(timeLeft.seconds)}
            </span>
            <span className="text-[8px] md:text-[10px]">Secs</span>
          </div>
        </div>
        <Button
          label="Grab The Deal"
          rounded
          onClick={() => {
            if (data?.link && data.link.trim() !== "") {
              window.open(data.link, "_blank", "noopener,noreferrer");
            } else {
              router.push("/");
            }
          }}
        />
      </div>
    </div>
  );
}

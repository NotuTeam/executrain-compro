/** @format */

"use client";

import CountUp from "./atomic/countup";
import { StatisticCardSkeleton } from "@/components/skeleton";
import { useAssetContext } from "@/components/AssetProvider";

import { useStats } from "@/services/statistic/hook";

export default function Statistic() {
  const { data: stats, isLoading: statsLoading } = useStats();
  const { getAssetUrl } = useAssetContext();

  const statisticBackground = getAssetUrl("statistic_background");

  if (statsLoading) {
    return (
      <div
        className="w-full py-[5%] px-[5%] md:px-[7%] lg:px-[10%] text-white flex items-center justify-evenly gap-5 md:gap-0"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/dyn73qnjx/image/upload/v1768026762/Rectangle_4_yptyli.png'), url('${statisticBackground}')`,
          backgroundSize: "cover",
          backgroundPosition: "40% 40%",
        }}
      >
        {[1, 2, 3, 4].map((i) => (
          <StatisticCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!stats) {
    return (
      <div
        className="w-full py-[5%] px-[5%] md:px-[7%] lg:px-[10%] text-white flex items-center justify-center gap-5 md:gap-0"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/dyn73qnjx/image/upload/v1768026762/Rectangle_4_yptyli.png'), url('${statisticBackground}')`,
          backgroundSize: "cover",
          backgroundPosition: "40% 40%",
        }}
      >
        <div className="bg-white/10 backdrop-blur-sm flex flex-col items-center p-[8%] md:p-[5%] rounded-3xl gap-4 md:gap-5">
          <span className="font-[400] text-white text-[16px] md:text-[18px]">
            No Statistics Available
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full py-[5%] px-[5%] md:px-[7%] lg:px-[10%] text-white flex items-center justify-evenly gap-5 md:gap-0"
      style={{
        backgroundImage: `url('https://res.cloudinary.com/dyn73qnjx/image/upload/v1768026762/Rectangle_4_yptyli.png'), url('${statisticBackground}')`,
        backgroundSize: "cover",
        backgroundPosition: "40% 40%",
      }}
    >
      <div className="flex flex-col items-center justify-center">
        <span className="text-[28px] md:text-[40px] lg:text-[49px] font-[700]">
          <CountUp
            from={0}
            to={stats?.year_experience || 0}
            separator=","
            direction="up"
            duration={2}
          />
          +
        </span>
        <span className="text-[12px] md:text-[14px] lg:text-[16px]">
          Years Experience
        </span>
      </div>
      <div className="flex flex-col items-center justify-center">
        <span className="text-[28px] md:text-[40px] lg:text-[49px] font-[700]">
          <CountUp
            from={0}
            to={getShortValue(stats?.total_participant || 0) || 0}
            separator=","
            direction="up"
            duration={2}
          />
          {getShortUnit(stats?.total_participant || 0)}+
        </span>
        <span className="text-[12px] md:text-[14px] lg:text-[16px]">
          Participants
        </span>
      </div>
      <div className="flex flex-col items-center justify-center">
        <span className="text-[28px] md:text-[40px] lg:text-[49px] font-[700]">
          <CountUp
            from={0}
            to={stats?.total_topic_class || 0}
            separator=","
            direction="up"
            duration={2}
          />
          +
        </span>
        <span className="text-[12px] md:text-[14px] lg:text-[16px]">
          Topics
        </span>
      </div>
      <div className="flex flex-col items-center justify-center">
        <span className="text-[28px] md:text-[40px] lg:text-[49px] font-[700]">
          <CountUp
            from={0}
            to={getShortValue(stats?.total_training_completed || 0) || 0}
            separator=","
            direction="up"
            duration={2}
          />
          {getShortUnit(stats?.total_training_completed || 0)}+
        </span>
        <span className="text-[12px] md:text-[14px] lg:text-[16px]">
          Training Completed
        </span>
      </div>
    </div>
  );
}

function getShortValue(number: number) {
  if (number >= 1000000000) {
    return parseFloat((number / 1000000000).toFixed(1).replace(/\.0$/, ""));
  } else if (number >= 1000000) {
    return parseFloat((number / 1000000).toFixed(1).replace(/\.0$/, ""));
  } else if (number >= 1000) {
    return parseFloat((number / 1000).toFixed(1).replace(/\.0$/, ""));
  }
  return parseFloat(number.toString());
}

function getShortUnit(number: number) {
  if (number >= 1000000000) {
    return "B";
  } else if (number >= 1000000) {
    return "M";
  } else if (number >= 1000) {
    return "K";
  }
  return "";
}

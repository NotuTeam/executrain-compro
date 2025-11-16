/** @format */

"use client";

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { StatisticProps } from "@/types/statistic";

import { StatisticService } from "./handler";

export const useStats = (): UseQueryResult<StatisticProps> => {
  return useQuery({
    queryKey: ["statistic-data"],
    queryFn: async () => {
      const { data } = await StatisticService();
      return data;
    },
    refetchOnWindowFocus: false,
  });
};

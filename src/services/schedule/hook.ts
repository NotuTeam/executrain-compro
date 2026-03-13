/** @format */

"use client";

import {
  useQuery,
  UseQueryResult,
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";
import {
  ScheduleProps,
  ScheduleFilterParams,
  ScheduleListResponse,
} from "@/types/schedule";

import {
  ScheduleListService,
  ScheduleListFilteredService,
  ScheduleDetailService,
  ScheduleByProductService,
  ScheduleCategoriesService,
} from "./handler";

export const useSchedule = (): UseQueryResult<ScheduleProps[]> => {
  return useQuery({
    queryKey: ["schedule-home-list"],
    queryFn: async () => {
      const { data } = await ScheduleListService();
      return data;
    },
    refetchOnWindowFocus: false,
  });
};

export const useScheduleFiltered = (
  params?: ScheduleFilterParams
): UseInfiniteQueryResult<{
  pageParams: number[];
  pages: ScheduleListResponse[];
}> => {
  return useInfiniteQuery({
    queryKey: ["schedule-list-filtered", params],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await ScheduleListFilteredService({
        ...params,
        page: pageParam,
      });
      return response;
    },
    getNextPageParam: (lastPage) => {
      return lastPage.pagination.has_next
        ? lastPage.pagination.current_page + 1
        : undefined;
    },
    initialPageParam: 1,
    refetchOnWindowFocus: false,
  });
};

export const useScheduleDetail = (params: {
  id: string;
}): UseQueryResult<ScheduleProps> => {
  return useQuery({
    queryKey: ["schedule-detail", params],
    queryFn: async () => {
      const { data } = await ScheduleDetailService(params.id);
      return data;
    },
    enabled: !!params,
    refetchOnWindowFocus: false,
  });
};

export const useScheduleByProduct = (params?: {
  product_id: string;
  limit?: number;
}): UseQueryResult<ScheduleProps[]> => {
  return useQuery({
    queryKey: ["schedule-by-product", params],
    queryFn: async () => {
      const { data } = await ScheduleByProductService({
        product_id: params?.product_id || "",
        limit: params?.limit || 3,
      });
      return data;
    },
    enabled: !!params?.product_id,
    refetchOnWindowFocus: false,
  });
};

export const useScheduleCategories = (): UseQueryResult<string[]> => {
  return useQuery({
    queryKey: ["schedule-categories"],
    queryFn: async () => {
      const { data } = await ScheduleCategoriesService();
      return data;
    },
    refetchOnWindowFocus: false,
  });
};

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
  ScheduleCalendarParams,
} from "@/types/schedule";

import {
  ScheduleListService,
  ScheduleListFilteredService,
  ScheduleCalendarService,
  ScheduleDetailService,
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

export const useScheduleCalendar = (
  params: ScheduleCalendarParams
): UseQueryResult<ScheduleProps[]> => {
  return useQuery({
    queryKey: ["schedule-calendar", params],
    queryFn: async () => {
      const { data } = await ScheduleCalendarService(params);
      return data;
    },
    enabled: !!params.year && !!params.month,
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

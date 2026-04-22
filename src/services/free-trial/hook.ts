"use client";

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import {
  FreeTrialProductListResponse,
  FreeTrialProductListParams,
  FreeTrialProductProps,
  FreeTrialScheduleProps,
} from "@/types/free-trial";

import {
  FreeTrialProductListService,
  FreeTrialProductDetailService,
  FreeTrialScheduleByProductService,
  FreeTrialScheduleDetailService,
} from "./handler";

export const useFreeTrialFiltered = (
  params?: FreeTrialProductListParams & { page?: number; limit?: number },
): UseQueryResult<FreeTrialProductListResponse> => {
  return useQuery({
    queryKey: ["free-trial-list-filtered", params],
    queryFn: async () => {
      const response = await FreeTrialProductListService(params);
      return response;
    },
    refetchOnWindowFocus: false,
  });
};

export const useFreeTrialDetail = (params: {
  id: string;
}): UseQueryResult<FreeTrialProductProps> => {
  return useQuery({
    queryKey: ["free-trial-detail", params],
    queryFn: async () => {
      const { data } = await FreeTrialProductDetailService(params.id);
      return data;
    },
    enabled: !!params.id,
    refetchOnWindowFocus: false,
  });
};

export const useFreeTrialScheduleByProduct = (params?: {
  product_id: string;
  limit?: number;
}): UseQueryResult<FreeTrialScheduleProps[]> => {
  return useQuery({
    queryKey: ["free-trial-schedule-by-product", params],
    queryFn: async () => {
      const { data } = await FreeTrialScheduleByProductService({
        product_id: params?.product_id || "",
        limit: params?.limit || 3,
      });
      return data;
    },
    enabled: !!params?.product_id,
    refetchOnWindowFocus: false,
  });
};

export const useFreeTrialScheduleDetail = (params: {
  id: string;
}): UseQueryResult<FreeTrialScheduleProps> => {
  return useQuery({
    queryKey: ["free-trial-schedule-detail", params],
    queryFn: async () => {
      const { data } = await FreeTrialScheduleDetailService(params.id);
      return data;
    },
    enabled: !!params.id,
    refetchOnWindowFocus: false,
  });
};

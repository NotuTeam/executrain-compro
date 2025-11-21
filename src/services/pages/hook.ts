/** @format */

"use client";

import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { PageProps, PageLayoutResponse } from "@/types/page";
import { DynamicPageService } from "./handler";

export const useDynamic = (
  params: string
): UseQueryResult<PageLayoutResponse, Error> => {
  return useQuery<PageLayoutResponse, Error>({
    queryKey: ["dynamic-page-layout", params],
    queryFn: async () => {
      const response = await DynamicPageService(params);
      return response;
    },
    enabled: !!params,
    refetchOnWindowFocus: false,
  });
};

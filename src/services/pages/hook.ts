/** @format */

"use client";

import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { PageListProps, PageLayoutResponse } from "@/types/page";
import { DynamicPageService, PagesListService } from "./handler";

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

export const usePages = (): UseQueryResult<PageListProps[]> => {
  return useQuery({
    queryKey: ["page-list"],
    queryFn: async () => {
      const { data } = await PagesListService();
      return data;
    },
    refetchOnWindowFocus: false,
  });
};

/** @format */

"use client";

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import {
  ProductProps,
  ProductListResponse,
  ProductListParams,
} from "@/types/product";

import {
  ProductListService,
  ProductListFilteredService,
  ProductDetailService,
} from "./handler";

export const useProduct = (
  params?: ProductListParams
): UseQueryResult<ProductProps[]> => {
  return useQuery({
    queryKey: ["product-list", params],
    queryFn: async () => {
      const { data } = await ProductListService(params);
      return data;
    },
    refetchOnWindowFocus: false,
  });
};

export const useProductFiltered = (
  params?: ProductListParams & { page?: number; limit?: number }
): UseQueryResult<ProductListResponse> => {
  return useQuery({
    queryKey: ["product-list-filtered", params],
    queryFn: async () => {
      const response = await ProductListFilteredService(params);
      return response;
    },
    refetchOnWindowFocus: false,
  });
};

export const useProductDetail = (params: {
  id: string;
}): UseQueryResult<ProductProps> => {
  return useQuery({
    queryKey: ["product-detail", params],
    queryFn: async () => {
      const { data } = await ProductDetailService(params.id);
      return data;
    },
    enabled: !!params,
    refetchOnWindowFocus: false,
  });
};

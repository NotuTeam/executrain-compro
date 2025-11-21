/** @format */

"use client";

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { TestimoniProps } from "@/types/testimoni";

import { TestimoniListService } from "./handler";

export const useTestimonial = (): UseQueryResult<TestimoniProps[]> => {
  return useQuery({
    queryKey: ["testimoni-list"],
    queryFn: async () => {
      const { data } = await TestimoniListService();
      return data;
    },
    refetchOnWindowFocus: false,
  });
};

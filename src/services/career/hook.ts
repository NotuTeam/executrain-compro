/** @format */

import {
  useInfiniteQuery,
  UseInfiniteQueryResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import {
  CareerListService,
  CareerDetailService,
  CareerBySlugService,
  CareerGalleryService,
} from "./handler";

interface UseCareersParams {
  department?: string;
  location?: string;
  job_type?: string;
  experience_level?: string;
  search?: string;
  sort_order?: string;
  page?: number;
  limit?: number;
}

export const useCareers = (
  params: UseCareersParams = {}
): UseInfiniteQueryResult<any, Error> => {
  const { department, location, job_type, experience_level, search, sort_order = "desc", limit = 6 } = params;

  return useInfiniteQuery({
    queryKey: ["career_list", department, location, job_type, experience_level, search, sort_order, limit],
    queryFn: async ({ pageParam = 1 }) => {
      try {
        const response = await CareerListService({
          page: pageParam,
          limit,
          department,
          location,
          job_type,
          experience_level,
          search,
          sort_order,
        });
        return response;
      } catch (e) {
        return { data: [], pagination: {} };
      }
    },
    getNextPageParam: (lastPage) => {
      const pagination = lastPage?.pagination;
      if (!pagination) return undefined;
      const { current_page, total_pages } = pagination;
      return current_page < total_pages ? current_page + 1 : undefined;
    },
    initialPageParam: 1,
    refetchOnWindowFocus: false,
  });
};

export const useCareerDetail = (slug: string): UseQueryResult<any> => {
  return useQuery({
    queryKey: ["career_detail", slug],
    queryFn: async () => {
      try {
        const response = await CareerBySlugService(slug);
        return response.data;
      } catch (e) {
        return {};
      }
    },
    enabled: !!slug,
    refetchOnWindowFocus: false,
  });
};

export const useCareerGallery = (): UseQueryResult<any> => {
  return useQuery({
    queryKey: ["career_gallery"],
    queryFn: async () => {
      try {
        const response = await CareerGalleryService();
        return response.data || [];
      } catch (e) {
        return [];
      }
    },
    refetchOnWindowFocus: false,
  });
};

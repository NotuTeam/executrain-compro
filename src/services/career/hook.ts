/** @format */

import {
  useQuery,
  UseQueryResult,
  useInfiniteQuery,
  UseInfiniteQueryResult,
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
}

export const useCareers = (
  params: UseCareersParams = {}
): UseInfiniteQueryResult<any> => {
  const { department, location, job_type, experience_level, search, sort_order = "desc" } = params;

  return useInfiniteQuery({
    queryKey: ["career_list", department, location, job_type, experience_level, search, sort_order],
    queryFn: async ({ pageParam = 1 }) => {
      try {
        const response = await CareerListService({
          page: pageParam,
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
      if (lastPage?.pagination?.has_next) {
        return lastPage.pagination.current_page + 1;
      }
      return undefined;
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

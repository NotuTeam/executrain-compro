/** @format */

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import {
  CareerListService,
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
): UseQueryResult<any> => {
  const {
    department,
    location,
    job_type,
    experience_level,
    search,
    sort_order = "desc",
    page = 1,
    limit = 6,
  } = params;

  return useQuery({
    queryKey: [
      "career_list",
      department,
      location,
      job_type,
      experience_level,
      search,
      sort_order,
      page,
      limit,
    ],
    queryFn: async () => {
      try {
        const response = await CareerListService({
          page,
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

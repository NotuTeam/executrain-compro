/** @format */

import {
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import {
  ArticleListService,
  ArticleBySlugService,
  ArticleLatestService,
} from "./handler";

interface UseArticlesParams {
  category?: string;
  search?: string;
  tag?: string;
  sort_order?: string;
  page?: number;
  limit?: number;
}

export const useArticles = (
  params: UseArticlesParams = {}
): UseQueryResult<any> => {
  const { category, search, tag, sort_order = "desc", page = 1, limit = 6 } = params;

  return useQuery({
    queryKey: ["article_list", category, search, tag, sort_order, page, limit],
    queryFn: async () => {
      try {
        const response = await ArticleListService({
          page,
          limit,
          category,
          search,
          tag,
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

export const useLatestArticles = (): UseQueryResult<any[]> => {
  return useQuery({
    queryKey: ["article_latest"],
    queryFn: async () => {
      try {
        const response = await ArticleLatestService(5);
        return response.data || [];
      } catch (e) {
        return [];
      }
    },
    refetchOnWindowFocus: false,
  });
};

export const useArticleDetail = (slug: string): UseQueryResult<any> => {
  return useQuery({
    queryKey: ["article_detail", slug],
    queryFn: async () => {
      try {
        const response = await ArticleBySlugService(slug);
        return response.data;
      } catch (e) {
        return {};
      }
    },
    enabled: !!slug,
    refetchOnWindowFocus: false,
  });
};
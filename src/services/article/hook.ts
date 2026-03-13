/** @format */

import {
  useQuery,
  UseQueryResult,
  useInfiniteQuery,
  UseInfiniteQueryResult,
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
}

export const useArticles = (
  params: UseArticlesParams = {}
): UseInfiniteQueryResult<any> => {
  const { category, search, tag, sort_order = "desc" } = params;

  return useInfiniteQuery({
    queryKey: ["article_list", category, search, tag, sort_order],
    queryFn: async ({ pageParam = 1 }) => {
      try {
        const response = await ArticleListService({
          page: pageParam,
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
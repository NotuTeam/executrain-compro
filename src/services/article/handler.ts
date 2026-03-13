/** @format */

import AxiosClient from "@/lib/axios";

interface ArticleListParams {
  page?: number;
  category?: string;
  search?: string;
  tag?: string;
  sort_order?: string;
}

export async function ArticleListService(params: ArticleListParams = {}) {
  try {
    const queryParams = new URLSearchParams();

    if (params.page) {
      queryParams.append("page", params.page.toString());
    }

    if (params.category) {
      queryParams.append("category", params.category);
    }

    if (params.search) {
      queryParams.append("search", params.search);
    }

    if (params.tag) {
      queryParams.append("tag", params.tag);
    }

    if (params.sort_order) {
      queryParams.append("sort_order", params.sort_order);
    }

    const queryString = queryParams.toString();
    const url = `/article/public/list${queryString ? `?${queryString}` : ""}`;

    const { data: response } = await AxiosClient.get(url);

    return response;
  } catch (error: any) {
    console.log(error);
    throw error;
  }
}

export async function ArticleLatestService(limit: number = 5) {
  try {
    const { data: response } = await AxiosClient.get(
      `/article/public/latest?limit=${limit}`
    );

    return response;
  } catch (error: any) {
    console.log(error);
    throw error;
  }
}

export async function ArticleDetailService(id: string) {
  try {
    const { data: response } = await AxiosClient.get(`/article/public/detail/${id}`);

    return response;
  } catch (error: any) {
    console.log(error);
    throw error;
  }
}

export async function ArticleBySlugService(slug: string) {
  try {
    const { data: response } = await AxiosClient.get(`/article/public/slug/${slug}`);

    return response;
  } catch (error: any) {
    console.log(error);
    throw error;
  }
}

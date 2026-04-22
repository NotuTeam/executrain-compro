/** @format */

import AxiosClient from "@/lib/axios";

interface CareerListParams {
  page?: number;
  limit?: number;
  department?: string;
  location?: string;
  job_type?: string;
  experience_level?: string;
  search?: string;
  sort_order?: string;
}

export async function CareerListService(params: CareerListParams = {}) {
  try {
    const queryParams = new URLSearchParams();

    if (params.page) {
      queryParams.append("page", params.page.toString());
    }
    if (params.limit) {
      queryParams.append("limit", params.limit.toString());
    }
    if (params.department) {
      queryParams.append("department", params.department);
    }
    if (params.location) {
      queryParams.append("location", params.location);
    }
    if (params.job_type) {
      queryParams.append("job_type", params.job_type);
    }
    if (params.experience_level) {
      queryParams.append("experience_level", params.experience_level);
    }
    if (params.search) {
      queryParams.append("search", params.search);
    }
    if (params.sort_order) {
      queryParams.append("sort_order", params.sort_order);
    }

    const queryString = queryParams.toString();
    const url = `/career/public/list${queryString ? `?${queryString}` : ""}`;

    const { data: response } = await AxiosClient.get(url);

    return response;
  } catch (error: any) {
    console.log(error);
    throw error;
  }
}

export async function CareerDetailService(id: string) {
  try {
    const { data: response } = await AxiosClient.get(`/career/public/detail/${id}`);

    return response;
  } catch (error: any) {
    console.log(error);
    throw error;
  }
}

export async function CareerBySlugService(slug: string) {
  try {
    const { data: response } = await AxiosClient.get(`/career/public/slug/${slug}`);

    return response;
  } catch (error: any) {
    console.log(error);
    throw error;
  }
}

export async function CareerGalleryService() {
  try {
    const { data: response } = await AxiosClient.get("/career/gallery/list");

    return response;
  } catch (error: any) {
    console.log(error);
    throw error;
  }
}

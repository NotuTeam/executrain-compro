/** @format */

import AxiosClient from "@/lib/axios";
import {
  ScheduleProps,
  ScheduleFilterParams,
  ScheduleListResponse,
} from "@/types/schedule";

export async function ScheduleListService(): Promise<{
  status: number;
  message: string;
  data: ScheduleProps[];
}> {
  try {
    const { data: response } = await AxiosClient.get("/schedule/public/home");

    const { status, message, data } = response;

    if (status !== 200) throw new Error(message);

    return {
      status,
      message,
      data,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function ScheduleListFilteredService(
  filters?: ScheduleFilterParams & { page?: number }
): Promise<ScheduleListResponse> {
  try {
    const params: Record<string, string | number> = {};

    if (filters?.search) {
      params.search = filters.search;
    }

    if (filters?.schedule_category) {
      params.schedule_category = Array.isArray(filters.schedule_category)
        ? filters.schedule_category.join(",")
        : filters.schedule_category;
    }

    if (filters?.product_category) {
      params.product_category = filters.product_category;
    }

    if (filters?.page) {
      params.page = filters.page;
    }

    if (filters?.limit) {
      params.limit = filters.limit;
    }

    const { data: response } = await AxiosClient.get("/schedule/public/list", {
      params,
    });

    const { status, message, data, pagination } = response;

    if (status !== 200) throw new Error(message);

    return {
      status,
      message,
      data,
      pagination,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function ScheduleCategoriesService(): Promise<{
  status: number;
  message: string;
  data: string[];
}> {
  try {
    const { data: response } = await AxiosClient.get(
      "/schedule/public/categories"
    );

    const { status, message, data } = response;

    if (status !== 200) throw new Error(message);

    return {
      status,
      message,
      data,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function ScheduleDetailService(id?: string): Promise<{
  status: number;
  message: string;
  data: ScheduleProps;
}> {
  try {
    const { data: response } = await AxiosClient.get(
      `/schedule/public/detail/${id}`
    );

    const { status, message, data } = response;

    if (status !== 200) throw new Error(message);

    return {
      status,
      message,
      data,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function ScheduleByProductService(params: {
  product_id: string;
  limit?: number;
}): Promise<{
  status: number;
  message: string;
  data: ScheduleProps[];
}> {
  try {
    const { data: response } = await AxiosClient.get(
      `/schedule/public/product/${params.product_id}`,
      {
        params: params.limit ? { limit: params.limit } : {},
      }
    );

    const { status, message, data } = response;

    if (status !== 200) throw new Error(message);

    return {
      status,
      message,
      data,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

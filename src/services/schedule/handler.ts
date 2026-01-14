/** @format */

import AxiosClient from "@/lib/axios";
import {
  ScheduleProps,
  ScheduleFilterParams,
  ScheduleListResponse,
  ScheduleCalendarParams,
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

export async function ScheduleCalendarService(
  params: ScheduleCalendarParams
): Promise<{
  status: number;
  message: string;
  data: ScheduleProps[];
}> {
  try {
    const { data: response } = await AxiosClient.get(
      "/schedule/public/calendar",
      {
        params: {
          year: params.year,
          month: params.month,
        },
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

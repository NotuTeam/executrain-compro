/** @format */

import AxiosClient from "@/lib/axios";
import { ScheduleProps, ScheduleFilterParams } from "@/types/schedule";

import dayjs from "dayjs";

export async function ScheduleListService(): Promise<{
  status: number;
  message: string;
  data: ScheduleProps[];
}> {
  try {
    const { data: response } = await AxiosClient.get("/schedule/public/list");

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
  filters?: ScheduleFilterParams
): Promise<{
  status: number;
  message: string;
  data: ScheduleProps[];
}> {
  try {
    // Build query params
    const params: Record<string, string> = {};

    if (filters?.search) {
      params.search = filters.search;
    }

    if (filters?.date) {
      // Convert to ISO string jika date adalah Dayjs object
      params.date = dayjs(filters.date).toISOString();
    }

    const { data: response } = await AxiosClient.get("/schedule/public/list", {
      params,
    });

    console.log(response);

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

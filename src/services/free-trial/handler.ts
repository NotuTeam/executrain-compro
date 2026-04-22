/** @format */

import AxiosClient from "@/lib/axios";
import {
  FreeTrialProductListResponse,
  FreeTrialProductListParams,
  FreeTrialProductProps,
  FreeTrialScheduleProps,
} from "@/types/free-trial";

export async function FreeTrialProductListService(
  params?: FreeTrialProductListParams,
): Promise<FreeTrialProductListResponse> {
  try {
    const { data: response } = await AxiosClient.get("/free-trial/public/list", {
      params: {
        page: params?.page || 1,
        product_category: params?.product_category,
        sort_order: params?.sort_order || "desc",
        product_name: params?.product_name,
      },
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

export async function FreeTrialProductDetailService(id?: string): Promise<{
  status: number;
  message: string;
  data: FreeTrialProductProps;
}> {
  try {
    const { data: response } = await AxiosClient.get(
      `/free-trial/public/detail/${id}`,
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

export async function FreeTrialScheduleByProductService(params: {
  product_id: string;
  limit?: number;
}): Promise<{
  status: number;
  message: string;
  data: FreeTrialScheduleProps[];
}> {
  try {
    const { data: response } = await AxiosClient.get(
      `/free-trial/schedule/public/product/${params.product_id}`,
      { params: { limit: params.limit || 3 } },
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

export async function FreeTrialScheduleDetailService(id?: string): Promise<{
  status: number;
  message: string;
  data: FreeTrialScheduleProps;
}> {
  try {
    const { data: response } = await AxiosClient.get(
      `/free-trial/schedule/public/detail/${id}`,
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

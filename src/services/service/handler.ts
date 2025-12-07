/** @format */

import AxiosClient from "@/lib/axios";

export async function ServiceListService() {
  try {
    const { data: response } = await AxiosClient.get("/service/public/list");

    const { status, message, data } = response;

    if (status !== 200) throw new Error(message);

    return {
      status,
      message,
      data,
    };
  } catch (error: any) {
    console.log(error);
    throw error;
  }
}

export async function ServiceDetailService(id: string) {
  try {
    const { data: response } = await AxiosClient.get(
      `/service/public/detail/${id}`
    );

    const { status, message, data } = response;

    if (status !== 200) throw new Error(message);

    return {
      status,
      message,
      data,
    };
  } catch (error: any) {
    console.log(error);
    return error.message;
  }
}

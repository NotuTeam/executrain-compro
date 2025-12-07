/** @format */

import AxiosClient from "@/lib/axios";
import { SocmedDataProps } from "@/types/socmed";

export async function SocmedListService(): Promise<{
  status: number;
  message: string;
  data: SocmedDataProps[];
}> {
  try {
    const { data: response } = await AxiosClient.get("/socmed/public/list");

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

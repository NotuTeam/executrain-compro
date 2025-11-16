/** @format */

import AxiosClient from "@/lib/axios";
import { StatisticProps } from "@/types/statistic";

export async function StatisticService(): Promise<{
  status: number;
  message: string;
  data: StatisticProps;
}> {
  try {
    const { data: response } = await AxiosClient.get("/stat/detail");

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

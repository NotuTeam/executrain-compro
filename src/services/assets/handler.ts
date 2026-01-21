/** @format */

import AxiosClient from "@/lib/axios";
import { AssetMap } from "@/types/asset";

export async function AssetsService(): Promise<{
  status: number;
  message: string;
  data: AssetMap;
}> {
  try {
    const { data: response } = await AxiosClient.get("/assets/all");

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

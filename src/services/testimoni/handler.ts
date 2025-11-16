/** @format */

import AxiosClient from "@/lib/axios";
import { TestimoniProps } from "@/types/testimoni";

export async function TestimoniListService(): Promise<{
  status: number;
  message: string;
  data: TestimoniProps[];
}> {
  try {
    const { data: response } = await AxiosClient.get(
      "/testimonial/public/list"
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

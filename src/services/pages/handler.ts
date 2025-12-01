/** @format */

import AxiosClient from "@/lib/axios";
import { PageLayoutResponse, PageListProps } from "@/types/page";

export async function DynamicPageService(
  id: string
): Promise<PageLayoutResponse> {
  try {
    const { data: response } = await AxiosClient.get<PageLayoutResponse>(
      `/page/public/${id}`
    );

    const { status, message, data } = response;

    if (status !== 200) throw new Error(message);

    return {
      status,
      message,
      data,
    };
  } catch (error) {
    console.error("DynamicPageService Error:", error);
    return {
      status: 404,
      message: error instanceof Error ? error.message : "Page Not Found",
      data: null,
    };
  }
}

export async function PagesListService(): Promise<{
  status: number;
  message: string;
  data: PageListProps[];
}> {
  try {
    const { data: response } = await AxiosClient.get("/page/public/published");

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

/** @format */

"use client";

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { ServiceListService, ServiceDetailService } from "./handler";

export interface ServiceData {
  _id: string;
  service_name: string;
  service_description: string;
  logo?: {
    public_id: string;
    url: string;
  };
  created_at: Date;
  updated_at: Date;
}

export const useServices = (): UseQueryResult<ServiceData[]> => {
  return useQuery({
    queryKey: ["service-list"],
    queryFn: async () => {
      try {
        const { data, status } = await ServiceListService();

        if (status !== 200) throw new Error();

        return data;
      } catch (e) {
        return [];
      }
    },
    refetchOnWindowFocus: false,
  });
};

export const useServiceDetail = (id: string): UseQueryResult<ServiceData> => {
  return useQuery({
    queryKey: ["service-detail", id],
    queryFn: async () => {
      try {
        const { data, status } = await ServiceDetailService(id);

        if (status !== 200) throw new Error();

        return data;
      } catch (e) {
        return {} as ServiceData;
      }
    },
    enabled: !!id,
    refetchOnWindowFocus: false,
  });
};

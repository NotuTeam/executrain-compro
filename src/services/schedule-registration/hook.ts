"use client";

import { useMutation } from "@tanstack/react-query";

import {
  SubmitScheduleRegistrationService,
  ScheduleRegistrationPayload,
} from "./handler";

export const useSubmitScheduleRegistration = () => {
  return useMutation({
    mutationKey: ["submit_schedule_registration"],
    mutationFn: async (payload: ScheduleRegistrationPayload) => {
      const response = await SubmitScheduleRegistrationService(payload);
      return response;
    },
  });
};

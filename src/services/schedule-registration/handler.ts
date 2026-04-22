/** @format */

import AxiosClient from "@/lib/axios";

export interface ScheduleRegistrationPayload {
  full_name: string;
  company_name: string;
  email_address: string;
  phone_number: string;
  product_name: string;
  schedule_date: string;
  schedule_type: "REGULAR" | "FREE_TRIAL";
}

export async function SubmitScheduleRegistrationService(
  payload: ScheduleRegistrationPayload,
): Promise<{ status: number; message: string }> {
  try {
    const { data: response } = await AxiosClient.post(
      "/schedule-registration/public/submit",
      payload,
    );

    const { status, message } = response;

    if (status !== 201) throw new Error(message);

    return {
      status,
      message,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

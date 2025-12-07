/** @format */

import { Dayjs } from "dayjs";

export interface ScheduleProps {
  _id: string;
  schedule_name: string;
  schedule_date: string;
  schedule_close_registration_date: string;
  status:
    | "OPEN_SEAT"
    | "FULL_BOOKED"
    | "ON_GOING"
    | "CLOSE_REGISTRATION"
    | "ENDED";
  schedule_start: string;
  schedule_end: string;
  location: string;
  quota: string;
  lecturer: number;
  schedule_description: string;
  benefits: string[];
  skill_level: string;
  language: string;
  is_assestment: boolean;
  link?: string;
  banner: {
    public_id: string;
    url: string;
  };
}

export interface ScheduleFilterParams {
  search?: string;
  date?: string | Date | Dayjs;
}

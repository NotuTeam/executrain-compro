/** @format */

export interface FreeTrialProductProps {
  _id: string;
  product_name: string;
  product_category: string;
  skill_level: string;
  max_participant: number;
  product_description: string;
  benefits: string[];
  language: string;
  duration: number;
  link?: string;
  banner: {
    public_id: string;
    url: string;
  };
}

export interface FreeTrialProductListResponse {
  status: number;
  message: string;
  data: FreeTrialProductProps[];
  pagination: {
    current_page: number;
    total_pages: number;
    total_products: number;
    per_page: number;
    has_next: boolean;
    has_prev: boolean;
  };
}

export interface FreeTrialProductListParams {
  page?: number;
  product_category?: string;
  sort_order?: "asc" | "desc";
  product_name?: string;
}

export interface FreeTrialScheduleProps {
  _id: string;
  schedule_name: string;
  schedule_date: string;
  schedule_close_registration_date: string;
  status: "OPEN_SEAT" | "FULL_BOOKED";
  schedule_start: string;
  schedule_end: string;
  location: string;
  quota: string;
  duration: string;
  schedule_description: string;
  benefits: string[];
  skill_level: string;
  language: string;
  is_assestment: boolean;
  link?: string;
  product_banner: {
    public_id: string;
    url: string;
  };
  product_name?: string;
  product_category?: string;
}

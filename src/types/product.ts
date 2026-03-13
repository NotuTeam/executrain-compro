/** @format */

export interface ProductProps {
  _id: string;
  product_name: string;
  product_category: string;
  skill_level: string;
  max_participant: number;
  product_description: string;
  benefits: string[];
  instructors: number;
  instructor_list: Instructor[];
  language: string;
  duration: number;
  link?: string;
  banner: {
    public_id: string;
    url: string;
  };
  learning_path_banner?: {
    public_id: string;
    url: string;
  };
  learning_path_redirect_url?:string
}

export interface Instructor {
  name: string;
  photo: {
    public_id: string;
    url: string;
  };
}

export interface ProductListResponse {
  status: number;
  message: string;
  data: ProductProps[];
  pagination: {
    current_page: number;
    total_pages: number;
    total_products: number;
    per_page: number;
    has_next: boolean;
    has_prev: boolean;
  };
}

export interface ProductListParams {
  page?: number;
  product_category?: string;
  sort_order?: "asc" | "desc";
  product_name?: string;
}

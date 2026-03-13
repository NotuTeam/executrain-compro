/** @format */

export interface ArticleProps {
  _id: string;
  title:string;
  content:string;
  slug:string,
  excerpt:string;
  author:string;
  tags:string[];
  featured_image:{
      public_id: string;
      url: string;
    }
  status:string;
  views:number;
  meta_title:string;
  meta_description:string;
  meta_keyword:string[];
  published_at: Date;
  updated_at:Date;
  created_at:Date
}


export interface ArticleListResponse {
  status: number;
  message: string;
  data: ArticleProps[];
  pagination: {
    current_page: number;
    total_pages: number;
    total_products: number;
    per_page: number;
    has_next: boolean;
    has_prev: boolean;
  };
}

export interface ArticleListParams {
  page?: number;
  search?: string;
  sort_order?: "asc" | "desc";
}

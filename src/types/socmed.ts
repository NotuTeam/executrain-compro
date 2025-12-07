/** @format */

export interface SocmedProps {
  icon: string;
  url: string;
  label?: string;
}

export interface SocmedDataProps {
  _id: string;
  socmed_name: string;
  socmed_link: string;
  logo: {
    public_id: string;
    url: string;
  };
  created_at: string;
  updated_at: string;
}

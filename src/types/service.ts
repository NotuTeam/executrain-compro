/** @format */

export interface ServiceProps {
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

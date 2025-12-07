/** @format */

export interface PromoProps {
  _id: string;
  promo_name: string;
  promo_description: string;
  percentage: number;
  end_date: string;
  is_active: boolean;
  link?: string;
  banner: {
    public_id: string;
    url: string;
  };
}

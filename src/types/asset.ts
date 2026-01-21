/** @format */

export interface AssetProps {
  _id: string;
  category: string;
  name: string;
  url: string;
  fallback_url: string;
  type: "image" | "video";
  is_active: boolean;
  updated_at: string;
  created_at: string;
}

export interface AssetMap {
  hero_background?: { url: string; fallback_url: string; type: string };
  hero_video?: { url: string; fallback_url: string; type: string };
  about_image?: { url: string; fallback_url: string; type: string };
  statistic_background?: { url: string; fallback_url: string; type: string };
  steps_background?: { url: string; fallback_url: string; type: string };
  services_image?: { url: string; fallback_url: string; type: string };
  cta_schedule_image?: { url: string; fallback_url: string; type: string };
  contact_image?: { url: string; fallback_url: string; type: string };
}

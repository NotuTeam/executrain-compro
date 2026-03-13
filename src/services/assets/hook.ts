/** @format */

"use client";

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AssetMap } from "@/types/asset";
import { AssetsService } from "./handler";

const DEFAULT_ASSETS: AssetMap = {
  hero_background: {
    url: "https://res.cloudinary.com/dgd3iusxa/image/upload/v1764557996/hero_ygtlgs.webp",
    fallback_url: "/hero4.webp",
    type: "image",
  },
  hero_video: {
    url: "https://res.cloudinary.com/dgd3iusxa/video/upload/v1764557991/hero-vid_d2rydq.mp4",
    fallback_url: "",
    type: "video",
  },
  about_image: {
    url: "/about.png",
    fallback_url: "/about.png",
    type: "image",
  },
  statistic_background: {
    url: "/hero4.webp",
    fallback_url: "/hero4.webp",
    type: "image",
  },
  steps_background: {
    url: "/hero4.webp",
    fallback_url: "/hero4.webp",
    type: "image",
  },
  services_image: {
    url: "/hero2.webp",
    fallback_url: "/hero2.webp",
    type: "image",
  },
  cta_schedule_image: {
    url: "https://res.cloudinary.com/dgd3iusxa/image/upload/v1763043354/pup0wtnjecrh92iyk3it.webp",
    fallback_url: "/hero4.webp",
    type: "image",
  },
  contact_image: {
    url: "/contact-us.png",
    fallback_url: "/contact-us.png",
    type: "image",
  },
};

// Static assets - tidak diambil dari API
export const STATIC_ASSETS = {
  banner_plain: "https://res.cloudinary.com/dyn73qnjx/image/upload/v1771233518/Subtract_hwkrrr.png",
  banner_overlay: "https://res.cloudinary.com/dyn73qnjx/image/upload/v1771233519/Subtract_2x_jy4hvi.png",
  footer_background: "https://res.cloudinary.com/dyn73qnjx/image/upload/v1768026760/Logo_1_y8uzeh.png",
  body_pattern: "https://res.cloudinary.com/dyn73qnjx/image/upload/v1768026761/Logo_objudb.png",
};

export const useAssets = (): UseQueryResult<AssetMap> => {
  return useQuery({
    queryKey: ["assets-data"],
    queryFn: async () => {
      try {
        const { data } = await AssetsService();
        return data;
      } catch (error) {
        return DEFAULT_ASSETS;
      }
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 10, // 10 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes (formerly cacheTime)
  });
};

export const getDefaultAssets = () => DEFAULT_ASSETS;

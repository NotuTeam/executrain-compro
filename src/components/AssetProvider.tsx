/** @format */

"use client";

import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { AssetMap } from "@/types/asset";
import { useAssets, getDefaultAssets, STATIC_ASSETS } from "@/services/assets/hook";

interface AssetContextType {
  assets: AssetMap;
  isLoading: boolean;
  getAssetUrl: (category: keyof AssetMap) => string;
  getAssetWithFallback: (category: keyof AssetMap) => { url: string; fallback: string };
  getStaticAsset: (key: keyof typeof STATIC_ASSETS) => string;
}

const AssetContext = createContext<AssetContextType | undefined>(undefined);

export function AssetProvider({ children }: { children: ReactNode }) {
  const { data: assets, isLoading } = useAssets();
  const [loadedAssets, setLoadedAssets] = useState<AssetMap>(getDefaultAssets());

  useEffect(() => {
    if (assets) {
      setLoadedAssets(assets);
    }
  }, [assets]);

  const getAssetUrl = (category: keyof AssetMap): string => {
    const asset = loadedAssets[category];
    return asset?.url || getDefaultAssets()[category]?.url || "";
  };

  const getAssetWithFallback = (category: keyof AssetMap): { url: string; fallback: string } => {
    const asset = loadedAssets[category];
    const defaults = getDefaultAssets()[category];
    return {
      url: asset?.url || defaults?.url || "",
      fallback: asset?.fallback_url || defaults?.fallback_url || defaults?.url || "",
    };
  };

  const getStaticAsset = (key: keyof typeof STATIC_ASSETS): string => {
    return STATIC_ASSETS[key];
  };

  return (
    <AssetContext.Provider value={{ assets: loadedAssets, isLoading, getAssetUrl, getAssetWithFallback, getStaticAsset }}>
      {children}
    </AssetContext.Provider>
  );
}

export function useAssetContext() {
  const context = useContext(AssetContext);
  if (context === undefined) {
    throw new Error("useAssetContext must be used within an AssetProvider");
  }
  return context;
}

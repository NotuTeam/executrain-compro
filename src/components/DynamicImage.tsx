/** @format */

"use client";

import { useState, useCallback, ImgHTMLAttributes } from "react";

interface DynamicImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "onError"> {
  src: string;
  fallbackSrc?: string;
  showLoader?: boolean;
  loaderClassName?: string;
}

export default function DynamicImage({
  src,
  fallbackSrc,
  showLoader = true,
  loaderClassName = "animate-pulse bg-slate-200",
  className = "",
  alt = "",
  ...props
}: DynamicImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleError = useCallback(() => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setHasError(false);
    } else {
      setHasError(true);
      setIsLoading(false);
    }
  }, [fallbackSrc, currentSrc]);

  if (hasError && !fallbackSrc) {
    return (
      <div className={`flex items-center justify-center bg-slate-100 ${className}`} {...props}>
        <svg
          className="w-8 h-8 text-slate-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
    );
  }

  return (
    <>
      {showLoader && isLoading && (
        <div className={`${loaderClassName} ${className}`} {...props} />
      )}
      <img
        src={currentSrc}
        alt={alt}
        className={`${className} ${isLoading ? "hidden" : ""}`}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </>
  );
}

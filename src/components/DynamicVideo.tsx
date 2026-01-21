/** @format */

"use client";

import { useState, useCallback, VideoHTMLAttributes } from "react";

interface DynamicVideoProps extends Omit<VideoHTMLAttributes<HTMLVideoElement>, "src" | "onError"> {
  src: string;
  fallbackSrc?: string;
  showLoader?: boolean;
  loaderClassName?: string;
  fallbackPoster?: string;
}

export default function DynamicVideo({
  src,
  fallbackSrc,
  showLoader = true,
  loaderClassName = "animate-pulse bg-slate-200",
  fallbackPoster,
  className = "",
  ...props
}: DynamicVideoProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  const handleCanPlay = useCallback(() => {
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

  if (hasError) {
    if (fallbackPoster) {
      return (
        <div
          className={`${className}`}
          style={{ backgroundImage: `url('${fallbackPoster}')`, backgroundSize: "cover", backgroundPosition: "center" }}
          {...(props as any)}
        />
      );
    }
    return (
      <div className={`flex items-center justify-center bg-slate-100 ${className}`} {...(props as any)}>
        <svg
          className="w-12 h-12 text-slate-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      </div>
    );
  }

  return (
    <>
      {showLoader && isLoading && (
        <div className={`${loaderClassName} ${className}`} {...(props as any)} />
      )}
      <video
        src={currentSrc}
        className={`${className} ${isLoading ? "hidden" : ""}`}
        onCanPlay={handleCanPlay}
        onError={handleError}
        {...props}
      />
    </>
  );
}

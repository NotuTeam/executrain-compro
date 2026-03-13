/** @format */

"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useCareerGallery } from "@/services/career/hook";
import { CareerGalleryProps } from "@/types/career";
import ARROW_LEFT from "@/assets/icons/arrow-left.svg";
import ARROW_RIGHT from "@/assets/icons/arrow-right.svg";

export default function CareerGalleryCarousel() {
  const { data: galleryData = [], isLoading } = useCareerGallery();
  const galleries = useMemo(
    () =>
      (galleryData as CareerGalleryProps[])
        .filter((item) => item?.image?.url)
        .sort((a, b) => (a.order || 0) - (b.order || 0)),
    [galleryData],
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (galleries.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % galleries.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [galleries.length]);

  if (isLoading) {
    return (
      <section className="w-full px-[5%] md:px-[7%] lg:px-[10%] pb-[10%] md:pb-[5%]">
        <div className="w-full h-[260px] md:h-[420px] rounded-2xl bg-gray-100 animate-pulse" />
      </section>
    );
  }

  if (!galleries.length) return null;

  const activeIndex = currentIndex % galleries.length;
  const active = galleries[activeIndex];

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? galleries.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % galleries.length);
  };

  return (
    <section className="w-full px-[5%] md:px-[7%] lg:px-[10%] pb-[10%] space-y-4">
      <div className="text-center space-y-2 mb-10">
        <h2 className="text-[32px] md:text-[40px] lg:text-[49px] font-semibold">
          Life at <span className="text-primary-600">ExecuTrain</span>
        </h2>
        <p className="text-[14px] md:text-[16px]">
          Culture is best shown, not told. Take a look at these snapshots to see
          what everyday life at Executrain feels like.
        </p>
      </div>
      <section className="flex gap-5">
        {galleries.length > 1 && (
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={handlePrevious}
              className="border-primary-500 text-primary-500 border-2 w-[35px] h-[35px] md:w-[45px] md:h-[45px] flex items-center justify-center rounded-full cursor-pointer"
              aria-label="Previous slide"
            >
              <Image src={ARROW_LEFT} alt="arrow left" />
            </button>
          </div>
        )}
        <div className="w-full h-[260px] md:h-[420px] rounded-2xl overflow-hidden border border-gray-200 relative">
          <Image
            src={active.image?.url || ""}
            alt={active.title || "Career gallery"}
            fill
            className="object-cover"
          />
        </div>

        {galleries.length > 1 && (
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={handleNext}
              className="border-primary-500 text-primary-500 border-2 w-[35px] h-[35px] md:w-[45px] md:h-[45px] flex items-center justify-center rounded-full cursor-pointer"
              aria-label="Next slide"
            >
              <Image src={ARROW_RIGHT} alt="arrow right" />
            </button>
          </div>
        )}
      </section>
    </section>
  );
}

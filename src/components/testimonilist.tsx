/** @format */

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import Promo from "./promo";
import TestimoniCard from "./atomic/testimonicard";
import { TestimonialCardSkeleton } from "@/components/skeleton";

import ARROW_LEFT from "@/assets/icons/arrow-left.svg";
import ARROW_RIGHT from "@/assets/icons/arrow-right.svg";

import { usePromo } from "@/services/promo/hook";

import { useTestimonial } from "@/services/testimoni/hook";

export default function TestimoniList() {
  const { data: promo, isLoading: promoLoading } = usePromo();
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data: testimonial = [], isLoading: testimonialLoading } =
    useTestimonial();

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonial.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonial.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="text-black w-full px-[5%] md:px-[7%] lg:px-[10%]">
      <div className="p-[5%] bg-white rounded-t-4xl">
        <h2 className="font-semibold text-[28px] md:text-[40px] lg:text-[49px] mb-6 md:mb-10">
          What They Say About Us
        </h2>
        <div className="flex items-center justify-center pt-3 md:pt-5 pb-5 md:pb-8 relative mx-auto w-fit max-w-[90%] md:max-w-[60%]">
          {testimonialLoading ? (
            <TestimonialCardSkeleton />
          ) : (
            <TestimoniCard data={testimonial[currentIndex]} />
          )}
          <div className="flex items-center justify-center gap-3 absolute bottom-0 right-0">
            <button
              onClick={handlePrevious}
              className="border-[#00AEEF] text-[#00AEEF] border-2 text-[18px] md:text-[24px] w-[35px] h-[35px] md:w-[45px] md:h-[45px] flex items-center justify-center rounded-full cursor-pointer"
              aria-label="Previous testimonial"
            >
              <Image src={ARROW_LEFT} alt="arrow left" />
            </button>
            <button
              onClick={handleNext}
              className="border-[#00AEEF] text-[#00AEEF] border-2 text-[18px] md:text-[24px] w-[35px] h-[35px] md:w-[45px] md:h-[45px] flex items-center justify-center rounded-full cursor-pointer"
              aria-label="Next testimonial"
            >
              <Image src={ARROW_RIGHT} alt="arrow right" />
            </button>
          </div>
        </div>
      </div>
      {promo && <Promo size="lg" data={promo} />}
    </div>
  );
}

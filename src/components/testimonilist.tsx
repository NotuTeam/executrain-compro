/** @format */

"use client";

import { useState } from "react";
import Image from "next/image";

import Promo from "./promo";
import TestimoniCard from "./atomic/testimonicard";
import { TestimonialCardSkeleton } from "@/components/skeleton";

import ARROW_LEFT from "@/assets/icons/arrow-left.svg";
import ARROW_RIGHT from "@/assets/icons/arrow-right.svg";

import { usePromo } from "@/services/promo/hook";

import { useTestimonial } from "@/services/testimoni/hook";

export default function TestimoniList() {
  const { data: promo } = usePromo();
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data: testimonial = [], isLoading: testimonialLoading } =
    useTestimonial();

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonial.length - 1 : prevIndex - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonial.length - 1 ? 0 : prevIndex + 1,
    );
  };

  // Get 3 testimonials for display (current + next 2)
  const getVisibleTestimonials = () => {
    if (testimonial.length === 0) return [];
    const result = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % testimonial.length;
      result.push(testimonial[index]);
    }
    return result;
  };

  const visibleTestimonials = getVisibleTestimonials();

  return (
    <div className="text-black w-full bg-white rounded-t-4xl py-16 px-[5%] md:px-[7%] lg:px-[10%]">
      {/* Center-aligned Heading */}
      <h2 className="font-bold text-[28px] md:text-[40px] lg:text-[49px] text-center text-[#111] mb-12">
        What They Say About Us
      </h2>

      {testimonialLoading ? (
        <div className="flex items-center justify-center">
          <TestimonialCardSkeleton />
        </div>
      ) : testimonial.length === 0 ? (
        <div className="flex flex-col items-center p-8 gap-4">
          <span className="font-[400] text-slate-500 text-[16px] md:text-[18px]">
            No Testimonial Found
          </span>
        </div>
      ) : (
        <>
          {/* 3 Column Grid with Red Dividers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {visibleTestimonials.map((item, idx) => (
              <div key={`${item._id}-${idx}`} className="flex">
                <div className="flex-1 px-4 md:px-6">
                  <TestimoniCard data={item} />
                </div>
                {/* Red Vertical Divider (not on last item) */}
                {idx < 2 && (
                  <div className="hidden md:block w-[1px] bg-[#BE0F34] self-stretch" />
                )}
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center gap-2 mt-10">
            <button
              onClick={handlePrevious}
              className="border border-primary-600 text-[#111] w-[40px] h-[40px] flex items-center justify-center rounded-full cursor-pointer bg-transparent hover:border-[#BE0F34] transition-colors"
              aria-label="Previous testimonial"
            >
              <Image src={ARROW_LEFT} alt="arrow left" className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="border border-primary-600 text-white w-[40px] h-[40px] flex items-center justify-center rounded-full cursor-pointer hover:bg-[#a01835] transition-colors"
              aria-label="Next testimonial"
            >
              <Image src={ARROW_RIGHT} alt="arrow right" className="w-4 h-4" />
            </button>
          </div>
        </>
      )}

      {promo && <Promo size="lg" data={promo} />}
    </div>
  );
}

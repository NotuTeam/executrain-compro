/** @format */

"use client";

import { useState, useCallback, useRef } from "react";
import Image from "next/image";

import Promo from "./promo";
import TestimoniCard from "./atomic/testimonicard";
import { TestimonialCardSkeleton } from "@/components/skeleton";

import ARROW_LEFT from "@/assets/icons/arrow-left.svg";
import ARROW_RIGHT from "@/assets/icons/arrow-right.svg";

import { usePromo } from "@/services/promo/hook";

import { useTestimonial } from "@/services/testimoni/hook";

type Direction = "left" | "right";

type Phase = "idle" | "slide-out" | "slide-in";

export default function TestimoniList() {
  const { data: promo } = usePromo();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const [direction, setDirection] = useState<Direction>("left");
  const pendingRef = useRef<Direction | null>(null);
  const { data: testimonial = [], isLoading: testimonialLoading } =
    useTestimonial();

  const handlePrevious = useCallback(() => {
    if (phase !== "idle") return;
    pendingRef.current = "right";
    setDirection("right");
    setPhase("slide-out");
  }, [phase]);

  const handleNext = useCallback(() => {
    if (phase !== "idle") return;
    pendingRef.current = "left";
    setDirection("left");
    setPhase("slide-out");
  }, [phase]);

  const handleTransitionEnd = useCallback(() => {
    if (phase === "slide-out") {
      // Slide-out selesai: update data, lalu slide-in dari arah berlawanan
      setCurrentIndex((prevIndex) => {
        const dir = pendingRef.current ?? direction;
        if (dir === "left") {
          return prevIndex === testimonial.length - 1 ? 0 : prevIndex + 1;
        } else {
          return prevIndex === 0 ? testimonial.length - 1 : prevIndex - 1;
        }
      });
      setDirection(pendingRef.current === "left" ? "right" : "left");
      setPhase("slide-in");
    } else if (phase === "slide-in") {
      setPhase("idle");
    }
  }, [phase, direction, testimonial.length]);

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

  const getSlideClass = () => {
    if (phase === "idle") return "translate-x-0 opacity-100";
    // slide-out: geser ke arah yang dituju lalu hilang
    if (phase === "slide-out") {
      if (direction === "left") return "-translate-x-[60px] opacity-0";
      return "translate-x-[60px] opacity-0";
    }
    // slide-in: muncul dari arah berlawanan lalu geser ke tengah
    if (phase === "slide-in") {
      if (direction === "left") return "-translate-x-[60px] opacity-0";
      return "translate-x-[60px] opacity-0";
    }
    return "translate-x-0 opacity-100";
  };

  return (
    <section className="mb-10">
      <div className="text-black w-full bg-white rounded-t-4xl py-16 px-[5%] md:px-[7%] lg:px-[10%]">
        {/* Center-aligned Heading */}
        <h2 className="font-semibold text-[28px] md:text-[40px] lg:text-[49px] text-center text-[#111] mb-12 leading-8">
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
            {/* Slider container with overflow hidden */}
            <div className="overflow-hidden">
              <div
                onTransitionEnd={handleTransitionEnd}
                className={`grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-0 transition-all duration-300 ease-in-out ${getSlideClass()}`}
              >
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
                <Image
                  src={ARROW_RIGHT}
                  alt="arrow right"
                  className="w-4 h-4"
                />
              </button>
            </div>
          </>
        )}
      </div>
      <div className="border w-full">
        {promo && <Promo size="lg" data={promo} />}
      </div>
    </section>
  );
}

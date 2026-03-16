"use client";

import Image from "next/image";

import Container from "@/components/atomic/container";
import HeroLearningPath from "@/components/hero/herolearningpath";
import Button from "@/components/atomic/button";

export default function LearningPathPage() {
  return (
    <Container>
      <HeroLearningPath />
      <section className="px-[5%] md:px-[7%] lg:px-[10%] py-[10%] w-full">
        <Image
          alt="learning-path"
          src="https://res.cloudinary.com/dyn73qnjx/image/upload/v1773634138/d33aa2e5ec061c5fdd1051298d6e28e9005014fe_g67f9q.png"
          width={1000}
          height={1000}
          className="w-full h-auto"
        />
        <div className="flex flex-col items-center justify-center text-center pt-[8%] space-y-5 px-[5%] md:px-[7%] lg:px-[10%] w-full border-white border-b-5 box-border">
          <h2 className="font-semibold text-[32px] md:text-[40px] lg:text-[49px] mb-6 md:mb-10">
            Explore More with Microsoft
          </h2>

          <Button
            onClick={() => {
              window.open(
                "https://learn.microsoft.com/en-us/training/azure/",
                "_blank",
                "noopener,noreferrer",
              );
            }}
            label={"Explore More →"}
            rounded
            type="primary"
          />
        </div>
      </section>
    </Container>
  );
}

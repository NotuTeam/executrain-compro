/** @format */

import Button from "../atomic/button";

import { ArrowRightFromLine } from "lucide-react";

export default function Hero() {
  return (
    <div
      className="min-w-[99dvw] min-h-[105dvh] text-white flex items-center justify-start px-[5%] md:px-[7%] lg:px-[10%]"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('./hero.webp')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col gap-3 md:gap-5 items-start max-w-full md:max-w-[80%] lg:max-w-[50%]">
        <h1 className="text-[32px] md:text-[45px] lg:text-[61px] font-semibold">
          Headline
        </h1>
        <p className="text-sm md:text-base">
          Lorem ipsum dolor sit amet consectetur. Volutpat faucibus facilisis
          sed at pellentesque orci lectus. Ac nisl placerat sed rhoncus libero
          pretium sit non eu. Tempor platea congue suscipit iaculis tellus nibh
          sapien feugiat. Sagittis et nec amet laoreet morbi pretium.
        </p>
        <Button
          label="Start Consultation"
          rounded
          icon={<ArrowRightFromLine size={18} />}
        />
      </div>
    </div>
  );
}

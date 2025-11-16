/** @format */

import Image from "next/image";

import { TestimoniProps } from "@/types/testimoni";

interface CompProps {
  data: TestimoniProps;
}

export default function TestimoniCard({ data }: CompProps) {
  return (
    <div className="bg-white max-w-[90%] md:max-w-[60%] flex flex-col md:flex-row items-center shadow-[0px_0px_50px_5px_rgba(0,0,0,0.11)] rounded-xl p-5 gap-3">
      <Image
        src={data?.photo?.url || ""}
        alt="testimoni pict"
        height={150}
        width={150}
        className="rounded-lg aspect-square"
      />
      <div className="space-y-3 p-5">
        <p className="text-justify">{data?.testimonial}</p>
        <span className="w-full block text-left text-[12px] italic">
          <strong>{data?.person_name}</strong> - {data?.person_title}
        </span>
      </div>
    </div>
  );
}

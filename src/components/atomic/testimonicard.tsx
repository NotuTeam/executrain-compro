/** @format */

import Image from "next/image";

import { TestimoniProps } from "@/types/testimoni";

interface CompProps {
  data: TestimoniProps;
}

export default function TestimoniCard({ data }: CompProps) {
  return (
    <div className="bg-white  flex flex-col items-start md:flex-row p-5">
      <div
        className="w-[500px] aspect-square flex items-end  rounded-t-xl rounded-br-xl"
        style={{
          backgroundImage: `url(${data?.photo?.url || ""})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex-col px-2 py-1 rounded-tr-full text-left text-[12px] bg-[#ffffff80] flex w-[80%]">
          <span className="font-[400]">
            <strong>{data?.person_name}</strong>
          </span>
          <span>{data?.person_title}</span>
        </div>
      </div>

      <div className="space-y-3 p-3 bg-[#00AEEF]/30 backdrop-blur-md border border-[#00AEEF]/20 rounded-t-xl rounded-br-xl ml-[-5%] text-[14px] mt-[5%]">
        <p className="text-justify">{data?.testimonial}</p>
      </div>
    </div>
  );
}

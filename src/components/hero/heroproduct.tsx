/** @format */

"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function HeroProduct({ children }: { children: ReactNode }) {
  return (
    <div
      className="min-w-[99dvw] min-h-[90dvh] text-white flex items-center justify-start px-[5%] md:px-[7%] lg:px-[10%]"
      style={{
        backgroundImage: `url('https://res.cloudinary.com/dgd3iusxa/image/upload/v1764559418/bannerplain_dojpcb.png'), url('https://res.cloudinary.com/dgd3iusxa/image/upload/v1764557996/hero_ygtlgs.webp')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col gap-5 md:gap-8 items-start max-w-full pt-[10%]">
        <div className="font-[500] flex gap-3">
          <Link href="/">Home</Link>
          <ChevronRight />
          <Link href="/product">Our Products</Link>
        </div>
        <h1 className="text-[32px] md:text-[45px] lg:text-[61px] font-semibold">
          Product
        </h1>
        <p className="text-sm md:text-base">
          ExceLEARN adalah penyedia layanan pelatihan bisnis dan IT terkemuka di
          bawah naungan PT. Bina Kinerja Nusantara. Kami berkomitmen untuk
          menghasilkan profesional TI berkualitas tinggi. Sejak tahun 2017, kami
          berkomitmen membantu berbagai perusahaan meningkatkan keterampilan
          teknis dan produktivitas karyawannya.
        </p>
        {children}
      </div>
    </div>
  );
}

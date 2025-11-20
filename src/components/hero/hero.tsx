/** @format */

import Button from "../atomic/button";

import { ArrowRightFromLine } from "lucide-react";

export default function Hero() {
  return (
    <div
      className="min-w-[99dvw] min-h-[105dvh] text-white flex items-center justify-start px-[5%] md:px-[7%] lg:px-[10%]"
      style={{
        backgroundImage: `url('./banner.png'), url('./hero.webp')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col gap-3 md:gap-5 items-start max-w-full md:max-w-[80%] lg:max-w-[50%]">
        <h1 className="text-[32px] md:text-[45px] lg:text-[61px] font-semibold">
          ExceLEARN
        </h1>
        <p className="text-sm md:text-base">
          ExceLEARN adalah penyedia layanan pelatihan bisnis dan IT terkemuka di
          bawah naungan PT. Bina Kinerja Nusantara. Kami berkomitmen untuk
          menghasilkan profesional TI berkualitas tinggi. Sejak tahun 2017, kami
          berkomitmen membantu berbagai perusahaan meningkatkan keterampilan
          teknis dan produktivitas karyawannya.
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

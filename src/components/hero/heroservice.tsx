/** @format */

import CountUp from "../atomic/countup";

export default function HeroService() {
  return (
    <div
      className="min-w-[99dvw] min-h-[105dvh] text-white flex items-center justify-start px-[5%] md:px-[7%] lg:px-[10%]"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('./hero.webp')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col gap-5 md:gap-8 items-start max-w-full">
        <h1 className="text-[32px] md:text-[45px] lg:text-[61px] font-semibold">
          Our Service
        </h1>
        <p className="text-sm md:text-base">
          ExceLEARN adalah penyedia layanan pelatihan bisnis dan IT terkemuka di
          bawah naungan PT. Bina Kinerja Nusantara. Kami berkomitmen untuk
          menghasilkan profesional TI berkualitas tinggi. Sejak tahun 2017, kami
          berkomitmen membantu berbagai perusahaan meningkatkan keterampilan
          teknis dan produktivitas karyawannya.
        </p>
        <div className="w-full text-white flex items-center justify-around gap-5 md:gap-0">
          <div className="flex flex-col items-center justify-center">
            <span className="text-[32px] md:text-[40px] lg:text-[49px] font-[700]">
              <CountUp
                from={0}
                to={10}
                separator=","
                direction="up"
                duration={2}
              />
              +
            </span>
            <span className="text-[12px] md:text-[14px] lg:text-[16px]">
              Years Experience
            </span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span className="text-[32px] md:text-[40px] lg:text-[49px] font-[700]">
              <CountUp
                from={0}
                to={50}
                separator=","
                direction="up"
                duration={2}
              />
              K+
            </span>
            <span className="text-[12px] md:text-[14px] lg:text-[16px]">
              Participants
            </span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span className="text-[32px] md:text-[40px] lg:text-[49px] font-[700]">
              <CountUp
                from={0}
                to={500}
                separator=","
                direction="up"
                duration={2}
              />
              +
            </span>
            <span className="text-[12px] md:text-[14px] lg:text-[16px]">
              Topics
            </span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span className="text-[32px] md:text-[40px] lg:text-[49px] font-[700]">
              <CountUp
                from={0}
                to={4}
                separator=","
                direction="up"
                duration={2}
              />
              K+
            </span>
            <span className="text-[12px] md:text-[14px] lg:text-[16px]">
              Training Completed
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

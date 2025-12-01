/** @format */

export default function Visi() {
  return (
    <div
      className="w-full text-center py-[5%] px-[5%] md:px-[7%] lg:px-[10%] space-y-6 md:space-y-10"
      style={{
        backgroundImage: `url('./body.png'), url('./body.png')`,
        backgroundSize: "30%",
        backgroundPosition: "-20% 150%, 125% 50%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h2 className="font-semibold text-[32px] md:text-[40px] lg:text-[49px]">
        Our Vision and Mission
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
        <div className="flex items-stretch justify-center md:justify-end">
          <div className="relative w-full md:max-w-[50%] p-[5px] rounded-2xl bg-linear-to-r from-[#001e28] to-cyan-300">
            <div className="bg-white rounded-xl p-4 md:p-5 flex items-center justify-center flex-col gap-3 md:gap-5 h-full">
              <h3 className="font-semibold text-[20px] md:text-[24px]">Visi</h3>
              <p className="text-[15px]">
                Menjadi pusat unggulan dalam pengembangan sumber daya manusia,
                teknologi, dan solusi bisnis yang berkualitas
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-stretch justify-center md:justify-start">
          <div className="relative w-full md:max-w-[50%] p-[5px] rounded-2xl bg-linear-to-r from-[#001e28] to-cyan-300">
            <div className="bg-white rounded-xl p-4 md:p-5 flex items-center justify-center flex-col gap-3 md:gap-5 h-full">
              <h3 className="font-semibold text-[20px] md:text-[24px]">Misi</h3>
              <p className="text-[15px]">
                Penyedia jasa pelatihan bisnis dan informasi teknologi serta
                layanan IT Managed Services untuk meningkatkan produktivitas
                kerja dan fokus bisnis pelanggan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

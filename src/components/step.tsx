/** @format */

export default function Step() {
  return (
    <div className="w-full px-[5%] md:px-[7%] lg:px-[10%] pt-[5%]">
      <div
        className="text-white rounded-4xl"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('./hero.webp')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="px-[4%] py-[2.5%]">
          <h2 className="text-[28px] md:text-[40px] lg:text-[49px] font-semibold">
            Join in 4 Easy Steps
          </h2>
          <p className="text-sm md:text-base">
            We’ve simplified the process so you can focus on what matters:
            learning.
          </p>
        </div>
        <div className="bg-white text-black border-x border-b border-[#00AEEF] rounded-b-4xl flex flex-col md:flex-row justify-between py-[5%] gap-5 md:gap-0">
          {[1, 2, 3, 4].map((each: number, index: number) => (
            <div
              className={`flex md:flex-col items-start gap-5 px-[5%] ${
                index > 0 ? "md:border-l border-t md:border-t-0" : ""
              } border-[#00AEEF] pt-5 md:pt-0`}
              key={each}
            >
              <span className="min-w-fit text-[28px] md:text-[35px] font-semibold text-[#00AEEF] border rounded-full w-[40px] h-[40px] md:w-[50px] md:h-[50px] flex items-center justify-center">
                {each}
              </span>
              <div className="space-y-3">
                <h4 className="text-[18px] md:text-[24px]">
                  Join in 5 Easy Steps
                </h4>
                <p className="text-sm md:text-base">
                  We’ve simplified the process so you can focus on what matters:
                  learning.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

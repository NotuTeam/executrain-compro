import Image from "next/image";

import { useAssetContext } from "./AssetProvider";

export default function FrameworkBanner() {
  const { getAssetUrl } = useAssetContext();

  const frameworkBanner = getAssetUrl("framework_banner");
  return (
    <>
      <div className="px-[5%] md:px-[7%] lg:px-[10%] py-[15%] md:py-[7%] text-center w-full space-y-6 md:space-y-6 min-h-[30dvh] md:min-h-[50dvh]">
        <h2 className="font-semibold text-[32px] md:text-[40px] lg:text-[49px] leading-10 md:leading-15">
          Perfomance Improvement Framework
        </h2>
        <section className="px-[5%] md:px-[7%] lg:px-[10%] pt-[3%] w-full">
          <Image
            alt="framework"
            src={frameworkBanner || ""}
            width={1000}
            height={1000}
            className="w-full h-auto"
          />
        </section>
      </div>
    </>
  );
}

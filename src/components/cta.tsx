/** @format */

import { useRouter } from "next/navigation";
import Button from "./atomic/button";

export default function CTA() {
  const router = useRouter();
  return (
    <div className="w-full px-[5%] md:px-[7%] lg:px-[10%] text-center py-[10%] md:py-0 md:pb-[5%] space-y-5 md:space-y-8 flex flex-col items-center">
      <h2 className="text-[32px] md:text-[40px] lg:text-[49px] font-semibold">
        Ready to Train Your Team?
      </h2>
      <p className="text-[14px] md:text-[16px]">
        Get the full proposal and training details by clicking the button below.
      </p>
      <Button
        onClick={() => router.push("https://wa.me/62895805254925")}
        label="Request Proposal"
        rounded
        type="primary"
      />
    </div>
  );
}

/** @format */

import { useRouter } from "next/navigation";
import Button from "./atomic/button";

import { SocmedDataProps } from "@/types/socmed";
import { useSocmed } from "@/services/socmed/hook";

export default function CTA() {
  const router = useRouter();

  const { data: socmedData = [], isLoading: socmedLoading } = useSocmed();

  const contactList = socmedData.find(
    (item: SocmedDataProps) =>
      item.socmed_link && ["WHATSAPP"].includes(item.socmed_name),
  )?.socmed_link;
  return (
    <div className="w-full px-[5%] md:px-[7%] lg:px-[10%] text-center py-[10%] md:py-0 md:pb-[5%] space-y-5 md:space-y-8 flex flex-col items-center">
      <h2 className="text-[32px] md:text-[40px] lg:text-[49px] font-semibold leading-15">
        Ready to Elevate Your Team’s Performance?
      </h2>
      <p className="text-[14px] md:text-[16px]">
        Get the full proposal and training details by clicking the button below.
      </p>
      <Button
        onClick={() => router.push(`https://wa.me/${contactList}`)}
        label="Request Proposal"
        rounded
        type="primary"
      />
    </div>
  );
}

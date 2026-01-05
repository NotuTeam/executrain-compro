/** @format */

import { useRouter } from "next/navigation";

import Button from "./atomic/button";

import { ArrowRightFromLine } from "lucide-react";

import { SocmedDataProps } from "@/types/socmed";
import { useSocmed } from "@/services/socmed/hook";

export default function Step() {
  const router = useRouter();
  const { data: socmedData = [], isLoading: socmedLoading } = useSocmed();

  const contactList = socmedData.find(
    (item: SocmedDataProps) =>
      item.socmed_link && ["WHATSAPP"].includes(item.socmed_name)
  )?.socmed_link;
  return (
    <div className="w-full px-[5%] md:px-[7%] lg:px-[10%] pt-[5%]">
      <div
        className="text-white rounded-4xl"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/dgd3iusxa/image/upload/v1764559418/bannerplain_dojpcb.png'), url('./hero4.webp')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="px-[4%] py-[2.5%] flex justify-between items-center">
          <div>
            <h2 className="text-[28px] md:text-[40px] lg:text-[49px] font-semibold">
              Join in 4 Easy Steps
            </h2>
            <p className="text-sm md:text-base">
              We’ve simplified the process so you can focus on what matters:
              learning.
            </p>
          </div>
          {socmedLoading ? (
            <Button label="Loading..." rounded type="disable" />
          ) : (
            <Button
              onClick={() => router.push(`https://wa.me/${contactList}`)}
              label="Join Now"
              rounded
              icon={<ArrowRightFromLine size={18} />}
              type="primary"
            />
          )}
        </div>
        <div className="bg-white text-black border-x border-b border-[#00AEEF] rounded-b-4xl flex flex-col md:flex-row justify-between py-[5%] gap-5 md:gap-0">
          {[
            {
              title: "Contact Sales",
              description:
                "Reach out to our sales team to get detailed information and initial consultation.",
            },
            {
              title: "Share Your Needs",
              description:
                "Explain your goals and requirements so we can tailor the training to you.",
            },
            {
              title: "Set Your Schedule",
              description:
                "Work with us to arrange a training schedule that suits your availability.",
            },
            {
              title: "Ready to Train",
              description:
                "Your program is prepared, and you are ready to begin your training journey.",
            },
          ].map(
            (each: { title: string; description: string }, index: number) => (
              <div
                className={`flex md:flex-col items-start gap-5 px-[5%] ${
                  index > 0 ? "md:border-l border-t md:border-t-0" : ""
                } border-[#00AEEF] pt-5 md:pt-0`}
                key={index + 1}
              >
                <span className="min-w-fit text-[28px] md:text-[35px] font-semibold text-[#00AEEF] border rounded-full w-[40px] h-[40px] md:w-[50px] md:h-[50px] flex items-center justify-center">
                  {index + 1}
                </span>
                <div className="space-y-3">
                  <h4 className="text-[18px] md:text-[24px]">{each.title}</h4>
                  <p className="text-sm md:text-base">{each.description}</p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

/** @format */

"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import Button from "./button";
import { useServices } from "@/services/service/hook";
import { useSocmed } from "@/services/socmed/hook";
import { serviceToSlug } from "@/lib/utils";
import { useAssetContext } from "@/components/AssetProvider";

import { ArrowRightFromLine } from "lucide-react";

import { SocmedProps, SocmedDataProps } from "@/types/socmed";

import INSTAGRAM_ICON from "@/assets/icons/instagram.svg";
import FACEBOOK_ICON from "@/assets/icons/facebook.svg";
import DISCORD_ICON from "@/assets/icons/discord.svg";
import TIKTOK_ICON from "@/assets/icons/tiktok.svg";
import YOUTUBE_ICON from "@/assets/icons/youtube.svg";
import LINKEDIN_ICON from "@/assets/icons/linkedin.svg";
import TWITTER_ICON from "@/assets/icons/twitter.svg";
import WHATSAPP_ICON from "@/assets/icons/whatsapp.svg";
import GMAIL_ICON from "@/assets/icons/gmail.svg";

const contactIcons: Record<string, SocmedProps> = {
  GMAIL: {
    icon: GMAIL_ICON,
    label: "",
    url: "",
  },
  WHATSAPP: {
    icon: WHATSAPP_ICON,
    label: "",
    url: "",
  },
};

const socmedIcons: Record<string, any> = {
  INSTAGRAM: INSTAGRAM_ICON,
  FACEBOOK: FACEBOOK_ICON,
  DISCORD: DISCORD_ICON,
  TKTOK: TIKTOK_ICON,
  YOUTUBE: YOUTUBE_ICON,
  LINKEDIN: LINKEDIN_ICON,
  X: TWITTER_ICON,
};

export default function Footer() {
  const router = useRouter();
  const { data: services = [] } = useServices();
  const { data: socmedData = [], isLoading: socmedLoading } = useSocmed();
  const { getStaticAsset } = useAssetContext();

  const footerBackground = getStaticAsset("footer_background");

  const socmedList = socmedData
    .filter(
      (item: SocmedDataProps) =>
        item.socmed_link &&
        !["GMAIL", "WHATSAPP", "GMAPS", "SALES_EMAIL"].includes(
          item.socmed_name,
        ),
    )
    .map((item: SocmedDataProps) => {
      const iconKey = item.socmed_name;

      return {
        icon: socmedIcons[iconKey] || INSTAGRAM_ICON,
        url: item.socmed_link,
        name: item.socmed_name,
      };
    });

  const contactList = socmedData
    .filter(
      (item: SocmedDataProps) =>
        item.socmed_link && ["GMAIL", "WHATSAPP"].includes(item.socmed_name),
    )
    .map((item: SocmedDataProps) => {
      const iconKey = item.socmed_name;
      if (iconKey === "WHATSAPP")
        return {
          icon: contactIcons[iconKey]?.icon || INSTAGRAM_ICON,
          url: `https://wa.me/${item.socmed_link}`,
          name: `+${item.socmed_link}`,
        };
      if (iconKey === "GMAIL")
        return {
          icon: contactIcons[iconKey]?.icon || INSTAGRAM_ICON,
          url: `mailto:${item.socmed_link}`,
          name: `+${item.socmed_link}`,
        };
      return {
        icon: contactIcons[iconKey]?.icon || GMAIL_ICON,
        url: item.socmed_link,
        name: item.socmed_link,
      };
    });
  return (
    <footer
      className="bg-[#181818] min-w-[98dvw] max-w-[99dvw] text-white grid grid-cols-1 md:grid-cols-2 px-[7%] lg:px-[10%] py-[5%] gap-10"
      style={{
        backgroundImage: `url('${footerBackground}')`,
        backgroundSize: "contain",
        backgroundPosition: "left",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex flex-col gap-5 items-center md:items-start">
        <h2 className="font-semibold text-[32px] md:text-[40px] lg:text-[49px]">
          Need Help Deciding?
        </h2>
        <p className="text-[20px] text-center md:text-left">
          Chat with us and make decisions with confidence.
        </p>
        <Button
          onClick={() => router.push("/contact")}
          label="Start Consultation"
          rounded
          icon={<ArrowRightFromLine size={18} />}
        />
        <div className="flex gap-8 md:gap-3 md:gap-5 mt-3 md:mt-5">
          {contactList.map((each: SocmedProps, index: number) => (
            <Link key={index} href={each.url}>
              <Image src={each.icon} alt={`socmed ${index}`} />
            </Link>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-5 md:gap-8 items-center md:items-start w-full">
        <h5 className="font-[700] text-[20px] md:text-[25px] mt-5 md:mt-0">
          Follow Us
        </h5>
        {socmedLoading ? (
          <div className="flex items-center justify-between flex-wrap mb-5 md:mb-0 w-[90%]">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-10 h-10 bg-white/20 rounded-full animate-pulse"
              ></div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-start gap-7 flex-wrap mb-5 md:mb-0 w-[90%]">
            {socmedList.length > 0 ? (
              socmedList.map((each: any, index: number) => (
                <Link
                  key={index}
                  href={each.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image src={each.icon} alt={each.name || `socmed ${index}`} />
                </Link>
              ))
            ) : (
              <span className="text-white/70">No social media available</span>
            )}
          </div>
        )}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-2 md:space-y-3 text-sm md:text-base">
            <h5 className="font-[700] text-[20px] md:text-[25px]">
              Executrain
            </h5>
            <span className="block">PT. Bina Kinerja Nusantara</span>
            <span className="block">
              Equity Tower, 26th Floor, Unit H<br />
              Jl. Jenderal Sudirman Kav. 52 Senayan,
              <br />
              South Jakarta 12190
              <br /> Indonesia
            </span>
            <div className="flex flex-col">
              <span className="font-[500]">Email :</span>
              <Link
                href={`mailto:${
                  socmedData?.find((each: any) => each.socmed_name === "GMAIL")
                    ?.socmed_link || "sales@excelearn.co.id"
                }`}
              >
                {socmedData?.find((each: any) => each.socmed_name === "GMAIL")
                  ?.socmed_link || "sales@excelearn.co.id"}
              </Link>
            </div>
            <div className="flex flex-col">
              <span className="font-[500]">Website :</span>
              <Link href="https://excelearn.co.id">Executrain.co.id</Link>
            </div>
          </div>
          <div className="space-y-2 md:space-y-3 text-sm md:text-base">
            <h5 className="font-[700] text-[20px] md:text-[25px]">Services</h5>
            <div className="flex flex-col gap-3 md:gap-3">
              {services.length > 0 ? (
                services.map((service: any) => (
                  <span key={service._id}>
                    <Link
                      href={`/service?type=${serviceToSlug(
                        service.service_name,
                      )}`}
                    >
                      {service.service_name}
                    </Link>
                  </span>
                ))
              ) : (
                <span className="text-white/70">Loading...</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

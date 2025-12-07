/** @format */

"use client";

import Image from "next/image";
import Link from "next/link";

import { useRouter } from "next/navigation";

import { SocmedProps, SocmedDataProps } from "@/types/socmed";
import { useSocmed } from "@/services/socmed/hook";

import ContactBG from "@/assets/testimoni.jpg";
import INSTAGRAM_ICON from "@/assets/icons/instagram-blue.svg";
import FACEBOOK_ICON from "@/assets/icons/facebook-blue.svg";
import DISCORD_ICON from "@/assets/icons/discord-blue.svg";
import TIKTOK_ICON from "@/assets/icons/tiktok-blue.svg";
import YOUTUBE_ICON from "@/assets/icons/youtube-blue.svg";
import LINKEDIN_ICON from "@/assets/icons/linkedin-blue.svg";
import TWITTER_ICON from "@/assets/icons/twitter-blue.svg";
import WHATSAPP_ICON from "@/assets/icons/whatsapp-white.svg";
import GMAIL_ICON from "@/assets/icons/gmail-white.svg";
import LOCATION_ICON from "@/assets/icons/location-white.svg";

const contact = [
  {
    icon: GMAIL_ICON,
    label: "Excelearn@gmail.com",
    url: "mailto:excelearn@gmail.com",
  },
  {
    icon: WHATSAPP_ICON,
    label: "+62984201810",
    url: "https://wa.me/62895805254925",
  },
  {
    icon: LOCATION_ICON,
    label: "Equity Tower 26th Floor",
    url: "https://share.google/hUqLqgMNGxAXSDIDw",
  },
];

const socmedIcons: Record<string, any> = {
  instagram: INSTAGRAM_ICON,
  facebook: FACEBOOK_ICON,
  discord: DISCORD_ICON,
  tiktok: TIKTOK_ICON,
  youtube: YOUTUBE_ICON,
  linkedin: LINKEDIN_ICON,
  twitter: TWITTER_ICON,
};

export default function ContactList() {
  const router = useRouter();
  const { data: socmedData = [], isLoading } = useSocmed();

  const socmedList = socmedData
    .filter((item: SocmedDataProps) => item.socmed_link)
    .map((item: SocmedDataProps) => {
      const iconKey = item.socmed_name.toLowerCase();
      return {
        icon: socmedIcons[iconKey] || INSTAGRAM_ICON,
        url: item.socmed_link,
        name: item.socmed_name,
      };
    });

  return (
    <div
      className="w-full px-[5%] md:px-[7%] lg:px-[10%] py-[5%] space-y-6 md:space-y-10"
      style={{
        backgroundImage: `url('./body.png'), url('./body.png')`,
        backgroundSize: "30%",
        backgroundPosition: "-20% 80%, 120% 40%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-0">
        <div>
          <h3 className="text-[32px] text-center md:text-left  md:text-[40px] lg:text-[49px] font-semibold">
            Lets Talk!
          </h3>
          <p className="max-w-full text-center md:text-left lg:max-w-[70%] text-sm md:text-base">
            Get In Touch with us using the enquiry form of contact details below
          </p>
          <div className="flex flex-col items-start gap-3 mt-5 md:mt-8">
            {contact.map((each: SocmedProps, index: number) => (
              <button
                type="button"
                onClick={() => router.push(each.url)}
                className="bg-linear-to-r from-[#141A2E] to-[#76dbff] text-white p-4 md:p-5 rounded-full w-full md:min-w-[45%] md:w-[50%] flex items-center gap-3 text-sm md:text-base"
                key={index}
              >
                <Image src={each.icon} alt={`socmed ${index}`} />
                {each.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center md:justify-end">
          <div
            className="h-[350px] w-[350px] rounded-3xl"
            style={{
              backgroundImage: `url('./contact-us.png')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        </div>
      </div>
      <div className="text-center space-y-4 md:space-y-5 py-[5%]">
        <h3 className="font-semibold text-[32px] md:text-[40px] lg:text-[49px]">
          Follow Us
        </h3>
        {isLoading ? (
          <div className="flex items-center justify-center gap-4 md:gap-8 flex-wrap">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-12 h-12 bg-slate-200 rounded-full animate-pulse"
              ></div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center gap-4 md:gap-8 flex-wrap">
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
              <p className="text-slate-500">No social media available</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

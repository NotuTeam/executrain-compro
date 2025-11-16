/** @format */

import Image from "next/image";
import Link from "next/link";

import { SocmedProps } from "@/types/socmed";

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
    url: "/",
  },
  {
    icon: WHATSAPP_ICON,
    label: "+62984201810",
    url: "/",
  },
  {
    icon: LOCATION_ICON,
    label: "Equity Tower 26th Floor",
    url: "/",
  },
];

const socmed = [
  {
    icon: INSTAGRAM_ICON,
    url: "/",
  },
  {
    icon: FACEBOOK_ICON,
    url: "/",
  },
  {
    icon: DISCORD_ICON,
    url: "/",
  },
  {
    icon: TIKTOK_ICON,
    url: "/",
  },
  {
    icon: YOUTUBE_ICON,
    url: "/",
  },
  {
    icon: LINKEDIN_ICON,
    url: "/",
  },
  {
    icon: TWITTER_ICON,
    url: "/",
  },
];

export default function ContactList() {
  return (
    <div className="w-full px-[5%] md:px-[7%] lg:px-[10%] py-[5%] space-y-6 md:space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-0">
        <div>
          <h3 className="text-[32px] md:text-[40px] lg:text-[49px] font-semibold">
            Lets Talk!
          </h3>
          <p className="max-w-full md:max-w-[70%] lg:max-w-[50%] text-sm md:text-base">
            Get In Touch with us using the enquiry form of contact details below
          </p>
          <div className="flex flex-col items-start gap-3 mt-5 md:mt-8">
            {contact.map((each: SocmedProps, index: number) => (
              <div
                className="bg-gradient-to-r from-[#141A2E] to-[#76dbff] text-white p-4 md:p-5 rounded-full w-full md:min-w-[45%] md:w-auto flex items-center gap-3 text-sm md:text-base"
                key={index}
              >
                <Image src={each.icon} alt={`socmed ${index}`} />
                {each.label}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center md:justify-end">
          <Image
            src={ContactBG}
            alt="contact bg"
            height={250}
            width={250}
            className="rounded-lg md:h-[300px] md:w-[300px] lg:h-[350px] lg:w-[350px]"
          />
        </div>
      </div>
      <div className="text-center space-y-4 md:space-y-5 py-[5%]">
        <h3 className="font-semibold text-[32px] md:text-[40px] lg:text-[49px]">
          Follow Us
        </h3>
        <div className="flex items-center justify-center gap-4 md:gap-8 flex-wrap">
          {socmed?.map((each: SocmedProps, index: number) => (
            <Link key={index} href={each.url}>
              <Image src={each.icon} alt={`socmed ${index}`} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

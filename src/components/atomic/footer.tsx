/** @format */

import Link from "next/link";
import Image from "next/image";

import Button from "./button";

import { ArrowRightFromLine } from "lucide-react";

import { SocmedProps } from "@/types/socmed";

import INSTAGRAM_ICON from "@/assets/icons/instagram.svg";
import FACEBOOK_ICON from "@/assets/icons/facebook.svg";
import DISCORD_ICON from "@/assets/icons/discord.svg";
import TIKTOK_ICON from "@/assets/icons/tiktok.svg";
import YOUTUBE_ICON from "@/assets/icons/youtube.svg";
import LINKEDIN_ICON from "@/assets/icons/linkedin.svg";
import TWITTER_ICON from "@/assets/icons/twitter.svg";
import WHATSAPP_ICON from "@/assets/icons/whatsapp.svg";
import GMAIL_ICON from "@/assets/icons/gmail.svg";

const contact = [
  {
    icon: WHATSAPP_ICON,
    url: "/",
  },
  {
    icon: GMAIL_ICON,
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

export default function Footer() {
  return (
    <footer className="bg-[#00AEEF] min-w-[99dvw] text-white grid grid-cols-1 md:grid-cols-2 px-[7%] lg:px-[10%] py-[5%] gap-8 md:gap-0">
      <div className="flex flex-col gap-5 items-center md:items-start">
        <h2 className="font-semibold text-[32px] md:text-[40px] lg:text-[49px]">
          Need Help Deciding?
        </h2>
        <p className="text-[20px] text-center md:text-left">
          Chat with us and make decisions with confidence.
        </p>
        <Button
          label="Start Consultation"
          rounded
          icon={<ArrowRightFromLine size={18} />}
        />
        <div className="flex gap-8 md:gap-3 md:gap-5 mt-3 md:mt-5">
          {contact.map((each: SocmedProps, index: number) => (
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
        <div className="flex gap-4 md:gap-8 items-center justify-between flex-wrap w-full mb-5 md:mb-0">
          {socmed?.map((each: SocmedProps, index: number) => (
            <Link key={index} href={each.url}>
              <Image src={each.icon} alt={`socmed ${index}`} />
            </Link>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-0">
          <div className="md:col-span-2 space-y-2 md:space-y-3 text-sm md:text-base">
            <h5 className="font-[700] text-[20px] md:text-[25px]">Excelearn</h5>
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
              <span>excelearn@gmail.com</span>
            </div>
            <div className="flex flex-col">
              <span className="font-[500]">Website :</span>
              <span>Excelearn.ac.id</span>
            </div>
          </div>
          <div className="space-y-2 md:space-y-3 text-sm md:text-base">
            <h5 className="font-[700] text-[20px] md:text-[25px]">Services</h5>
            <div className="flex flex-col gap-2 md:gap-3">
              {["IT Training", "IT Consultant", "IT Support"].map(
                (each: string) => (
                  <span key={each}>
                    <Link href="/service">{each}</Link>
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

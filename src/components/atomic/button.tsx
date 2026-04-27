/** @format */

"use client";

import { ReactNode } from "react";

const bgColor = {
  primary: "bg-primary-500",
  default: "bg-white",
  disable: "bg-slate-300",
};

const textColor = {
  primary: "text-white",
  default: "text-black",
  disable: "text-slate-500",
};

export default function Button({
  label,
  rounded = false,
  type = "default",
  icon,
  size = "md",
  onClick = () => {},
}: {
  label: string;
  rounded?: boolean;
  type?: "primary" | "default" | "disable";
  icon?: ReactNode;
  size?: "sm" | "md";
  onClick?: () => void;
}) {
  return (
    <button
      onClick={() => onClick()}
      className={`${textColor[type]} ${
        bgColor[type]
      } px-3 md:px-5 py-2 font-semibold text-[12px] md:text-base ${
        rounded ? "rounded-full" : "rounded-md"
      } flex items-center gap-2 ${
        type === "disable" ? "cursor-not-allowed" : "cursor-pointer"
      } ${size === "sm" && "text-xs"}`}
      type="button"
      disabled={type === "disable"}
    >
      {label}
      {icon && icon}
    </button>
  );
}

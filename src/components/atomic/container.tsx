/** @format */

import { ReactNode } from "react";

export default function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <main
      className={`flex flex-col min-w-[98dvw] max-w-[100dvw] min-h-[100dvh] items-center mt-[-7%] overflow-x-hidden ${className || ""}`}
    >
      {children}
    </main>
  );
}

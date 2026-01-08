/** @format */
"use client";

import Container from "@/components/atomic/container";
import { useParams, useRouter } from "next/navigation";
import Button from "@/components/atomic/button";
import { useDynamic } from "@/services/pages/hook";
import HeroDynamic from "@/components/hero/herodynamic";
import { DynamicPageRenderer } from "./parser";
import { Loader2 } from "lucide-react";

export default function Dynamic() {
  const params = useParams();
  const router = useRouter();
  const { dynamic } = params;

  const { data: response, isLoading, isError } = useDynamic(dynamic as string);

  // Loading state
  if (isLoading) {
    return (
      <Container>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      </Container>
    );
  }

  // 404 - Page not found or error
  if (!response?.data || isError) {
    return (
      <Container>
        <div
          className="min-h-[110dvh] w-full text-white flex items-center justify-center flex-col"
          style={{
            backgroundImage: `url('https://res.cloudinary.com/dgd3iusxa/image/upload/v1764559418/bannerplain_dojpcb.png'), url('https://res.cloudinary.com/dgd3iusxa/image/upload/v1764557996/hero_ygtlgs.webp')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h1 className="text-[60px] font-[600]">404</h1>
          <p className="text-[24px] font-[500] mb-5">
            {response?.message || "Page not Found"}
          </p>
          <Button
            label="Back to Home"
            rounded
            type="primary"
            onClick={() => router.push("/")}
          />
        </div>
      </Container>
    );
  }

  // Extract page data
  const pageData = response.data;

  // Render dynamic page
  return (
    <Container>
      <HeroDynamic name={pageData.name} />

      <div
        className="py-8 md:py-12 w-full"
        style={{
          backgroundImage: `url('./body.png'), url('./body.png')`,
          backgroundSize: "30%",
          backgroundPosition: "-20% 80%, 120% 40%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <DynamicPageRenderer data={pageData} className="mb-8" />
        </div>
      </div>
    </Container>
  );
}

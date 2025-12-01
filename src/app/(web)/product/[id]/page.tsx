/** @format */

"use client";

import { useParams } from "next/navigation";

import Container from "@/components/atomic/container";
import HeroProductDetail from "@/components/hero/heroproductdetail";
import ProductList from "@/components/productlist";

import { useProduct, useProductDetail } from "@/services/product/hook";

export default function ProductDetail() {
  const params = useParams();
  const { id } = params;

  const { data, isLoading } = useProductDetail({ id: id as string });
  const { data: product = [], isLoading: productLoading } = useProduct({
    product_category: data?.product_category,
  });

  return (
    <Container>
      <HeroProductDetail data={data} />
      <div className="px-[10%] py-[5%] space-y-5 w-full">
        <h3 className="text-[49px] font-semibold">Product Overview</h3>
        <p>{data?.product_description}</p>
      </div>
      <div
        className="w-full"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://res.cloudinary.com/dgd3iusxa/image/upload/v1764557996/hero_ygtlgs.webp')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="py-[5%] px-[5%] md:px-[15%] space-y-10">
          <h4 className="text-[49px] text-center text-white font-semibold">
            {"What You'll Learn"}
          </h4>
          <div className="flex items-center justify-center flex-wrap gap-5">
            {data?.benefits?.map((each: string, index: number) => (
              <div
                className="w-[100%] md:w-[23%] bg-white/50 backdrop-blur-md border border-white/20 shadow-xl p-5 rounded-3xl text-[24px] flex flex-col items-center gap-5"
                key={index}
              >
                <span>{each}</span>
                <div className="w-[50%] border" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <ProductList data={product} title="Related Product" />
    </Container>
  );
}

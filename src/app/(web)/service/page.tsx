/** @format */
"use client";

import { useSearchParams } from "next/navigation";
import Container from "@/components/atomic/container";
import CTA from "@/components/cta";
import HeroService from "@/components/hero/heroservice";
import ProductList from "@/components/productlist";
import ServiceDetail from "@/components/servicedetail";
import Step from "@/components/step";

import { useProduct } from "@/services/product/hook";

export default function Service() {
  const searchParams = useSearchParams();
  const serviceType = searchParams.get("type");

  const { data: product = [], isLoading: productLoading } = useProduct({
    product_category:
      serviceType?.replace("-", "_")?.toUpperCase() || undefined,
  });

  return (
    <Container>
      <HeroService />
      <ServiceDetail initialService={serviceType} />
      <Step />
      <ProductList data={product} />
      <CTA />
    </Container>
  );
}

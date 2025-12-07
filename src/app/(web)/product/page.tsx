/** @format */
"use client";

import { useState } from "react";

import Container from "@/components/atomic/container";
import HeroProduct from "@/components/hero/heroproduct";
import ProductList from "@/components/productlist";
import SearchBar from "@/components/atomic/productsearchbar";

import { useProductFiltered } from "@/services/product/hook";
import { useDebounce } from "@/lib/useDebounce";

export default function Product() {
  const [searchName, setSearchName] = useState<string>("");
  const [category, setCategory] = useState<string | undefined>();
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const debouncedSearchName = useDebounce(searchName, 500);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useProductFiltered({
      product_category: category,
      sort_order: sortOrder,
      product_name: debouncedSearchName || undefined,
    });

  const allProducts = data?.pages.flatMap((page) => page.data) || [];

  return (
    <Container>
      <HeroProduct>
        <SearchBar
          searchValue={searchName}
          categoryValue={category}
          sortValue={sortOrder}
          onSearchChange={setSearchName}
          onCategoryChange={setCategory}
          onSortChange={setSortOrder}
        />
      </HeroProduct>
      <ProductList
        size="lg"
        data={allProducts}
        fetchNext={fetchNextPage}
        hasNext={hasNextPage}
        isFetching={isFetchingNextPage}
        isLoading={isLoading}
      />
    </Container>
  );
}

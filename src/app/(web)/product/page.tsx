/** @format */
"use client";

import { useState, useMemo, useEffect } from "react";

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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const debouncedSearchName = useDebounce(searchName, 500);

  const { data, isLoading } = useProductFiltered({
    product_category: category,
    sort_order: sortOrder,
    product_name: debouncedSearchName || undefined,
    page: currentPage,
    limit: itemsPerPage,
  });

  const products = useMemo(() => data?.data || [], [data]);
  const pagination = useMemo(
    () =>
      data?.pagination || {
        current_page: 1,
        total_pages: 1,
        total_products: 0,
        per_page: 6,
        has_next: false,
        has_prev: false,
      },
    [data],
  );
  const totalPages = pagination.total_pages;

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchName, category, sortOrder]);

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
        data={products}
        isLoading={isLoading}
        currentPage={currentPage}
        totalPages={totalPages}
        totalProducts={pagination.total_products || products.length}
        onPageChange={setCurrentPage}
      />
    </Container>
  );
}

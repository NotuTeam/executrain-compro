/** @format */
"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import Container from "@/components/atomic/container";
import HeroFreeTrial from "@/components/hero/herofreetrial";
import FreeTrialList from "@/components/freetriallist";
import FreeTrialSearchBar from "@/components/atomic/freetrialsearchbar";

import { useFreeTrialFiltered } from "@/services/free-trial/hook";
import { useDebounce } from "@/lib/useDebounce";

export default function FreeTrialPage() {
  const searchParams = useSearchParams();
  const [searchName, setSearchName] = useState<string>("");
  const [category, setCategory] = useState<string | undefined>(
    searchParams.get("category") || undefined,
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const debouncedSearchName = useDebounce(searchName, 500);

  const { data, isLoading } = useFreeTrialFiltered({
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
      <HeroFreeTrial>
        <FreeTrialSearchBar
          searchValue={searchName}
          categoryValue={category}
          sortValue={sortOrder}
          onSearchChange={setSearchName}
          onCategoryChange={setCategory}
          onSortChange={setSortOrder}
        />
      </HeroFreeTrial>
      <FreeTrialList
        size="lg"
        data={products}
        isLoading={isLoading}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </Container>
  );
}

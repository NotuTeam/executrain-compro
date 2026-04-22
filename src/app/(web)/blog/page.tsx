/** @format */

"use client";

import { useState } from "react";

import Container from "@/components/atomic/container";
import HeroArticle from "@/components/hero/heroarticle";
import SearchBar from "@/components/atomic/articlesearchbar";
import ArticleList from "@/components/articlelist";

import { useArticles, useLatestArticles } from "@/services/article/hook";
import { useDebounce } from "@/lib/useDebounce";

export default function ArticlePage() {
  const [searchName, setSearchName] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const debouncedSearchName = useDebounce(searchName, 500);

  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useArticles({
    search: debouncedSearchName || undefined,
    sort_order: sortOrder,
    page: currentPage,
  });
  const { data: latestArticles = [] } = useLatestArticles();

  const articles = data?.data || [];
  const pagination = data?.pagination;

  return (
    <Container>
      <HeroArticle>
        <SearchBar
          searchValue={searchName}
          sortValue={sortOrder}
          onSearchChange={setSearchName}
          onSortChange={setSortOrder}
        />
      </HeroArticle>
      <ArticleList
        data={articles}
        recentPosts={latestArticles}
        pagination={pagination}
        onPageChange={setCurrentPage}
        currentPage={currentPage}
        isLoading={isLoading}
      />
    </Container>
  );
}

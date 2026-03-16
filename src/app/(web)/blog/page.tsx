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

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useArticles({
      search: debouncedSearchName || undefined,
      sort_order: sortOrder,
    });
  const { data: latestArticles = [] } = useLatestArticles();

  const articles =
    data?.pages?.flatMap((page: { data?: unknown[] }) => page.data || []) || [];

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
        fetchNext={fetchNextPage}
        hasNext={hasNextPage}
        isFetching={isFetchingNextPage}
        isLoading={isLoading}
      />
    </Container>
  );
}

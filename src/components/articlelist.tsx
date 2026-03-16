/** @format */

"use client";

import { useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import Button from "./atomic/button";
import { Skeleton } from "@/components/skeleton";

import { ArrowRightFromLine, Clock, User } from "lucide-react";
import { ArticleProps } from "@/types/article";

import { formatDate, cleanExcerpt } from "@/lib/utils";

interface CompProps {
  data?: ArticleProps[];
  recentPosts?: ArticleProps[];
  fetchNext?: () => void;
  hasNext?: boolean;
  isFetching?: boolean;
  isLoading?: boolean;
}

export default function ArticleList({
  data = [],
  recentPosts = [],
  fetchNext,
  hasNext,
  isFetching,
  isLoading = false,
}: Readonly<CompProps>) {
  const router = useRouter();

  const handleArticleClick = (slug?: string) => {
    if (!slug) return;
    router.push(`/blog/${slug}`);
  };

  const latestPosts = useMemo(() => {
    if (recentPosts.length > 0) return recentPosts;

    return [...data]
      .sort((a, b) => {
        const dateA = new Date(a?.published_at || a?.created_at || 0).getTime();
        const dateB = new Date(b?.published_at || b?.created_at || 0).getTime();
        return dateB - dateA;
      })
      .slice(0, 5);
  }, [data, recentPosts]);

  if (isLoading) {
    return [1, 2, 3].map((index) => (
      <div key={index} className="flex gap-4 pb-6 border-b border-red-500">
        <div className="flex-1 space-y-3">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-6 w-5/6" />
          <Skeleton className="h-6 w-4/6" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="w-[120px] h-[120px]" />
      </div>
    ));
  }

  return (
    <div className="w-full py-[5%] px-[5%] md:px-[7%] lg:px-[10%] bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10">
        <div className="lg:col-span-3 space-y-6">
          <p className="text-gray-700 font-medium">{data.length} Posts</p>

          {data.length === 0 ? (
            <div className="bg-slate-50 flex flex-col items-center p-[8%] md:p-[5%] rounded-3xl gap-4 md:gap-5">
              <span className="font-[400] text-slate-500 text-[16px] md:text-[18px]">
                No Blog Found
              </span>
            </div>
          ) : (
            data.map((blog) => (
              <button
                key={blog._id}
                type="button"
                onClick={() => handleArticleClick(blog.slug)}
                className="group w-full text-left flex flex-col sm:flex-row gap-4 pb-6 border-b border-red-500 cursor-pointer hover:bg-red-50/40 transition-colors duration-200 px-2"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                    <Clock className="w-4 h-4" />
                    <span>
                      {formatDate(blog?.published_at || blog?.created_at)}
                    </span>
                  </div>

                  <h3 className="font-bold text-xl text-gray-900 line-clamp-2 mb-2 group-hover:text-primary-600 transition-colors duration-200">
                    {blog?.title || "-"}
                  </h3>

                  <p className="text-gray-600 line-clamp-2 mb-4">
                    {cleanExcerpt(blog?.excerpt || blog?.content)}
                  </p>

                  <div className="flex items-center gap-2 text-gray-700 text-sm">
                    <span className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center">
                      <User className="w-4 h-4" />
                    </span>
                    <span>{blog?.author || "Admin"}</span>
                  </div>
                </div>

                <div className="w-[120px] h-[120px] rounded-lg overflow-hidden bg-gray-100 shrink-0 self-start sm:self-auto">
                  {blog?.featured_image?.url ? (
                    <Image
                      src={blog.featured_image.url}
                      alt={blog?.title || "blog-thumbnail"}
                      className="w-full h-full object-cover"
                      width={120}
                      height={120}
                    />
                  ) : null}
                </div>
              </button>
            ))
          )}

          {!isLoading && data.length > 0 && hasNext && (
            <div className="flex justify-center mt-6">
              <Button
                label={isFetching ? "Loading..." : "Load More"}
                rounded
                type={isFetching ? "disable" : "primary"}
                icon={<ArrowRightFromLine size={18} />}
                onClick={() => fetchNext && fetchNext()}
              />
            </div>
          )}
        </div>

        <aside className="lg:col-span-2">
          <div className="bg-[#f5f5f0] rounded-2xl p-6 space-y-5">
            <h4 className="font-bold text-xl text-gray-900">Recent Posts</h4>

            {latestPosts.length === 0 ? (
              <p className="text-gray-600 text-sm">No recent posts</p>
            ) : (
              latestPosts.map((blog) => (
                <button
                  key={`recent-${blog._id}`}
                  type="button"
                  onClick={() => handleArticleClick(blog.slug)}
                  className="w-full text-left cursor-pointer rounded-lg px-2 py-2 hover:bg-red-50/40 transition-colors duration-200 group"
                >
                  <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
                    <Clock className="w-4 h-4" />
                    <span>
                      {formatDate(blog?.published_at || blog?.created_at)}
                    </span>
                  </div>
                  <p className="font-bold text-gray-900 line-clamp-2 group-hover:text-primary-600 transition-colors duration-200">
                    {blog?.title}
                  </p>
                </button>
              ))
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

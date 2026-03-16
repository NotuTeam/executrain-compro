/** @format */

"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import Container from "@/components/atomic/container";
import HeroArticleDetail from "@/components/hero/heroarticledetail";

import { Clock, User } from "lucide-react";

import { useArticleDetail, useLatestArticles } from "@/services/article/hook";
import { formatDate, cleanExcerpt } from "@/lib/utils";

export default function ArticleDetailPage({
  params,
}: Readonly<{
  params: { slug: string };
}>) {
  const router = useRouter();

  const { data: blog, isLoading } = useArticleDetail(params.slug);
  const { data: latestArticles = [] } = useLatestArticles();

  const handleArticleClick = (slug?: string) => {
    if (!slug) return;
    router.push(`/blog/${slug}`);
  };

  if (isLoading) {
    return (
      <Container>
        <div className="min-h-[400px] flex items-center justify-center">
          <div className="inline-block w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </Container>
    );
  }

  if (!blog) {
    return (
      <Container>
        <div className="min-h-[400px] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Blog Not Found
            </h1>
            <p className="text-gray-600 mb-4">
              {"The blog you're looking for doesn't exist."}
            </p>
            <Link href="/blog" className="text-primary-600 hover:underline">
              Back to Articles
            </Link>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <HeroArticleDetail data={blog} />
      <div className="px-[10%] pt-[15%] space-y-5 w-full">
        <div className="max-w-4xl mx-auto">
          {blog.excerpt && (
            <div className="bg-primary-50 border-l-4 border-primary-600 p-6 mb-8 rounded-r-lg">
              <p className="text-gray-700 italic text-lg">{blog.excerpt}</p>
            </div>
          )}

          <div
            className="prose prose-lg max-w-none space-y-5 text-justify flex flex-col items-center"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
      </div>

      {/* SEO Meta */}
      {blog.meta_title && (
        <div className="bg-gray-50 py-8 none">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {blog.meta_title}
            </h2>
            {blog.meta_description && (
              <p className="text-gray-600">{blog.meta_description}</p>
            )}
          </div>
        </div>
      )}
      <div className="px-[10%] py-[10%] space-y-5 w-full">
        <h2>Recent Posts</h2>
        <div className="pt-5">
          {latestArticles.map((blog) => (
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
          ))}
        </div>
      </div>
    </Container>
  );
}

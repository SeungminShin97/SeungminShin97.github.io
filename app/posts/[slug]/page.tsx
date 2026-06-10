import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalendarClock, Clock3, Tags } from "lucide-react";
import { BlogShell } from "@/components/blog-shell";
// 서버 댓글 기능을 붙일 때 다시 사용합니다.
// import { CommentsPreview } from "@/components/comments-preview";
import { RightRail } from "@/components/right-rail";
import { formatFullDate } from "@/lib/format";
import { getAllPosts, getPostBySlug } from "@/lib/markdown";

type Props = {
  params: {
    slug: string;
  };
};

// Next static export가 만들 글 상세 경로 목록입니다.
export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

// 각 글의 SEO 메타데이터도 Markdown front matter에서 가져옵니다.
export function generateMetadata({ params }: Props): Metadata {
  const post = getAllPosts().find((item) => item.slug === params.slug);

  if (!post) {
    return {};
  }

  return {
    title: post.metadata.title,
    description: post.metadata.description
  };
}

// 글 상세 페이지는 Markdown 본문 HTML을 정적으로 렌더링합니다.
export default function PostPage({ params }: Props) {
  const exists = getAllPosts().some((post) => post.slug === params.slug);

  if (!exists) {
    notFound();
  }

  const post = getPostBySlug(params.slug);
  const { metadata } = post;
  const allPosts = getAllPosts();
  const tags = Array.from(new Set(allPosts.flatMap((item) => item.metadata.tags))).sort();

  return (
    <BlogShell rightRail={<RightRail posts={allPosts} tags={tags} activePost={post} />}>
      <article className="article-detail" data-category={metadata.category}>
        {metadata.image ? (
          <div className="article-image article-detail-image">
            <img src={metadata.image} alt={`${metadata.title} 대표 이미지`} />
          </div>
        ) : null}

        <header className="article-hero">
          <div className="category-pill">{metadata.category}</div>
          <h1>{metadata.title}</h1>
          <p>{metadata.description}</p>
          <footer className="article-meta article-detail-meta">
            <div className="inline-meta">
              <CalendarClock size={20} />
              <time dateTime={metadata.date}>{formatFullDate(metadata.date)}</time>
              <Clock3 size={18} />
              <time>{post.readingMinutes}분 읽기</time>
            </div>
            <div className="inline-meta tag-inline detail-tags">
              <Tags size={18} />
              {metadata.tags.map((tag) => (
                <a key={tag} href={`/tags/${encodeURIComponent(tag)}/`}>
                  {tag}
                </a>
              ))}
            </div>
          </footer>
        </header>

        <div className="article-content" dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>

      {/* 서버 댓글 기능을 붙일 때 다시 노출합니다.
      <CommentsPreview slug={post.slug} />
      */}
    </BlogShell>
  );
}

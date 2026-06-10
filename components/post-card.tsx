import Link from "next/link";
import { CalendarClock, Clock3 } from "lucide-react";
import { formatFullDate } from "@/lib/format";
import type { Post } from "@/lib/markdown";

// 홈과 태그 페이지에서 쓰는 글 미리보기 카드입니다.
export function PostCard({ post }: { post: Post }) {
  const { metadata } = post;

  return (
    <article className={`post-card ${metadata.image ? "has-image" : ""}`} data-category={metadata.category}>
      <header className="article-header">
        {metadata.image ? (
          <div className="article-image">
            <Link href={`/posts/${post.slug}/`}>
              <img src={metadata.image} alt={`${metadata.title} 대표 이미지`} loading="lazy" />
            </Link>
          </div>
        ) : null}

        <div className="article-details">
          <header className="article-category">
            <Link href={`/tags/${encodeURIComponent(metadata.category)}/`}>{metadata.category}</Link>
          </header>
          <div className="article-title-wrapper">
            <h2 className="article-title">
              <Link href={`/posts/${post.slug}/`}>{metadata.title}</Link>
            </h2>
            <h3 className="article-subtitle">{metadata.description}</h3>
          </div>
          <footer className="article-meta">
            <div className="inline-meta">
              <CalendarClock size={20} />
              <time dateTime={metadata.date}>{formatFullDate(metadata.date)}</time>
              <Clock3 size={18} />
              <time>{post.readingMinutes}분 읽기</time>
            </div>
            <div className="inline-meta tag-inline">
              {metadata.tags.map((tag) => (
                <Link key={tag} href={`/tags/${encodeURIComponent(tag)}/`}>
                  #{tag}
                </Link>
              ))}
            </div>
          </footer>
        </div>
      </header>
    </article>
  );
}

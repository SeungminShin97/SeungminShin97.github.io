import Link from "next/link";
import { Hash, Infinity, Search, Tag } from "lucide-react";
import type { ReactNode } from "react";
import { TagLinks } from "@/components/tag-links";
import { getCategoryCounts, getYearCounts } from "@/lib/archive";
import type { Post } from "@/lib/markdown";
import { archiveYearPath } from "@/lib/routes";

type RightRailProps = {
  posts: Post[];
  tags: string[];
  activePost?: Post;
};

// 오른쪽 사이드바는 빌드 시점에 계산된 글 목록 기반 위젯을 보여줍니다.
export function RightRail({ posts, tags, activePost }: RightRailProps) {
  const years = getYearCounts(posts);
  const categories = getCategoryCounts(posts);

  return (
    <div className="widget-stack">
      <form action="/search/" className="search-form widget">
        <p>
          <label htmlFor="keyword">검색</label>
          <input id="keyword" name="keyword" required placeholder="검색어 입력..." />
          <button title="검색" aria-label="검색">
            <Search size={20} />
          </button>
        </p>
      </form>

      {activePost ? (
        <section className="widget plain-widget active-post-widget">
          <WidgetHeading icon={<Tag size={22} />} title="현재 글" />
          <div className="widget-box">
            <p>{activePost.metadata.title}</p>
          </div>
        </section>
      ) : null}

      <section className="widget plain-widget archives">
        <WidgetHeading icon={<Infinity size={22} />} title="아카이브" href="/archives/" />
        <div className="widget-box widget-archive-list">
          {years.map(({ name, count }) => (
            <Link href={archiveYearPath(name)} key={name}>
              <span className="year">{name}</span>
              <span className="count">{count}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="widget plain-widget tag-cloud-widget">
        <WidgetHeading icon={<Hash size={22} />} title="카테고리" />
        <div className="tag-cloud-tags">
          <TagLinks tags={categories.map(({ name }) => name)} />
        </div>
      </section>

      <section className="widget plain-widget tag-cloud-widget">
        <WidgetHeading icon={<Tag size={22} />} title="태그" />
        <div className="tag-cloud-tags">
          <TagLinks tags={tags} />
        </div>
      </section>
    </div>
  );
}

// 위젯 제목 영역의 아이콘/링크 스타일을 통일합니다.
function WidgetHeading({ icon, title, href }: { icon: ReactNode; title: string; href?: string }) {
  return (
    <header className="widget-heading">
      <div className="widget-icon">{icon}</div>
      <h2 className="widget-title section-title">{href ? <Link href={href}>{title}</Link> : title}</h2>
    </header>
  );
}

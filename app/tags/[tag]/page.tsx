import type { Metadata } from "next";
import { BlogShell } from "@/components/blog-shell";
import { PostCard } from "@/components/post-card";
import { RightRail } from "@/components/right-rail";
import { getAllPosts, getAllTags } from "@/lib/markdown";

type Props = {
  params: {
    tag: string;
  };
};

// 존재하는 태그와 카테고리만 정적 경로로 생성합니다.
export function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag }));
}

export function generateMetadata({ params }: Props): Metadata {
  return {
    title: `#${decodeURIComponent(params.tag)}`
  };
}

// 태그 페이지는 태그와 카테고리를 같은 방식으로 필터링합니다.
export default function TagPage({ params }: Props) {
  const tag = decodeURIComponent(params.tag);
  const posts = getAllPosts();
  const filteredPosts = posts.filter((post) => post.metadata.tags.includes(tag) || post.metadata.category === tag);

  return (
    <BlogShell rightRail={<RightRail posts={posts} tags={getAllTags()} />}>
      <section className="section-heading">
        <p className="eyebrow">Tag</p>
        <h1>#{tag}</h1>
        <p>{filteredPosts.length}개의 글이 이 태그로 정리되어 있습니다.</p>
      </section>
      <section className="article-list" aria-label={`${tag} 글 목록`}>
        {filteredPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </section>
    </BlogShell>
  );
}

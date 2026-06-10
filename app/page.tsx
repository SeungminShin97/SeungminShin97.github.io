import { BlogShell } from "@/components/blog-shell";
import { PostCard } from "@/components/post-card";
import { RightRail } from "@/components/right-rail";
import { getAllPosts, getAllTags } from "@/lib/markdown";

// 홈은 빌드 시점에 읽은 Markdown 글 목록을 카드로 보여줍니다.
export default function HomePage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <BlogShell rightRail={<RightRail posts={posts} tags={tags} />}>
      <section className="article-list" aria-label="글 목록">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </section>
    </BlogShell>
  );
}

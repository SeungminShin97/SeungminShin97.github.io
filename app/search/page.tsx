import { BlogShell } from "@/components/blog-shell";
import { DynamicShell } from "@/components/dynamic-shell";
import { RightRail } from "@/components/right-rail";
import { getAllPosts, getAllTags } from "@/lib/markdown";

export const metadata = {
  title: "검색"
};

// 오른쪽 검색 위젯이 이동하는 검색 결과 페이지 자리입니다.
export default function SearchPage() {
  const posts = getAllPosts();

  return (
    <BlogShell rightRail={<RightRail posts={posts} tags={getAllTags()} />}>
      <DynamicShell
        eyebrow="Search"
        title="검색"
        description="검색 화면 자리만 잡아두었습니다. 나중에 정적 검색 인덱스를 붙이면 됩니다."
        endpoint="GET /search-index.json"
      />
    </BlogShell>
  );
}

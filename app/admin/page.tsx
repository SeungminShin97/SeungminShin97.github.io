import { BlogShell } from "@/components/blog-shell";
import { DynamicShell } from "@/components/dynamic-shell";
import { RightRail } from "@/components/right-rail";
import { getAllPosts, getAllTags } from "@/lib/markdown";

export const metadata = {
  title: "관리자"
};

// 관리자 기능은 나중에 API 인증과 통계를 붙일 정적 껍데기입니다.
export default function AdminPage() {
  const posts = getAllPosts();

  return (
    <BlogShell rightRail={<RightRail posts={posts} tags={getAllTags()} />}>
      <DynamicShell
        eyebrow="Admin"
        title="관리자 대시보드"
        description="정적 페이지 껍데기입니다. 인증, 통계, 댓글 관리는 Spring Boot API와 연결할 때 채우면 됩니다."
        endpoint="GET /api/admin/stats"
      />
    </BlogShell>
  );
}

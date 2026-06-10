import { BlogShell } from "@/components/blog-shell";
import { DynamicShell } from "@/components/dynamic-shell";
import { RightRail } from "@/components/right-rail";
import { getAllPosts, getAllTags } from "@/lib/markdown";

export const metadata = {
  title: "방명록"
};

// 방명록 데이터는 이후 Oracle Cloud API에서 받아올 예정입니다.
export default function GuestbookPage() {
  const posts = getAllPosts();

  return (
    <BlogShell rightRail={<RightRail posts={posts} tags={getAllTags()} />}>
      <DynamicShell
        eyebrow="Guestbook"
        title="방명록"
        description="GitHub Pages에는 이 화면만 배포하고, 글 목록과 작성 기능은 나중에 Oracle Cloud API에서 받아오면 됩니다."
        endpoint="GET /api/guestbook"
      />
    </BlogShell>
  );
}

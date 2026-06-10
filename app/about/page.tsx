import { BlogShell } from "@/components/blog-shell";
import { InfoPage } from "@/components/info-page";
import { RightRail } from "@/components/right-rail";
import { getAllPosts, getAllTags } from "@/lib/markdown";

export const metadata = {
  title: "소개"
};

// 블로그와 운영 방향을 설명하는 정적 소개 페이지입니다.
export default function AboutPage() {
  const posts = getAllPosts();

  return (
    <BlogShell rightRail={<RightRail posts={posts} tags={getAllTags()} />}>
      <InfoPage eyebrow="About" title="백엔드와 시스템 설계를 기록합니다">
        <p>
          이 블로그는 Java, Spring Boot, 데이터베이스, 운영 경험을 차분하게 정리하는 공간입니다. 글은 Markdown으로
          작성하고 GitHub Pages에 정적으로 배포합니다.
        </p>
        {/* 서버 기능을 붙일 때 다시 소개합니다.
        <p>
          댓글, 조회수, 방명록, 관리자 통계처럼 변하는 데이터는 별도 API 서버에서 처리할 예정입니다. 정적 블로그의 빠른
          접근성과 개인 서버의 확장성을 함께 가져가는 구조를 목표로 합니다.
        </p>
        */}
      </InfoPage>
    </BlogShell>
  );
}

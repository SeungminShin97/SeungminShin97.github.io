import { BlogShell } from "@/components/blog-shell";
import { InfoPage } from "@/components/info-page";
import { RightRail } from "@/components/right-rail";
import { getAllPosts, getAllTags } from "@/lib/markdown";

export const metadata = {
  title: "링크"
};

// 외부 참고 링크는 나중에 필요할 때 이 배열에만 추가하면 됩니다.
const links = [
  {
    title: "GitHub",
    description: "프로젝트와 블로그 소스 코드를 관리하는 공간",
    href: "https://github.com/seungminshin97"
  },
  {
    title: "Spring",
    description: "백엔드 글에서 자주 참고하는 공식 문서",
    href: "https://spring.io"
  }
];

export default function LinksPage() {
  const posts = getAllPosts();

  return (
    <BlogShell rightRail={<RightRail posts={posts} tags={getAllTags()} />}>
      <InfoPage eyebrow="Links" title="링크">
        <div className="project-grid">
          {links.map((link) => (
            <a className="project-card" href={link.href} target="_blank" rel="noreferrer" key={link.href}>
              <h2>{link.title}</h2>
              <p>{link.description}</p>
              <span>{link.href}</span>
            </a>
          ))}
        </div>
      </InfoPage>
    </BlogShell>
  );
}

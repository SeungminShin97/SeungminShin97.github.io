import Link from "next/link";
import { CalendarClock } from "lucide-react";
import { BlogShell } from "@/components/blog-shell";
import { RightRail } from "@/components/right-rail";
import { groupPostsByYear } from "@/lib/archive";
import { formatFullDate } from "@/lib/format";
import { getAllPosts, getAllTags } from "@/lib/markdown";
import { projects } from "@/lib/projects";
import { postPath } from "@/lib/routes";

export const metadata = {
  title: "아카이브"
};

// 아카이브는 프로젝트 카드와 연도별 글 목록을 함께 보여줍니다.
export default function ArchivesPage() {
  const posts = getAllPosts();
  const groupedPosts = groupPostsByYear(posts);

  return (
    <BlogShell rightRail={<RightRail posts={posts} tags={getAllTags()} />}>
      <section className="archive-projects" aria-label="프로젝트">
        <h1>Projects</h1>
        <div className="archive-project-grid">
          {projects.map((project) => (
            <Link
              href={project.href}
              className={`archive-project-card ${project.image ? "has-image" : ""}`}
              key={project.name}
              style={project.image ? { backgroundImage: `url(${project.image})` } : undefined}
            >
              <div>
                <h2>{project.name}</h2>
                <p>{project.subtitle}</p>
              </div>
              <div className="archive-project-tags">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="archive-timeline" aria-label="연도별 글 목록">
        {groupedPosts.map(({ year, items }) => (
          <div className="archive-year-section" id={year} key={year}>
            <h2>{year}</h2>
            <ol className="archive-post-list">
              {items.map((post) => (
                <li key={post.slug}>
                  <Link href={postPath(post.slug)} className="archive-post-link">
                    <div className="archive-post-body">
                      <h3>{post.metadata.title}</h3>
                      <p>{post.metadata.description}</p>
                      <div className="archive-post-meta">
                        <CalendarClock size={17} />
                        <time dateTime={post.metadata.date}>{formatFullDate(post.metadata.date)}</time>
                        <span>{post.metadata.category}</span>
                      </div>
                      <div className="archive-post-tags">
                        {post.metadata.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    </div>
                    {post.metadata.image ? <img src={post.metadata.image} alt="" loading="lazy" /> : null}
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </section>
    </BlogShell>
  );
}

import type { Post } from "@/lib/markdown";

export type CountItem = {
  name: string;
  count: number;
};

export type YearGroup = {
  year: string;
  items: Post[];
};

// 아카이브 페이지에서 사용할 연도별 글 묶음을 만듭니다.
export function groupPostsByYear(posts: Post[]): YearGroup[] {
  const groups = new Map<string, Post[]>();

  posts.forEach((post) => {
    const year = getPostYear(post);
    groups.set(year, [...(groups.get(year) ?? []), post]);
  });

  return Array.from(groups.entries()).map(([year, items]) => ({ year, items }));
}

// 오른쪽 사이드바 아카이브 위젯의 연도별 글 개수입니다.
export function getYearCounts(posts: Post[]): CountItem[] {
  const counts = new Map<string, number>();

  posts.forEach((post) => {
    const year = getPostYear(post);
    counts.set(year, (counts.get(year) ?? 0) + 1);
  });

  return Array.from(counts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => Number(b.name) - Number(a.name));
}

// 오른쪽 사이드바 카테고리 위젯의 카테고리별 글 개수입니다.
export function getCategoryCounts(posts: Post[]): CountItem[] {
  const counts = new Map<string, number>();

  posts.forEach((post) => {
    counts.set(post.metadata.category, (counts.get(post.metadata.category) ?? 0) + 1);
  });

  return Array.from(counts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

function getPostYear(post: Post) {
  return new Date(post.metadata.date).getFullYear().toString();
}

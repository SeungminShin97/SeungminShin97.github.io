import Link from "next/link";
import { tagPath } from "@/lib/routes";

type TagLinksProps = {
  tags: string[];
  prefix?: string;
};

// 태그 링크 묶음은 카드, 상세, 오른쪽 사이드바에서 공통으로 사용합니다.
export function TagLinks({ tags, prefix = "" }: TagLinksProps) {
  return (
    <>
      {tags.map((tag) => (
        <Link className="tag-chip" key={tag} href={tagPath(tag)}>
          {prefix}
          {tag}
        </Link>
      ))}
    </>
  );
}

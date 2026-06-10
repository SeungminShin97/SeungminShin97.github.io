import fs from "fs";
import path from "path";

// Markdown front matter에서 읽어오는 글 메타데이터입니다.
export type PostMetadata = {
  title: string;
  description: string;
  date: string;
  tags: string[];
  category: string;
  series?: string;
  image?: string;
};

// 화면에서 사용하는 글 데이터입니다. 본문과 메타데이터를 분리해 둡니다.
export type Post = {
  slug: string;
  metadata: PostMetadata;
  readingMinutes: number;
  html: string;
};

const postsDirectory = path.join(process.cwd(), "content", "posts");

// 빌드 시점에 content/posts 폴더의 Markdown 파일을 전부 읽습니다.
export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => getPostBySlug(file.replace(/\.md$/, "")))
    .sort((a, b) => Number(new Date(b.metadata.date)) - Number(new Date(a.metadata.date)));
}

// slug에 맞는 Markdown 파일 하나를 읽고 Post 객체로 변환합니다.
export function getPostBySlug(slug: string): Post {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const source = fs.readFileSync(fullPath, "utf8");
  const { data, content } = parseFrontMatter(source);

  return {
    slug,
    metadata: normalizeMetadata(data, slug),
    readingMinutes: Math.max(1, Math.ceil(content.split(/\s+/).length / 220)),
    html: renderMarkdown(content)
  };
}

// 태그 페이지와 오른쪽 사이드바에서 사용할 전체 태그 목록입니다.
export function getAllTags(): string[] {
  return Array.from(
    new Set(getAllPosts().flatMap((post) => [...post.metadata.tags, post.metadata.category]))
  ).sort();
}

// front matter를 앱 내부에서 쓰는 PostMetadata 객체로 정규화합니다.
function normalizeMetadata(data: Record<string, any>, fallbackTitle: string): PostMetadata {
  return {
    title: data.title ?? fallbackTitle,
    description: data.description ?? "",
    date: data.date ?? "",
    tags: data.tags ?? [],
    category: data.category ?? "기록",
    series: data.series,
    image: data.image
  };
}

// YAML front matter의 단순 key/value와 배열 문법을 파싱합니다.
function parseFrontMatter(source: string): { data: Record<string, any>; content: string } {
  if (!source.startsWith("---")) {
    return { data: {}, content: source };
  }

  const end = source.indexOf("\n---", 3);
  if (end === -1) {
    return { data: {}, content: source };
  }

  const frontMatter = source.slice(3, end).trim();
  const content = source.slice(end + 4).trim();
  const lines = frontMatter.split(/\r?\n/);
  const data: Record<string, any> = {};

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);

    if (!match) {
      continue;
    }

    const [, key, rawValue] = match;
    if (rawValue === "") {
      const list: string[] = [];
      while (lines[index + 1]?.trim().startsWith("- ")) {
        index += 1;
        list.push(lines[index].trim().replace(/^- /, ""));
      }
      data[key] = list;
    } else {
      data[key] = rawValue.replace(/^["']|["']$/g, "");
    }
  }

  return { data, content };
}

// 현재 블로그 샘플에 필요한 최소 Markdown 문법만 HTML로 변환합니다.
function renderMarkdown(markdown: string): string {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const html: string[] = [];
  let paragraph: string[] = [];
  let listItems: string[] = [];
  let inCode = false;
  let codeLanguage = "";
  let codeLines: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length > 0) {
      html.push(`<p>${renderInline(paragraph.join(" "))}</p>`);
      paragraph = [];
    }
  };

  const flushList = () => {
    if (listItems.length > 0) {
      html.push(`<ul>${listItems.map((item) => `<li>${renderInline(item)}</li>`).join("")}</ul>`);
      listItems = [];
    }
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith("```")) {
      if (inCode) {
        html.push(`<pre><code class="language-${escapeHtml(codeLanguage)}">${escapeHtml(codeLines.join("\n"))}</code></pre>`);
        inCode = false;
        codeLanguage = "";
        codeLines = [];
      } else {
        flushParagraph();
        flushList();
        inCode = true;
        codeLanguage = trimmed.slice(3).trim();
      }
      continue;
    }

    if (inCode) {
      codeLines.push(line);
      continue;
    }

    if (trimmed === "") {
      flushParagraph();
      flushList();
      continue;
    }

    const heading = trimmed.match(/^(#{2,4})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      flushList();
      const level = heading[1].length;
      html.push(`<h${level}>${renderInline(heading[2])}</h${level}>`);
      continue;
    }

    if (trimmed.startsWith("- ")) {
      flushParagraph();
      listItems.push(trimmed.slice(2));
      continue;
    }

    if (trimmed.startsWith("> ")) {
      flushParagraph();
      flushList();
      html.push(`<blockquote>${renderInline(trimmed.slice(2))}</blockquote>`);
      continue;
    }

    paragraph.push(trimmed);
  }

  flushParagraph();
  flushList();

  return html.join("\n");
}

// 인라인 링크, 굵게, 코드 문법을 처리합니다.
function renderInline(value: string): string {
  return escapeHtml(value)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

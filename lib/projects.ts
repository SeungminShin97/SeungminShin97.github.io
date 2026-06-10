// 아카이브 상단의 프로젝트 카드 데이터입니다.
export type Project = {
  name: string;
  subtitle: string;
  tags: string[];
  href: string;
  image?: string;
};

export const projects: Project[] = [
  {
    name: "Seungpring",
    subtitle: "Spring 핵심 원리를 직접 구현하며 정리하는 프레임워크 실험",
    tags: ["Java", "IoC", "MVC"],
    href: "/tags/Backend/",
    image: "/post-images/seungpring.jpg"
  },
  // 서버 기능을 붙일 때 다시 프로젝트 카드로 노출합니다.
  // {
  //   name: "Blog API Server",
  //   subtitle: "댓글, 조회수, 방명록, 관리자 통계를 맡는 개인 API 서버",
  //   tags: ["Spring Boot", "MariaDB", "Oracle Cloud"],
  //   href: "/tags/Architecture/"
  // },
  {
    name: "Operations Notes",
    subtitle: "ThreadPool, 배포 자동화, 장애 대응을 쌓아두는 운영 노트",
    tags: ["Performance", "Docker", "Nginx"],
    href: "/tags/Operations/",
    image: "/post-images/architecture.jpg"
  },
  {
    name: "Blog Build Log",
    subtitle: "GitHub Pages와 Next.js static export 기반 블로그 제작 기록",
    tags: ["Next.js", "GitHub Pages", "SSG"],
    href: "/tags/Blog/"
  }
];

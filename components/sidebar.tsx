"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Archive, Github, Home, LayoutDashboard, PenLine, ToggleLeft, ToggleRight, UserRound, type LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { navItems, type NavIcon } from "@/lib/navigation";
import { site } from "@/lib/site";

const iconMap: Record<NavIcon, LucideIcon> = {
  home: Home,
  user: UserRound,
  archive: Archive,
  pen: PenLine,
  dashboard: LayoutDashboard
};

// 왼쪽 프로필, 메뉴, 다크모드 토글을 담당합니다.
export function Sidebar() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = storedTheme === "dark" || (!storedTheme && prefersDark) ? "dark" : "light";
    setTheme(initialTheme);
    document.documentElement.dataset.theme = initialTheme;
  }, []);

  // 테마 상태는 localStorage와 html data-theme에 함께 반영합니다.
  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("theme", nextTheme);
  };

  return (
    <aside className="left-sidebar">
      <header className="site-profile">
        <figure className="site-avatar">
          <Link href="/" aria-label="홈으로 이동">
            <Image src="/avatar.png" alt="프로필 이미지" width={132} height={132} priority />
          </Link>
          <span className="avatar-emoji">☕</span>
        </figure>
        <div className="site-meta">
          <h1 className="site-name">
            <Link href="/">{site.name}</Link>
          </h1>
          <h2 className="site-description">{site.description}</h2>
        </div>
      </header>

      <ol className="menu-social" aria-label="소셜 링크">
        <li>
          <a href="https://github.com/seungminshin97" target="_blank" rel="noreferrer" title="GitHub">
            <Github size={20} />
          </a>
        </li>
      </ol>

      <ol className="main-menu" id="main-menu">
        {navItems.map((item) => {
          const Icon = iconMap[item.icon];
          const isCurrent = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

          return (
            <li key={item.href} className={isCurrent ? "current" : undefined}>
              <Link href={item.href}>
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
        <li className="menu-bottom-section">
          <button type="button" id="dark-mode-toggle" onClick={toggleTheme} aria-label="다크모드 전환">
            {theme === "dark" ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
            <span>{theme === "dark" ? "라이트 모드" : "다크 모드"}</span>
          </button>
        </li>
      </ol>
    </aside>
  );
}

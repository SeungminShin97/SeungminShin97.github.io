// 사이드바 메뉴는 이 배열만 수정하면 화면에 반영됩니다.
export type NavIcon = "home" | "user" | "archive" | "pen" | "dashboard";

export type NavItem = {
  href: string;
  label: string;
  icon: NavIcon;
};

export const navItems: NavItem[] = [
  { href: "/", label: "홈", icon: "home" },
  { href: "/about/", label: "소개", icon: "user" },
  { href: "/archives/", label: "아카이브", icon: "archive" }
  // 서버 기능을 붙일 때 다시 노출합니다.
  // { href: "/guestbook/", label: "방명록", icon: "pen" },
  // { href: "/admin/", label: "관리자", icon: "dashboard" }
];

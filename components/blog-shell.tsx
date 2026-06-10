import { Sidebar } from "@/components/sidebar";
import { site } from "@/lib/site";

type BlogShellProps = {
  children: React.ReactNode;
  rightRail?: React.ReactNode;
};

// 모든 페이지가 공유하는 3단 레이아웃입니다.
export function BlogShell({ children, rightRail }: BlogShellProps) {
  return (
    <div className="site-shell">
      <Sidebar />
      <main className="content-area">
        {children}
        <footer className="site-footer">
          <section className="copyright">© 2026 {site.author}</section>
          <section className="powerby">
            Theme{" "}
            <b>
              <a href="https://github.com/CaiJimmy/hugo-theme-stack" target="_blank" rel="noreferrer">
                Stack
              </a>
            </b>{" "}
            designed by <a href="https://jimmycai.com" target="_blank" rel="noreferrer">Jimmy</a>
          </section>
        </footer>
      </main>
      <aside className="right-rail">{rightRail}</aside>
    </div>
  );
}

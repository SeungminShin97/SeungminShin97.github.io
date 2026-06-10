type InfoPageProps = {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
};

// 소개/링크처럼 본문만 다른 일반 정보 페이지 틀입니다.
export function InfoPage({ eyebrow, title, children }: InfoPageProps) {
  return (
    <article className="info-page">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <div className="info-content">{children}</div>
    </article>
  );
}

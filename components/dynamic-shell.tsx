import { RadioTower } from "lucide-react";
// 서버 API를 붙일 때 다시 사용합니다.
// import { site } from "@/lib/site";

type DynamicShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  endpoint: string;
};

// 방명록/관리자처럼 API 연결 예정인 정적 껍데기 페이지입니다.
export function DynamicShell({ eyebrow, title, description, endpoint }: DynamicShellProps) {
  return (
    <section className="dynamic-page">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{description}</p>
      <div className="dynamic-panel">
        <div className="dynamic-icon">
          <RadioTower size={22} />
        </div>
        <div>
          <h2>API 연결 자리</h2>
          {/* 서버 API를 붙일 때 다시 노출합니다.
          <p>
            <code>{site.apiBaseUrl}</code>
          </p>
          */}
          <p>
            <code>{endpoint}</code>
          </p>
        </div>
      </div>
    </section>
  );
}

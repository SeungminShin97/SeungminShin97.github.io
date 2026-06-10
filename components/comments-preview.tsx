import { MessageCircle } from "lucide-react";
// 서버 댓글 기능을 붙일 때 다시 사용합니다.
// import { site } from "@/lib/site";

// 실제 댓글 API를 붙이기 전까지 사용하는 댓글 영역 자리입니다.
export function CommentsPreview({ slug }: { slug: string }) {
  return (
    <section className="dynamic-panel" id="comments">
      <div className="dynamic-icon">
        <MessageCircle size={22} />
      </div>
      <div>
        <p className="eyebrow">Comments</p>
        <h2>댓글 영역</h2>
        {/* 서버 댓글 기능을 붙일 때 다시 노출합니다.
        <p>
          나중에 브라우저 JavaScript에서 <code>{site.apiBaseUrl}/api/posts/{slug}/comments</code>를 호출해 채우면 됩니다.
        </p>
        */}
      </div>
    </section>
  );
}

// 카드와 상세 페이지에서 공통으로 쓰는 긴 날짜 형식입니다.
export function formatFullDate(date: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(new Date(date));
}

// 작은 목록에서 쓸 수 있는 짧은 날짜 형식입니다.
export function formatShortDate(date: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    month: "short",
    day: "numeric"
  }).format(new Date(date));
}

// 앱 내부 링크를 한곳에서 만들면 경로 규칙이 바뀌어도 수정 범위가 작아집니다.
export function postPath(slug: string) {
  return `/posts/${slug}/`;
}

export function tagPath(tag: string) {
  return `/tags/${encodeURIComponent(tag)}/`;
}

export function archiveYearPath(year: string) {
  return `/archives/#${year}`;
}

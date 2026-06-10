---
title: GitHub Pages와 개인 API 서버를 함께 쓰는 블로그 구조
description: 글은 정적으로 배포하고 댓글, 조회수, 방명록은 Oracle Cloud API 서버에서 처리하는 구조를 정리합니다.
date: 2026-05-21
image: /post-images/threadpool.jpg
tags:
  - Blog
  - GitHub Pages
  - Spring Boot
category: Architecture
series: Blog Build Log
---

개인 기술 블로그는 정적 사이트와 API 서버를 분리해서 가져가는 편이 운영하기 쉽다. 글은 GitHub Pages에서 빠르게 제공하고, 댓글이나 조회수처럼 변하는 데이터만 별도 서버가 맡는다.

## 정적 영역

SEO가 중요한 글 페이지는 빌드 시점에 HTML로 만들어 둔다. Markdown을 수정하고 GitHub에 push하면 GitHub Actions가 정적 파일을 생성한 뒤 Pages에 배포한다.

- 홈
- 글 목록
- 글 상세
- 태그 페이지
- 프로젝트 소개

이 영역은 서버가 잠깐 내려가도 계속 접근할 수 있어야 한다.

## 동적 영역

댓글, 조회수, 방명록, 관리자 통계는 브라우저 JavaScript가 API를 호출해서 채운다. GitHub Pages는 화면 껍데기만 제공하고, 실제 데이터는 Oracle Cloud의 Spring Boot API가 처리한다.

```text
브라우저
  -> GitHub Pages 정적 HTML
  -> JavaScript 실행
  -> Oracle Cloud API
  -> MariaDB
```

이 구조의 장점은 역할이 명확하다는 점이다. 블로그 글은 정적으로 단단하게 두고, 실험적인 기능은 API 서버에서 천천히 키워갈 수 있다.

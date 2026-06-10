---
title: ThreadPool Saturation을 관찰하는 방법
description: API 서버가 느려질 때 스레드풀 포화와 DB 커넥션 병목을 구분하기 위한 체크리스트입니다.
date: 2026-05-20
image: /post-images/architecture.jpg
tags:
  - Java
  - Performance
  - Backend
category: Operations
series: Performance Notes
---

서버가 느려졌다는 말은 원인이 아니라 현상이다. 요청이 느려졌을 때는 스레드가 부족한지, DB 커넥션이 부족한지, 외부 API 응답을 기다리는지부터 분리해서 봐야 한다.

## 먼저 볼 지표

스레드풀 포화를 의심할 때는 다음 값을 같이 봐야 한다.

- active thread 수
- queue 대기 길이
- rejected task 수
- 요청 처리 시간의 p95, p99
- DB connection pool active 수

하나의 지표만 보면 착시가 생긴다. active thread가 높아도 실제 병목은 DB 커넥션일 수 있고, queue가 길어도 원인은 외부 API timeout일 수 있다.

## 로그보다 메트릭

개별 에러 로그는 문제를 발견하는 데 도움이 되지만, 포화 상태를 설명하려면 시간 축이 필요하다. 그래서 운영 환경에서는 Micrometer, Prometheus, Grafana처럼 흐름을 볼 수 있는 도구를 붙이는 편이 좋다.

```text
요청 증가
  -> active thread 증가
  -> queue 증가
  -> 응답 시간 증가
  -> timeout 또는 reject 발생
```

이 흐름이 보이면 단순히 스레드 수를 늘리는 대신 병목 지점을 좁혀갈 수 있다.

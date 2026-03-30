---
name: Project Architecture
description: 캘린더 앱의 핵심 아키텍처 결정사항 및 패턴
type: project
---

# 프로젝트 아키텍처 메모

## 기술 스택 특이사항
- ShadcnUI는 base-ui 기반이므로 `asChild` 대신 `render` prop 사용 (app-sidebar.tsx에서 확인)
- Zod v4: `required_error` 대신 `error` 사용 (event-schema.ts에서 올바르게 적용)
- Schedule-X: `temporal-polyfill/global` import 필수 (calendar-view.tsx 최상단에 위치)
- QueryClient는 싱글턴 패턴으로 관리 (query-client.ts), 서버/클라이언트 분리 없음

## 상태 관리 패턴
- Zustand: UI 상태만 (currentDate, viewType, selectedDate) — calendar-store.ts
- React Query: localStorage CRUD 래핑 — use-events.ts
- CategoryFilter는 mutation 훅 없이 직접 storage + queryClient.invalidateQueries 호출 (아키텍처 위반)
- settings/page.tsx도 동일하게 직접 storage 호출 패턴 사용 (아키텍처 위반)

## 데이터 흐름
- localStorage가 단일 데이터 소스
- EVENTS_KEY = "calendar-events", CATEGORIES_KEY = "calendar-categories"
- storage.ts에 typeof window 가드 있음 (SSR 안전)

## 컴포넌트 구조
- EventDialog는 DashboardLayout에서 관리됨 (layout 수준 상태)
- ListPage에도 별도 EventDialog 인스턴스 있음 (수정 전용)
- CalendarView는 useNextCalendarApp 훅으로 schedule-x 인스턴스 관리

**Why:** localStorage 기반이므로 API 없음. 모든 mutation은 동기 함수를 Promise.resolve로 래핑.
**How to apply:** 새 CRUD 기능 추가 시 storage.ts 함수 → use-events.ts 훅 → 컴포넌트 순서로 구현 권장.

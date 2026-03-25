# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 언어 규칙
- 응답, 코드 주석, 커밋 메시지, 문서 모두 **한국어**
- 변수명/함수명은 영어

## 빌드 및 개발 명령어
```bash
npm run dev      # 개발 서버 (http://localhost:3000)
npm run build    # 프로덕션 빌드
npm run lint     # ESLint
npx tsc --noEmit # 타입 체크
```

## ShadcnUI 컴포넌트 추가
```bash
npx shadcn@latest add <component-name>
```
- ShadcnUI는 **base-ui 기반** (Radix 아님). `asChild` 대신 `render` prop 사용
- 컴포넌트는 `src/components/ui/`에 자동 생성됨

## 아키텍처

### 기술 스택
- Next.js 16 (App Router) + React 19 + TypeScript (strict)
- TailwindCSS v4 + ShadcnUI (base-nova 스타일)
- Zustand (UI 상태) + TanStack React Query (데이터 상태)
- React Hook Form + Zod v4 (폼 검증)
- Schedule-X (캘린더 뷰) — `temporal-polyfill/global` import 필수
- date-fns + ko locale (날짜 처리)
- next-themes (다크모드), sonner (토스트)

### 데이터 흐름
모든 데이터는 **localStorage**에 저장. API 없음.
```
UI → React Hook Form + Zod 검증 → useCreateEvent (React Query mutation)
→ storage.ts (localStorage CRUD) → 쿼리 무효화 → UI 재렌더링
```

### 상태 관리 분리
- **Zustand** (`src/stores/calendar-store.ts`): 캘린더 뷰 상태 (currentDate, viewType, selectedDate)
- **React Query** (`src/hooks/use-events.ts`): 일정/카테고리 CRUD — localStorage를 데이터 소스로 사용

### 라우트 구조
모든 페이지는 `(dashboard)` 라우트 그룹 내에 위치하며 사이드바+헤더 레이아웃을 공유:
- `/` — 캘린더 뷰 (Schedule-X)
- `/list` — 일정 리스트 뷰
- `/settings` — 카테고리/데이터 관리

### 레이아웃 계층
```
RootLayout (ThemeProvider → QueryProvider → Toaster)
└── DashboardLayout (TooltipProvider → SidebarProvider)
    ├── AppSidebar (미니 캘린더 + 네비게이션 + 카테고리 필터)
    ├── AppHeader (SidebarTrigger + CalendarHeader + ModeToggle)
    ├── main (페이지 콘텐츠)
    └── EventDialog (일정 추가/수정 모달)
```

### 컴포넌트 계층
- `src/components/ui/` — ShadcnUI 기본 컴포넌트 (수정 지양)
- `src/components/calendar/` — 캘린더 도메인 (calendar-view, calendar-header, mini-calendar, category-filter)
- `src/components/event/` — 일정 도메인 (event-form, event-dialog, event-card, event-list)
- `src/components/layout/` — 레이아웃 (app-sidebar, app-header, theme-provider, query-provider, mode-toggle)
- `src/components/shared/` — 공통 (confirm-dialog, empty-state)

### 주요 설정 파일
- `src/config/site.ts` — 사이트 이름, 기본 카테고리 4종, 색상 프리셋 8종
- `src/types/event.ts` — CalendarEvent, EventCategory, CalendarViewType 타입 정의
- `src/schemas/event-schema.ts` — Zod v4 폼 검증 (주의: `required_error` 대신 `error` 사용)

### Schedule-X 주의사항
- `temporal-polyfill/global`을 반드시 import해야 Temporal API 사용 가능
- 이벤트의 start/end는 `Temporal.PlainDate` 또는 `Temporal.ZonedDateTime` 타입
- 뷰 이름: `"month-grid"`, `"week"`, `"day"` (내부 viewType과 다름)

### 경로 별칭
`@/*` → `./src/*` (tsconfig.json)

---
name: Recurring Issues
description: 이 프로젝트에서 반복 발견된 코드 이슈 및 안티패턴
type: project
---

# 반복 발견 이슈

## 아키텍처 위반
- CategoryFilter, settings/page.tsx: 아키텍처 원칙(React Query mutation 경유) 무시하고 직접 storage 호출 후 queryClient.invalidateQueries
- useCategories에 카테고리 mutation 훅(useUpdateCategory 등) 미구현

## 미사용 임포트 (린트 경고)
- settings/page.tsx: `Separator`, `EventCategory` 미사용
- calendar-view.tsx: `format` 미사용
- event-list.tsx: `isSameDay`, `parseISO`, `Separator` 미사용

## React Compiler 경고
- event-form.tsx: form.watch()를 조건부 렌더링에 직접 사용 → React Compiler가 메모이제이션 불가 경고 발생
  - 해결: useWatch 훅으로 교체

## 잠재적 버그
- storage.ts의 JSON.parse는 try-catch 없음 (localStorage 파싱 실패 시 앱 크래시)
- event-form.tsx의 defaultValues에서 categories[0]?.id 의존 → categories 로딩 전에 렌더링 시 "work" 하드코딩 fallback

## 접근성 이슈
- CalendarHeader의 이전/다음 버튼에 aria-label 누락
- EventCard의 DropdownMenuTrigger에 aria-label 누락
- ModeToggle의 Moon 아이콘이 position:absolute 없이 absolute처럼 동작하지 않을 수 있음
- EventCard 삭제 버튼에 확인 다이얼로그 없음 (ConfirmDialog 컴포넌트 있으나 미사용)

## 매직 스트링
- settings/page.tsx에서 "calendar-events" 직접 하드코딩 (storage.ts의 상수 미사용)
- settings/page.tsx의 앱 정보에 "Next.js 15" 표기 (실제 버전은 16.2.1)

## ToggleGroup 패턴
- calendar-header.tsx: ToggleGroup을 type="multiple"처럼 사용하며 수동으로 단일 선택 구현
  - 더 명확한 방법: type="single" 사용하여 직접 value 바인딩

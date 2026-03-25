// 캘린더 뷰 타입
export type CalendarViewType = "month" | "week" | "day";

// 일정 카테고리
export interface EventCategory {
  id: string;
  name: string;
  color: string;
  isVisible: boolean;
}

// 캘린더 일정
export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startAt: string; // ISO 8601 형식
  endAt: string; // ISO 8601 형식
  isAllDay: boolean;
  categoryId: string;
  color: string;
  location?: string;
  createdAt: string;
  updatedAt: string;
}

// 일정 생성/수정 시 사용하는 폼 데이터
export interface EventFormData {
  title: string;
  description?: string;
  startAt: Date;
  endAt: Date;
  isAllDay: boolean;
  categoryId: string;
  color: string;
  location?: string;
}

// 네비게이션 아이템
export interface NavItem {
  title: string;
  url: string;
  icon?: React.ComponentType<{ className?: string }>;
  isActive?: boolean;
}

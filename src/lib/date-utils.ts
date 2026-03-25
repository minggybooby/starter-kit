import { format, formatRelative, isToday, isTomorrow, isYesterday } from "date-fns";
import { ko } from "date-fns/locale";

// 한국어 날짜 포맷
export function formatDateKo(date: Date, formatStr: string = "yyyy년 M월 d일") {
  return format(date, formatStr, { locale: ko });
}

// 시간 포맷 (HH:mm)
export function formatTime(date: Date) {
  return format(date, "HH:mm");
}

// 날짜 + 시간 포맷
export function formatDateTime(date: Date) {
  return format(date, "yyyy년 M월 d일 HH:mm", { locale: ko });
}

// 상대적 날짜 표시 (오늘, 내일, 어제 등)
export function formatRelativeDate(date: Date) {
  if (isToday(date)) return "오늘";
  if (isTomorrow(date)) return "내일";
  if (isYesterday(date)) return "어제";
  return formatRelative(date, new Date(), { locale: ko });
}

// 캘린더 헤더용 날짜 포맷
export function formatCalendarHeader(date: Date, view: "month" | "week" | "day") {
  switch (view) {
    case "month":
      return format(date, "yyyy년 M월", { locale: ko });
    case "week":
      return format(date, "yyyy년 M월 d일 주", { locale: ko });
    case "day":
      return format(date, "yyyy년 M월 d일 (EEEE)", { locale: ko });
  }
}

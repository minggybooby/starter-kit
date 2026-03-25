"use client";

import "temporal-polyfill/global";
import { useEffect, useMemo } from "react";
import { useNextCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import { createViewMonthGrid, createViewWeek, createViewDay } from "@schedule-x/calendar";
import "@schedule-x/theme-default/dist/index.css";
import { useTheme } from "next-themes";
import { useCalendarStore } from "@/stores/calendar-store";
import { useEvents, useCategories } from "@/hooks/use-events";
import { format } from "date-fns";
import type { CalendarEvent } from "@/types/event";

// JS Date → Temporal.PlainDate 변환
function toPlainDate(date: Date): Temporal.PlainDate {
  return Temporal.PlainDate.from({
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  });
}

// CalendarEvent를 schedule-x 이벤트 형식으로 변환
function toScheduleXEvent(event: CalendarEvent) {
  const start = new Date(event.startAt);
  const end = new Date(event.endAt);

  return {
    id: event.id,
    title: event.title,
    description: event.description,
    location: event.location,
    start: event.isAllDay
      ? toPlainDate(start)
      : Temporal.PlainDateTime.from({
          year: start.getFullYear(),
          month: start.getMonth() + 1,
          day: start.getDate(),
          hour: start.getHours(),
          minute: start.getMinutes(),
        }).toZonedDateTime(Temporal.Now.timeZoneId()),
    end: event.isAllDay
      ? toPlainDate(end)
      : Temporal.PlainDateTime.from({
          year: end.getFullYear(),
          month: end.getMonth() + 1,
          day: end.getDate(),
          hour: end.getHours(),
          minute: end.getMinutes(),
        }).toZonedDateTime(Temporal.Now.timeZoneId()),
    calendarId: event.categoryId,
  };
}

// 뷰 타입 매핑
const VIEW_NAME_MAP = {
  month: "month-grid",
  week: "week",
  day: "day",
} as const;

export function CalendarView() {
  const { resolvedTheme } = useTheme();
  const { currentDate, viewType, setSelectedDate } = useCalendarStore();
  const { data: events = [] } = useEvents();
  const { data: categories = [] } = useCategories();

  // 카테고리를 schedule-x calendars 형식으로 변환
  const calendars = useMemo(() => {
    const result: Record<string, { colorName: string; lightColors: { main: string; container: string; onContainer: string }; darkColors: { main: string; container: string; onContainer: string } }> = {};
    for (const cat of categories) {
      result[cat.id] = {
        colorName: cat.name,
        lightColors: {
          main: cat.color,
          container: `${cat.color}20`,
          onContainer: cat.color,
        },
        darkColors: {
          main: cat.color,
          container: `${cat.color}30`,
          onContainer: `${cat.color}cc`,
        },
      };
    }
    return result;
  }, [categories]);

  // 보이는 카테고리의 일정만 필터링
  const visibleCategoryIds = useMemo(
    () => new Set(categories.filter((c) => c.isVisible).map((c) => c.id)),
    [categories]
  );

  const filteredEvents = useMemo(
    () =>
      events
        .filter((e) => visibleCategoryIds.has(e.categoryId))
        .map(toScheduleXEvent),
    [events, visibleCategoryIds]
  );

  const calendarApp = useNextCalendarApp({
    views: [createViewMonthGrid(), createViewWeek(), createViewDay()],
    defaultView: VIEW_NAME_MAP[viewType],
    selectedDate: toPlainDate(currentDate),
    events: filteredEvents,
    calendars,
    isDark: resolvedTheme === "dark",
    locale: "ko-KR",
    firstDayOfWeek: 7, // 일요일 시작
    callbacks: {
      onClickDate: (date) => {
        const jsDate = new Date(date.toString());
        setSelectedDate(jsDate);
      },
    },
  });

  // 이벤트 동기화
  useEffect(() => {
    if (calendarApp) {
      calendarApp.events.set(filteredEvents);
    }
  }, [calendarApp, filteredEvents]);

  if (!calendarApp) return null;

  return (
    <div className="sx-calendar-wrapper h-full [&_.sx-react-calendar-wrapper]:h-full">
      <ScheduleXCalendar calendarApp={calendarApp} />
    </div>
  );
}

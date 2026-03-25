"use client";

import { Calendar } from "@/components/ui/calendar";
import { useCalendarStore } from "@/stores/calendar-store";
import { ko } from "date-fns/locale";

export function MiniCalendar() {
  const { currentDate, setCurrentDate, setSelectedDate } = useCalendarStore();

  return (
    <Calendar
      mode="single"
      selected={currentDate}
      onSelect={(date) => {
        if (date) {
          setCurrentDate(date);
          setSelectedDate(date);
        }
      }}
      locale={ko}
      className="w-full"
    />
  );
}

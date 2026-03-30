"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useCalendarStore } from "@/stores/calendar-store";
import { formatCalendarHeader } from "@/lib/date-utils";
import type { CalendarViewType } from "@/types/event";

export function CalendarHeader() {
  const { currentDate, viewType, setViewType, navigatePrev, navigateNext, navigateToday } =
    useCalendarStore();

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" onClick={navigateToday}>
        오늘
      </Button>
      <div className="flex items-center">
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={navigatePrev} aria-label="이전">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={navigateNext} aria-label="다음">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <h2 className="text-sm font-semibold whitespace-nowrap">
        {formatCalendarHeader(currentDate, viewType)}
      </h2>
      <ToggleGroup
        value={[viewType]}
        onValueChange={(values) => {
          if (values.length > 0) setViewType(values[0] as CalendarViewType);
        }}
        className="ml-2"
      >
        <ToggleGroupItem value="month" size="sm" className="text-xs">
          월
        </ToggleGroupItem>
        <ToggleGroupItem value="week" size="sm" className="text-xs">
          주
        </ToggleGroupItem>
        <ToggleGroupItem value="day" size="sm" className="text-xs">
          일
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}

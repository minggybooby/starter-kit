"use client";

import { useMemo, useState } from "react";
import { format, startOfDay } from "date-fns";
import { ko } from "date-fns/locale";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EventCard } from "@/components/event/event-card";
import { EmptyState } from "@/components/shared/empty-state";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { useEvents, useCategories, useDeleteEvent } from "@/hooks/use-events";
import type { CalendarEvent } from "@/types/event";
import { toast } from "sonner";

interface EventListProps {
  onEdit: (event: CalendarEvent) => void;
}

// 날짜별로 일정을 그룹화
function groupEventsByDate(events: CalendarEvent[]) {
  const groups = new Map<string, CalendarEvent[]>();

  const sorted = [...events].sort(
    (a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime()
  );

  for (const event of sorted) {
    const dateKey = format(startOfDay(new Date(event.startAt)), "yyyy-MM-dd");
    if (!groups.has(dateKey)) {
      groups.set(dateKey, []);
    }
    groups.get(dateKey)!.push(event);
  }

  return groups;
}

export function EventList({ onEdit }: EventListProps) {
  const { data: events = [] } = useEvents();
  const { data: categories = [] } = useCategories();
  const deleteEvent = useDeleteEvent();
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const categoryMap = useMemo(
    () => new Map(categories.map((c) => [c.id, c])),
    [categories]
  );

  // 보이는 카테고리의 일정만
  const visibleEvents = useMemo(() => {
    const visibleIds = new Set(categories.filter((c) => c.isVisible).map((c) => c.id));
    return events.filter((e) => visibleIds.has(e.categoryId));
  }, [events, categories]);

  const grouped = useMemo(() => groupEventsByDate(visibleEvents), [visibleEvents]);

  const handleDelete = (id: string) => {
    setDeleteTarget(id);
  };

  const confirmDelete = () => {
    if (deleteTarget) {
      deleteEvent.mutate(deleteTarget, {
        onSuccess: () => toast.success("일정이 삭제되었습니다"),
      });
      setDeleteTarget(null);
    }
  };

  if (visibleEvents.length === 0) {
    return <EmptyState />;
  }

  return (
    <>
      <ScrollArea className="h-[calc(100vh-12rem)]">
        <div className="space-y-6">
          {Array.from(grouped.entries()).map(([dateKey, dayEvents]) => (
            <div key={dateKey}>
              <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                {format(new Date(dateKey), "M월 d일 (EEEE)", { locale: ko })}
              </h3>
              <div className="space-y-2">
                {dayEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    category={categoryMap.get(event.categoryId)}
                    onEdit={onEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <ConfirmDialog
        open={deleteTarget !== null}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="일정 삭제"
        description="이 일정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
        onConfirm={confirmDelete}
        confirmLabel="삭제"
        variant="destructive"
      />
    </>
  );
}

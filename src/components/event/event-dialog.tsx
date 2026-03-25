"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EventForm } from "@/components/event/event-form";
import { useCreateEvent, useUpdateEvent } from "@/hooks/use-events";
import type { CalendarEvent } from "@/types/event";
import type { EventFormValues } from "@/schemas/event-schema";
import { toast } from "sonner";

interface EventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event?: CalendarEvent | null; // 수정 모드일 때 기존 이벤트
  defaultDate?: Date; // 새 일정의 기본 날짜
}

export function EventDialog({ open, onOpenChange, event, defaultDate }: EventDialogProps) {
  const createEvent = useCreateEvent();
  const updateEvent = useUpdateEvent();
  const isEditing = !!event;

  const defaultValues: Partial<EventFormValues> = event
    ? {
        title: event.title,
        description: event.description ?? "",
        startAt: new Date(event.startAt),
        endAt: new Date(event.endAt),
        isAllDay: event.isAllDay,
        categoryId: event.categoryId,
        color: event.color,
        location: event.location ?? "",
      }
    : {
        startAt: defaultDate ?? new Date(),
        endAt: defaultDate ?? new Date(),
      };

  const handleSubmit = (values: EventFormValues) => {
    if (isEditing) {
      updateEvent.mutate(
        {
          id: event.id,
          data: {
            title: values.title,
            description: values.description,
            startAt: values.startAt.toISOString(),
            endAt: values.endAt.toISOString(),
            isAllDay: values.isAllDay,
            categoryId: values.categoryId,
            color: values.color,
            location: values.location,
          },
        },
        {
          onSuccess: () => {
            toast.success("일정이 수정되었습니다");
            onOpenChange(false);
          },
        }
      );
    } else {
      createEvent.mutate(
        {
          title: values.title,
          description: values.description,
          startAt: values.startAt.toISOString(),
          endAt: values.endAt.toISOString(),
          isAllDay: values.isAllDay,
          categoryId: values.categoryId,
          color: values.color,
          location: values.location,
        },
        {
          onSuccess: () => {
            toast.success("일정이 추가되었습니다");
            onOpenChange(false);
          },
        }
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? "일정 수정" : "새 일정"}</DialogTitle>
        </DialogHeader>
        <EventForm
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          isLoading={createEvent.isPending || updateEvent.isPending}
        />
      </DialogContent>
    </Dialog>
  );
}

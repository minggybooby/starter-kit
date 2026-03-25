"use client";

import { useState } from "react";
import { EventList } from "@/components/event/event-list";
import { EventDialog } from "@/components/event/event-dialog";
import type { CalendarEvent } from "@/types/event";

export default function ListPage() {
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleEdit = (event: CalendarEvent) => {
    setEditingEvent(event);
    setDialogOpen(true);
  };

  const handleDialogClose = (open: boolean) => {
    setDialogOpen(open);
    if (!open) setEditingEvent(null);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">일정 목록</h1>
      <EventList onEdit={handleEdit} />
      <EventDialog
        open={dialogOpen}
        onOpenChange={handleDialogClose}
        event={editingEvent}
      />
    </div>
  );
}

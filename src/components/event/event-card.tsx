"use client";

import { Clock, MapPin, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { CalendarEvent, EventCategory } from "@/types/event";

interface EventCardProps {
  event: CalendarEvent;
  category?: EventCategory;
  onEdit: (event: CalendarEvent) => void;
  onDelete: (id: string) => void;
}

export function EventCard({ event, category, onEdit, onDelete }: EventCardProps) {
  const startDate = new Date(event.startAt);
  const endDate = new Date(event.endAt);

  return (
    <Card className="group">
      <CardContent className="flex items-start gap-3 p-3">
        {/* 색상 인디케이터 */}
        <div
          className="mt-1 h-4 w-1 rounded-full shrink-0"
          style={{ backgroundColor: event.color }}
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-medium text-sm truncate">{event.title}</h4>
            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex items-center justify-center h-6 w-6 rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-accent" aria-label="일정 옵션">
                <MoreVertical className="h-3 w-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(event)}>
                  <Pencil className="mr-2 h-3 w-3" />
                  수정
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onDelete(event.id)}
                  className="text-destructive"
                >
                  <Trash2 className="mr-2 h-3 w-3" />
                  삭제
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            {event.isAllDay ? (
              <span>종일</span>
            ) : (
              <span>
                {format(startDate, "HH:mm")} - {format(endDate, "HH:mm")}
              </span>
            )}
          </div>

          {event.location && (
            <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span className="truncate">{event.location}</span>
            </div>
          )}

          {category && (
            <Badge variant="secondary" className="mt-2 text-xs">
              <span
                className="mr-1 h-2 w-2 rounded-full inline-block"
                style={{ backgroundColor: category.color }}
              />
              {category.name}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

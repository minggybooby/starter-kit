import { CalendarX } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <CalendarX className="h-12 w-12 text-muted-foreground/50 mb-4" />
      <h3 className="text-lg font-medium">일정이 없습니다</h3>
      <p className="text-sm text-muted-foreground mt-1">
        새 일정을 추가해보세요
      </p>
    </div>
  );
}

"use client";

import { Plus } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/layout/mode-toggle";
import { CalendarHeader } from "@/components/calendar/calendar-header";

interface AppHeaderProps {
  onAddEvent?: () => void;
}

export function AppHeader({ onAddEvent }: AppHeaderProps) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 !h-4" />
      <CalendarHeader />
      <div className="ml-auto flex items-center gap-2">
        {onAddEvent && (
          <Button size="sm" onClick={onAddEvent}>
            <Plus className="mr-1 h-4 w-4" />
            일정 추가
          </Button>
        )}
        <ModeToggle />
      </div>
    </header>
  );
}

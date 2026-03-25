"use client";

import { useState } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { AppHeader } from "@/components/layout/app-header";
import { EventDialog } from "@/components/event/event-dialog";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [eventDialogOpen, setEventDialogOpen] = useState(false);

  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <AppHeader onAddEvent={() => setEventDialogOpen(true)} />
          <main className="flex-1 p-4 md:p-6">{children}</main>
        </SidebarInset>
        <EventDialog
          open={eventDialogOpen}
          onOpenChange={setEventDialogOpen}
        />
      </SidebarProvider>
    </TooltipProvider>
  );
}

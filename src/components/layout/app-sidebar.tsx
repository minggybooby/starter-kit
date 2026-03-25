"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Calendar as CalendarIcon,
  List,
  Settings,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { MiniCalendar } from "@/components/calendar/mini-calendar";
import { CategoryFilter } from "@/components/calendar/category-filter";
import { siteConfig } from "@/config/site";

const navItems = [
  { title: "캘린더", url: "/", icon: CalendarIcon },
  { title: "일정 목록", url: "/list", icon: List },
  { title: "설정", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <h2 className="text-lg font-bold tracking-tight">{siteConfig.name}</h2>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        {/* 미니 캘린더 */}
        <SidebarGroup>
          <SidebarGroupContent className="px-2">
            <MiniCalendar />
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* 네비게이션 */}
        <SidebarGroup>
          <SidebarGroupLabel>메뉴</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    isActive={pathname === item.url}
                    render={<Link href={item.url} />}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* 카테고리 필터 */}
        <SidebarGroup>
          <SidebarGroupLabel>카테고리</SidebarGroupLabel>
          <SidebarGroupContent className="px-2">
            <CategoryFilter />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <p className="text-xs text-muted-foreground">{siteConfig.description}</p>
      </SidebarFooter>
    </Sidebar>
  );
}

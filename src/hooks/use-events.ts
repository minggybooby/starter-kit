"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as storage from "@/lib/storage";
import type { CalendarEvent } from "@/types/event";

const EVENTS_KEY = ["events"];

// 전체 일정 조회
export function useEvents() {
  return useQuery({
    queryKey: EVENTS_KEY,
    queryFn: () => storage.getEvents(),
  });
}

// 일정 생성
export function useCreateEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<CalendarEvent, "id" | "createdAt" | "updatedAt">) =>
      Promise.resolve(storage.createEvent(data)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EVENTS_KEY });
    },
  });
}

// 일정 수정
export function useUpdateEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CalendarEvent> }) =>
      Promise.resolve(storage.updateEvent(id, data)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EVENTS_KEY });
    },
  });
}

// 일정 삭제
export function useDeleteEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => Promise.resolve(storage.deleteEvent(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EVENTS_KEY });
    },
  });
}

// 카테고리 조회
export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => storage.getCategories(),
  });
}

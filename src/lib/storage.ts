import type { CalendarEvent, EventCategory } from "@/types/event";
import { defaultCategories } from "@/config/site";

const EVENTS_KEY = "calendar-events";
const CATEGORIES_KEY = "calendar-categories";

// --- 일정 CRUD ---

export function getEvents(): CalendarEvent[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(EVENTS_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    localStorage.removeItem(EVENTS_KEY);
    return [];
  }
}

export function saveEvents(events: CalendarEvent[]) {
  localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
}

export function createEvent(event: Omit<CalendarEvent, "id" | "createdAt" | "updatedAt">): CalendarEvent {
  const events = getEvents();
  const now = new Date().toISOString();
  const newEvent: CalendarEvent = {
    ...event,
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
  };
  events.push(newEvent);
  saveEvents(events);
  return newEvent;
}

export function updateEvent(id: string, data: Partial<CalendarEvent>): CalendarEvent | null {
  const events = getEvents();
  const index = events.findIndex((e) => e.id === id);
  if (index === -1) return null;
  events[index] = { ...events[index], ...data, updatedAt: new Date().toISOString() };
  saveEvents(events);
  return events[index];
}

export function deleteEvent(id: string): boolean {
  const events = getEvents();
  const filtered = events.filter((e) => e.id !== id);
  if (filtered.length === events.length) return false;
  saveEvents(filtered);
  return true;
}

export function clearEvents(): void {
  localStorage.removeItem(EVENTS_KEY);
}

// --- 카테고리 CRUD ---

export function getCategories(): EventCategory[] {
  if (typeof window === "undefined") return defaultCategories;
  const raw = localStorage.getItem(CATEGORIES_KEY);
  if (!raw) {
    saveCategories(defaultCategories);
    return defaultCategories;
  }
  try {
    return JSON.parse(raw);
  } catch {
    localStorage.removeItem(CATEGORIES_KEY);
    saveCategories(defaultCategories);
    return defaultCategories;
  }
}

export function saveCategories(categories: EventCategory[]) {
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
}

export function toggleCategoryVisibility(id: string): EventCategory[] {
  const categories = getCategories();
  const index = categories.findIndex((c) => c.id === id);
  if (index !== -1) {
    categories[index].isVisible = !categories[index].isVisible;
    saveCategories(categories);
  }
  return categories;
}

import { create } from "zustand";
import { addDays, addMonths, addWeeks, startOfToday } from "date-fns";
import type { CalendarViewType } from "@/types/event";

interface CalendarStore {
  // 상태
  currentDate: Date;
  viewType: CalendarViewType;
  selectedDate: Date | null;

  // 액션
  setCurrentDate: (date: Date) => void;
  setViewType: (type: CalendarViewType) => void;
  setSelectedDate: (date: Date | null) => void;
  navigateNext: () => void;
  navigatePrev: () => void;
  navigateToday: () => void;
}

export const useCalendarStore = create<CalendarStore>((set, get) => ({
  currentDate: startOfToday(),
  viewType: "month",
  selectedDate: null,

  setCurrentDate: (date) => set({ currentDate: date }),
  setViewType: (type) => set({ viewType: type }),
  setSelectedDate: (date) => set({ selectedDate: date }),

  navigateNext: () => {
    const { currentDate, viewType } = get();
    const next =
      viewType === "month"
        ? addMonths(currentDate, 1)
        : viewType === "week"
          ? addWeeks(currentDate, 1)
          : addDays(currentDate, 1);
    set({ currentDate: next });
  },

  navigatePrev: () => {
    const { currentDate, viewType } = get();
    const prev =
      viewType === "month"
        ? addMonths(currentDate, -1)
        : viewType === "week"
          ? addWeeks(currentDate, -1)
          : addDays(currentDate, -1);
    set({ currentDate: prev });
  },

  navigateToday: () => set({ currentDate: startOfToday() }),
}));

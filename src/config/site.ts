export const siteConfig = {
  name: "일정 관리",
  description: "Next.js 기반 일정 관리 웹 스타터킷",
};

// 기본 일정 카테고리
export const defaultCategories = [
  { id: "work", name: "업무", color: "#3b82f6", isVisible: true },
  { id: "personal", name: "개인", color: "#22c55e", isVisible: true },
  { id: "meeting", name: "회의", color: "#f59e0b", isVisible: true },
  { id: "important", name: "중요", color: "#ef4444", isVisible: true },
];

// 일정 색상 프리셋
export const colorPresets = [
  { label: "파랑", value: "#3b82f6" },
  { label: "초록", value: "#22c55e" },
  { label: "노랑", value: "#f59e0b" },
  { label: "빨강", value: "#ef4444" },
  { label: "보라", value: "#8b5cf6" },
  { label: "핑크", value: "#ec4899" },
  { label: "청록", value: "#06b6d4" },
  { label: "주황", value: "#f97316" },
];

import { z } from "zod";

// 일정 폼 검증 스키마
export const eventFormSchema = z
  .object({
    title: z.string().min(1, "제목을 입력해주세요").max(100, "제목은 100자 이하로 입력해주세요"),
    description: z.string().max(500, "설명은 500자 이하로 입력해주세요").optional(),
    startAt: z.date({ error: "시작 날짜를 선택해주세요" }),
    endAt: z.date({ error: "종료 날짜를 선택해주세요" }),
    isAllDay: z.boolean(),
    categoryId: z.string().min(1, "카테고리를 선택해주세요"),
    color: z.string(),
    location: z.string().max(200).optional(),
  })
  .refine((data) => data.endAt >= data.startAt, {
    message: "종료 시간은 시작 시간 이후여야 합니다",
    path: ["endAt"],
  });

export type EventFormValues = z.infer<typeof eventFormSchema>;

"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { eventFormSchema, type EventFormValues } from "@/schemas/event-schema";
import { useCategories } from "@/hooks/use-events";
import { colorPresets } from "@/config/site";
import { cn } from "@/lib/utils";

interface EventFormProps {
  defaultValues?: Partial<EventFormValues>;
  onSubmit: (values: EventFormValues) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function EventForm({ defaultValues, onSubmit, onCancel, isLoading }: EventFormProps) {
  const { data: categories = [] } = useCategories();

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: "",
      description: "",
      startAt: new Date(),
      endAt: new Date(),
      isAllDay: false,
      categoryId: categories[0]?.id ?? "work",
      color: "#3b82f6",
      location: "",
      ...defaultValues,
    },
  });

  const isAllDay = useWatch({ control: form.control, name: "isAllDay" });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* 제목 */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>제목</FormLabel>
              <FormControl>
                <Input placeholder="일정 제목" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 종일 토글 */}
        <FormField
          control={form.control}
          name="isAllDay"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormLabel className="mt-0">종일</FormLabel>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        {/* 시작/종료 날짜 */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="startAt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>시작</FormLabel>
                <Popover>
                  <PopoverTrigger
                    className={cn(
                      "inline-flex w-full items-center justify-start rounded-md border border-input bg-background px-3 py-2 text-sm font-normal hover:bg-accent hover:text-accent-foreground",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? format(field.value, "M/d (EEE) HH:mm", { locale: ko }) : "날짜 선택"}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => {
                        if (date) {
                          const current = field.value || new Date();
                          date.setHours(current.getHours(), current.getMinutes());
                          field.onChange(date);
                        }
                      }}
                      locale={ko}
                    />
                    {!isAllDay && (
                      <div className="border-t p-3">
                        <Input
                          type="time"
                          value={field.value ? format(field.value, "HH:mm") : ""}
                          onChange={(e) => {
                            const [hours, minutes] = e.target.value.split(":").map(Number);
                            const newDate = new Date(field.value || new Date());
                            newDate.setHours(hours, minutes);
                            field.onChange(newDate);
                          }}
                        />
                      </div>
                    )}
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endAt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>종료</FormLabel>
                <Popover>
                  <PopoverTrigger
                    className={cn(
                      "inline-flex w-full items-center justify-start rounded-md border border-input bg-background px-3 py-2 text-sm font-normal hover:bg-accent hover:text-accent-foreground",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? format(field.value, "M/d (EEE) HH:mm", { locale: ko }) : "날짜 선택"}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => {
                        if (date) {
                          const current = field.value || new Date();
                          date.setHours(current.getHours(), current.getMinutes());
                          field.onChange(date);
                        }
                      }}
                      locale={ko}
                    />
                    {!isAllDay && (
                      <div className="border-t p-3">
                        <Input
                          type="time"
                          value={field.value ? format(field.value, "HH:mm") : ""}
                          onChange={(e) => {
                            const [hours, minutes] = e.target.value.split(":").map(Number);
                            const newDate = new Date(field.value || new Date());
                            newDate.setHours(hours, minutes);
                            field.onChange(newDate);
                          }}
                        />
                      </div>
                    )}
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* 카테고리 */}
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>카테고리</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="카테고리 선택" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      <div className="flex items-center gap-2">
                        <span
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: cat.color }}
                        />
                        {cat.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 색상 */}
        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>색상</FormLabel>
              <div className="flex gap-2">
                {colorPresets.map((preset) => (
                  <button
                    key={preset.value}
                    type="button"
                    className={cn(
                      "h-6 w-6 rounded-full border-2 transition-transform",
                      field.value === preset.value ? "border-foreground scale-110" : "border-transparent"
                    )}
                    style={{ backgroundColor: preset.value }}
                    onClick={() => field.onChange(preset.value)}
                    title={preset.label}
                  />
                ))}
              </div>
            </FormItem>
          )}
        />

        {/* 장소 */}
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>장소</FormLabel>
              <FormControl>
                <Input placeholder="장소 (선택)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 설명 */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>설명</FormLabel>
              <FormControl>
                <Textarea placeholder="일정 설명 (선택)" rows={3} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 버튼 */}
        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            취소
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "저장 중..." : "저장"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

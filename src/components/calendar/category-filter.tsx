"use client";

import { useCategories } from "@/hooks/use-events";
import { Checkbox } from "@/components/ui/checkbox";
import { toggleCategoryVisibility } from "@/lib/storage";
import { useQueryClient } from "@tanstack/react-query";

export function CategoryFilter() {
  const { data: categories = [] } = useCategories();
  const queryClient = useQueryClient();

  const handleToggle = (id: string) => {
    toggleCategoryVisibility(id);
    queryClient.invalidateQueries({ queryKey: ["categories"] });
  };

  return (
    <div className="space-y-2">
      {categories.map((category) => (
        <label
          key={category.id}
          className="flex items-center gap-2 cursor-pointer text-sm"
        >
          <Checkbox
            checked={category.isVisible}
            onCheckedChange={() => handleToggle(category.id)}
          />
          <span
            className="h-3 w-3 rounded-full shrink-0"
            style={{ backgroundColor: category.color }}
          />
          <span>{category.name}</span>
        </label>
      ))}
    </div>
  );
}

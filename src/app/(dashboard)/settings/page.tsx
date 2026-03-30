"use client";

import { useState } from "react";
import { useCategories, useUpdateCategories, useClearEvents } from "@/hooks/use-events";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { siteConfig } from "@/config/site";
import { toast } from "sonner";

export default function SettingsPage() {
  const { data: categories = [] } = useCategories();
  const updateCategories = useUpdateCategories();
  const clearEvents = useClearEvents();
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleColorChange = (id: string, color: string) => {
    const updated = categories.map((c) =>
      c.id === id ? { ...c, color } : c
    );
    updateCategories.mutate(updated);
  };

  const handleNameChange = (id: string, name: string) => {
    const updated = categories.map((c) =>
      c.id === id ? { ...c, name } : c
    );
    updateCategories.mutate(updated);
  };

  const handleVisibilityChange = (id: string, isVisible: boolean) => {
    const updated = categories.map((c) =>
      c.id === id ? { ...c, isVisible } : c
    );
    updateCategories.mutate(updated);
  };

  const handleClearEvents = () => {
    clearEvents.mutate(undefined, {
      onSuccess: () => toast.success("모든 일정이 삭제되었습니다"),
    });
    setShowClearConfirm(false);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-bold">설정</h1>

      {/* 카테고리 관리 */}
      <Card>
        <CardHeader>
          <CardTitle>카테고리 관리</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center gap-4">
              <input
                type="color"
                defaultValue={cat.color}
                onBlur={(e) => handleColorChange(cat.id, e.target.value)}
                className="h-8 w-8 cursor-pointer rounded border-0 p-0"
              />
              <Input
                value={cat.name}
                onChange={(e) => handleNameChange(cat.id, e.target.value)}
                className="flex-1"
              />
              <div className="flex items-center gap-2">
                <Label htmlFor={`visible-${cat.id}`} className="text-sm text-muted-foreground">
                  표시
                </Label>
                <Switch
                  id={`visible-${cat.id}`}
                  checked={cat.isVisible}
                  onCheckedChange={(checked) => handleVisibilityChange(cat.id, checked)}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* 데이터 관리 */}
      <Card>
        <CardHeader>
          <CardTitle>데이터 관리</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            모든 일정 데이터는 브라우저 localStorage에 저장됩니다.
          </p>
          <Button variant="destructive" onClick={() => setShowClearConfirm(true)}>
            모든 일정 삭제
          </Button>
        </CardContent>
      </Card>

      {/* 앱 정보 */}
      <Card>
        <CardHeader>
          <CardTitle>앱 정보</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-1">
          <p>{siteConfig.name} — {siteConfig.description}</p>
          <p>Next.js 16 + TailwindCSS v4 + ShadcnUI + Schedule-X</p>
        </CardContent>
      </Card>

      <ConfirmDialog
        open={showClearConfirm}
        onOpenChange={setShowClearConfirm}
        title="모든 일정 삭제"
        description="모든 일정이 영구적으로 삭제됩니다. 이 작업은 되돌릴 수 없습니다."
        onConfirm={handleClearEvents}
        confirmLabel="삭제"
        variant="destructive"
      />
    </div>
  );
}

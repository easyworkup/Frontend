import type { HTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";

/**
 * Цветной баннер с текстом и опциональным CTA — подсказки внизу экрана
 * роадмапа/хаба («Пройти подготовку →»). `dashed` — пунктирный нейтральный
 * вариант, как на хабе собеседований.
 */
export function Callout({
  className,
  dashed,
  tone = "accent",
  ...props
}: HTMLAttributes<HTMLDivElement> & { dashed?: boolean; tone?: "accent" | "warn" }) {
  const toneClass =
    tone === "warn"
      ? "border-[#EFD3B0] bg-warn-soft text-warn"
      : "border-[#CFE1D8] bg-accent-soft text-accent-dark";
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-4 rounded-xl border p-4 text-[13px]",
        dashed ? "border-dashed border-border bg-surface text-text-soft" : toneClass,
        className
      )}
      {...props}
    />
  );
}

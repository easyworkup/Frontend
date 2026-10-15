import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

const toneStyles = {
  neutral: { wrap: "border-border bg-surface", value: "text-text", label: "text-text-soft" },
  warn: { wrap: "border-[#EFD3B0] bg-warn-soft", value: "text-warn", label: "text-warn" },
  ok: { wrap: "border-[#CDE6D6] bg-ok-soft", value: "text-ok", label: "text-ok" },
} as const;

/** Плашка-метрика «число + подпись» — статистика на хабе и в роадмапе. */
export function StatPill({
  value,
  label,
  tone = "neutral",
  className,
}: {
  value: ReactNode;
  label: ReactNode;
  tone?: keyof typeof toneStyles;
  className?: string;
}) {
  const t = toneStyles[tone];
  return (
    <div className={cn("flex items-center gap-2.5 rounded-xl border px-4 py-3", t.wrap, className)}>
      <span className={cn("text-lg font-extrabold", t.value)}>{value}</span>
      <span className={cn("text-[13px]", t.label)}>{label}</span>
    </div>
  );
}

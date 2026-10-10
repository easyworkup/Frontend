import type { ReactNode } from "react";
import { Card } from "./Card";
import { ProgressBar } from "./ProgressBar";
import { cn } from "@/shared/lib/cn";
import type { ScoreBand } from "@/shared/lib/format";

/**
 * Карточка-метрика с крупным числом — блоки статистики на «Моём прогрессе»
 * и на «Итогах сессии». `progress` дорисовывает полосу под значением
 * (часы обучения, узлы роадмапа); без него — просто число + подпись
 * (ATS-скор, общий балл, вопросов пройдено).
 */
export function StatCard({
  label,
  value,
  caption,
  progress,
  className,
}: {
  label: ReactNode;
  value: ReactNode;
  caption?: ReactNode;
  progress?: { percent: number; tone?: ScoreBand | "accent" };
  className?: string;
}) {
  return (
    <Card className={cn("flex flex-col gap-2.5", className)}>
      <div className="text-xs font-bold uppercase tracking-wide text-text-soft">{label}</div>
      <div className="flex items-baseline gap-2">
        <span className="text-[26px] font-extrabold text-text">{value}</span>
        {caption && <span className="text-[13px] text-text-soft">{caption}</span>}
      </div>
      {progress && (
        <ProgressBar percent={progress.percent} tone={progress.tone ?? "accent"} size="sm" />
      )}
    </Card>
  );
}

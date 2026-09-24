import { cn } from "@/shared/lib/cn";
import type { ScoreBand } from "@/shared/lib/format";

const fillClass: Record<ScoreBand, string> = {
  ok: "bg-ok",
  warn: "bg-warn",
  danger: "bg-danger",
};

/**
 * Тонкая прогресс-полоса. `tone="accent"` — нейтральный прогресс (шаги
 * резюме, вопрос N из M); `ok`/`warn`/`danger` — раскраска по баллу, как в
 * разборе тем на «Итогах сессии» (см. `scoreBand` в shared/lib/format).
 */
export function ProgressBar({
  percent,
  tone = "accent",
  size = "md",
  className,
}: {
  percent: number;
  tone?: ScoreBand | "accent";
  size?: "sm" | "md";
  className?: string;
}) {
  const clamped = Math.max(0, Math.min(100, percent));
  return (
    <div
      className={cn(
        "w-full overflow-hidden rounded-full bg-border",
        size === "sm" ? "h-1.5" : "h-2.5",
        className
      )}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={cn(
          "h-full rounded-full transition-[width]",
          tone === "accent" ? "bg-accent" : fillClass[tone]
        )}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}

import { cn } from "@/shared/lib/cn";
import { ProgressBar } from "./ProgressBar";

export type StepStatus = "done" | "current" | "upcoming";

export interface StepListItem {
  key: string;
  label: string;
  status: StepStatus;
}

function StepStatusIcon({ status }: { status: StepStatus }) {
  if (status === "done") {
    return (
      <span className="flex-shrink-0 font-extrabold text-ok" aria-hidden="true">
        ✓
      </span>
    );
  }
  if (status === "current") {
    return (
      <span
        className="inline-block h-3.5 w-3.5 flex-shrink-0 rounded-full border-2 border-accent-dark"
        aria-hidden="true"
      />
    );
  }
  return (
    <span
      className="inline-block h-3.5 w-3.5 flex-shrink-0 rounded-full border-2 border-[#D9D4C6]"
      aria-hidden="true"
    />
  );
}

/**
 * Список шагов/вопросов со статусом (done/current/upcoming) — сайдбар
 * шага резюме («7 разделов») и список вопросов в чате поведенческого
 * интервью в мокапе используют один и тот же визуальный паттерн.
 * `progress` — необязательный заголовок «N из M · X%» с полосой прогресса.
 */
export function StepList({
  items,
  progress,
  className,
}: {
  items: StepListItem[];
  progress?: { current: number; total: number };
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {progress && (
        <div className="mb-2.5 flex flex-col gap-1.5 px-1.5">
          <div className="flex justify-between text-xs font-semibold text-text-soft">
            <span>
              {progress.current} из {progress.total}
            </span>
            <span>{Math.round((progress.current / progress.total) * 100)}%</span>
          </div>
          <ProgressBar percent={(progress.current / progress.total) * 100} size="sm" />
        </div>
      )}
      {items.map((item) => (
        <div
          key={item.key}
          className={cn(
            "flex items-center gap-2.5 rounded-[10px] px-2.5 py-2.5 text-[13px]",
            item.status === "current" ? "bg-accent-soft font-bold text-accent-dark" : "text-text",
            item.status === "upcoming" && "text-text-soft/70"
          )}
        >
          <StepStatusIcon status={item.status} />
          {item.label}
        </div>
      ))}
    </div>
  );
}

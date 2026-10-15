import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

/**
 * Тонкая акцентная полоса под шапкой — «Шаг 1 из 2 · Личные данные и опыт»
 * / «Сохранено автоматически · 12:04» на экранах резюме. Слот слева —
 * текст или ссылка «Назад», слот справа — действие («Экспорт PDF») или
 * статус.
 */
export function SubHeaderBar({
  left,
  right,
  className,
}: {
  left: ReactNode;
  right?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex h-12 flex-shrink-0 items-center justify-between border-b border-[#CFE1D8] bg-accent-soft px-10 text-[13px] font-bold text-accent-dark",
        className
      )}
    >
      <div className="flex items-center gap-3.5">{left}</div>
      {right}
    </div>
  );
}

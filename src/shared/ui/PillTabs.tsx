"use client";

import { cn } from "@/shared/lib/cn";

export interface PillTabOption {
  value: string;
  label: string;
}

/**
 * Группа кнопок-«таблеток» с одиночным выбором — фильтр направления
 * (Frontend/Backend/DevOps/...) на хабе и в роадмапе, чипы «Сфера
 * деятельности»/«Направление» в онбординге роадмапа. Управляемый
 * компонент: состояние выбора живёт у вызывающего экрана. `fullWidth` —
 * кнопки растягиваются на равную ширину (как переключатель «Формат
 * работы» из двух опций в онбординге).
 */
export function PillTabs({
  options,
  value,
  onChange,
  fullWidth,
  className,
}: {
  options: PillTabOption[];
  value: string;
  onChange: (value: string) => void;
  fullWidth?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap gap-2.5", className)} role="tablist">
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(option.value)}
            className={cn(
              "rounded-full border-[1.5px] px-5 py-2.5 text-sm font-bold transition-colors",
              fullWidth && "flex-1 text-center",
              active
                ? "border-accent bg-accent text-white"
                : "border-border bg-surface text-text hover:border-accent/50"
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

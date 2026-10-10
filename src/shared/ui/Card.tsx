import type { HTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";

/** Базовая карточка-поверхность: белый фон, тонкая рамка, скруглённые углы. */
export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("rounded-2xl border border-border bg-surface p-6", className)} {...props} />
  );
}

/**
 * Тёмный акцентный вариант — карточка «Live-кодинг» с плашкой «По вашему
 * роадмапу» на хабе собеседований. Кладите `CornerBadge` внутрь как
 * позиционированный абсолютно дочерний элемент.
 */
export function CardHighlight({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative rounded-2xl border border-accent-dark bg-accent-dark p-6 text-white",
        className
      )}
      {...props}
    />
  );
}

/** Кликабельная карточка-строка со стрелкой справа — «Опыт работы», «Навыки» на шаге резюме. */
export function CardRow({
  title,
  subtitle,
  className,
  ...props
}: HTMLAttributes<HTMLButtonElement> & { title: string; subtitle: string }) {
  return (
    <button
      type="button"
      className={cn(
        "py-4.5 flex items-center justify-between rounded-2xl border border-border bg-surface px-6 text-left transition-colors hover:border-accent/40",
        className
      )}
      {...props}
    >
      <span>
        <span className="block text-[14.5px] font-bold text-text">{title}</span>
        <span className="mt-0.5 block text-[13px] text-text-soft">{subtitle}</span>
      </span>
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="flex-shrink-0 text-text-soft"
        aria-hidden="true"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </button>
  );
}

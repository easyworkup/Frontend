import type { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/lib/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wide",
  {
    variants: {
      tone: {
        neutral: "bg-bg text-text-soft",
        accent: "bg-accent-soft text-accent-dark",
        ok: "bg-ok-soft text-ok",
        warn: "bg-warn-soft text-warn",
        danger: "bg-danger-soft text-danger",
        dark: "bg-accent-dark text-white",
      },
    },
    defaultVariants: { tone: "neutral" },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

/** Мелкая цветная плашка: статус «Частично», тег темы, сложность задачи. */
export function Badge({ className, tone, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ tone }), className)} {...props} />;
}

/**
 * Плашка-«риббон», позиционированная абсолютно в углу карточки — «Спрос ↑»
 * на узле роадмапа, «По вашему роадмапу» на карточке хаба. Родитель должен
 * быть `relative` (см. `Card`/`CardHighlight`).
 */
export function CornerBadge({
  className,
  tone = "dark",
  ...props
}: HTMLAttributes<HTMLSpanElement> & { tone?: "dark" | "onDark" }) {
  return (
    <span
      className={cn(
        "absolute -top-2.5 right-5 rounded-full px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wide",
        tone === "dark" ? "bg-accent-dark text-white" : "bg-white text-accent-dark",
        className
      )}
      {...props}
    />
  );
}

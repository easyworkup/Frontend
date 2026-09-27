import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Склеивает классы Tailwind и разрешает конфликты между ними (например,
 * `p-4` из пропа `className`, переопределяющий `p-2` из базовых стилей
 * компонента) — стандартный хелпер для shared/ui-компонентов с вариантами.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

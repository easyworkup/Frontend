/** Часы с округлением до одного знака: 5.5 → "5.5 ч". */
export function formatHours(hours: number): string {
  const rounded = Math.round(hours * 10) / 10;
  return `${rounded} ч`;
}

/** Доля в диапазоне 0..1 или сразу 0..100 → "58%" (принимает оба масштаба). */
export function formatPercent(value: number): string {
  const pct = value <= 1 ? value * 100 : value;
  return `${Math.round(pct)}%`;
}

export type ScoreBand = "ok" | "warn" | "danger";

/**
 * Балл 0..100 → цветовая полоса. Пороги как на «Итогах сессии» в мокапе
 * (85/90% — зелёный, 58% — оранжевый, 42% — красный); используется везде,
 * где нужно раскрасить прогресс-бар или узел роадмапа по проценту.
 */
export function scoreBand(percent: number): ScoreBand {
  if (percent >= 70) return "ok";
  if (percent >= 50) return "warn";
  return "danger";
}

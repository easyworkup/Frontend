"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/lib/cn";
import type { NavItem } from "@/shared/config/site";

/**
 * Переключатель разделов в шапке (Резюме / Роадмап / Собеседования) —
 * подсвечивает активный пункт по текущему пути. В отличие от `PillTabs`,
 * это навигация по реальным маршрутам, а не локальный выбор на странице.
 */
export function SegmentedLinkTabs({ items, className }: { items: NavItem[]; className?: string }) {
  const pathname = usePathname();
  return (
    <nav className={cn("flex gap-0.5 rounded-[10px] bg-bg p-1", className)}>
      {items.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "rounded-lg px-4 py-2 text-[13.5px] font-bold transition-colors",
              active ? "bg-accent text-white" : "text-text-soft hover:text-text"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

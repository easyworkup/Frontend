"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

export interface SidebarLinkItem {
  href: string;
  label: string;
  icon: ReactNode;
}

/**
 * Вертикальная навигация с иконками — подменю роадмапа («Обзор» /
 * «Настройки темпа» / «Мой прогресс» в мокапе, одинаковое на всех трёх
 * экранах), подсвечивает активный пункт по текущему пути.
 */
export function SidebarLinkNav({
  items,
  className,
}: {
  items: SidebarLinkItem[];
  className?: string;
}) {
  const pathname = usePathname();
  return (
    <nav className={cn("flex flex-col gap-1", className)}>
      {items.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex items-center gap-2.5 rounded-[9px] px-3 py-2.5 text-[13.5px] font-semibold",
              active ? "bg-accent-soft text-accent-dark" : "text-text hover:bg-bg"
            )}
          >
            {item.icon}
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

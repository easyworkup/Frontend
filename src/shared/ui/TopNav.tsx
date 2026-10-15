import Link from "next/link";
import { IconBadge } from "./IconBadge";
import { SegmentedLinkTabs } from "./SegmentedLinkTabs";
import { SITE_NAME, PRIMARY_NAV } from "@/shared/config/site";
import { cn } from "@/shared/lib/cn";

/**
 * Шапка приложения: логотип + название слева, переключатель разделов
 * справа — одинаковая на экранах резюме, роадмапа, хаба и прогресса в
 * мокапе. `tabs={false}` — только логотип, без переключателя (шаги
 * онбординга роадмапа, где верхнего меню ещё нет).
 */
export function TopNav({ tabs = true, className }: { tabs?: boolean; className?: string }) {
  return (
    <header
      className={cn(
        "flex h-[76px] flex-shrink-0 items-center justify-between border-b border-border bg-surface px-10",
        className
      )}
    >
      <Link href="/" className="flex items-center gap-3">
        <IconBadge size={36}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </IconBadge>
        <span className="text-xl font-extrabold tracking-tight text-text">{SITE_NAME}</span>
      </Link>
      {tabs && <SegmentedLinkTabs items={PRIMARY_NAV} />}
    </header>
  );
}

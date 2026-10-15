import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

/**
 * Центрированный вступительный блок: иконка-бейдж + заголовок + подзаголовок.
 * Шапка всех экранов авторизации (вход, регистрация, восстановление и смена
 * пароля, «Проверьте почту») — один и тот же паттерн, отличается только
 * содержимым иконки и её размером/тоном (передаются через `icon`, обычно —
 * `<IconBadge>`).
 */
export function CenteredIntro({
  icon,
  title,
  subtitle,
  className,
}: {
  icon: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center gap-3.5 text-center", className)}>
      {icon}
      <div>
        <div className="text-[22px] font-extrabold text-text">{title}</div>
        {subtitle && (
          <div className="mt-1 text-[13.5px] leading-relaxed text-text-soft">{subtitle}</div>
        )}
      </div>
    </div>
  );
}

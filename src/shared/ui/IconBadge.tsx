import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

type IconBadgeTone = "accent" | "accentSoft" | "dark" | "onDark";
type IconBadgeShape = "square" | "circle";

const toneClasses: Record<IconBadgeTone, string> = {
  accent: "bg-accent text-white",
  accentSoft: "bg-accent-soft text-accent-dark",
  dark: "bg-accent-dark text-white",
  onDark: "bg-white/10 text-white",
};

/**
 * Цветной квадрат/кружок с иконкой внутри — логотип в шапке, аватар
 * ИИ-интервьюера в чате, иконка направления подготовки на хабе. Иконку
 * передавайте children (обычно inline SVG с `stroke="currentColor"`).
 */
export function IconBadge({
  children,
  tone = "accent",
  shape = "square",
  size = 44,
  className,
}: {
  children: ReactNode;
  tone?: IconBadgeTone;
  shape?: IconBadgeShape;
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-shrink-0 items-center justify-center",
        shape === "circle" ? "rounded-full" : "rounded-xl",
        toneClasses[tone],
        className
      )}
      style={{ width: size, height: size }}
    >
      {children}
    </div>
  );
}

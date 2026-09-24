import { cn } from "@/shared/lib/cn";

/** Тонкий разделитель — вертикальный (между блоками статистики) или горизонтальный. */
export function Divider({
  orientation = "horizontal",
  className,
}: {
  orientation?: "horizontal" | "vertical";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "bg-border",
        orientation === "vertical" ? "w-px self-stretch" : "h-px w-full",
        className
      )}
    />
  );
}

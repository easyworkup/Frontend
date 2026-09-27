import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-accent text-white hover:bg-accent-dark",
        secondary: "border-[1.5px] border-accent bg-transparent text-accent hover:bg-accent-soft",
        outline: "border-[1.5px] border-border bg-surface text-text hover:bg-bg",
        ghost: "text-text-soft hover:bg-bg",
        onDark: "bg-white text-accent-dark hover:bg-white/90",
      },
      size: {
        sm: "h-9 px-4 text-[13px]",
        md: "h-12 px-6 text-sm",
        lg: "h-[52px] px-7 text-[15px]",
        icon: "h-12 w-12 p-0",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

/**
 * Базовая кнопка shared-слоя. Варианты списаны с мокапа: primary — «Войти»,
 * «Отправить» в чате; secondary — обводка acc в карточках подготовки; outline —
 * «Завершить сессию», «Пройти ещё раз»; ghost — «Сохранить и выйти»; onDark —
 * кнопка на тёмной карточке «Live-кодинг» на хабе собеседований.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  )
);
Button.displayName = "Button";

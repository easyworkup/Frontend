import {
  forwardRef,
  type InputHTMLAttributes,
  type ReactNode,
  type TextareaHTMLAttributes,
} from "react";
import { cn } from "@/shared/lib/cn";

const boxClass =
  "w-full rounded-[10px] border-[1.5px] border-border bg-surface px-3.5 py-3 text-sm text-text placeholder:text-text-soft/70 focus:border-accent focus:outline-none";

function FieldLabel({ children, htmlFor }: { children: ReactNode; htmlFor?: string }) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-text-soft"
    >
      {children}
    </label>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1.5 text-xs font-semibold text-danger">{message}</p>;
}

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

/**
 * Текстовое поле с подписью и слотом под ошибку валидации — прокидывайте
 * `{...register("name")}` из react-hook-form напрямую в проп-спред и
 * `error={errors.name?.message}` для отображения ошибки Zod-схемы.
 */
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, id, className, ...props }, ref) => {
    const fieldId = id ?? props.name;
    return (
      <div className="flex flex-col">
        <FieldLabel htmlFor={fieldId}>{label}</FieldLabel>
        <input ref={ref} id={fieldId} className={cn(boxClass, className)} {...props} />
        <FieldError message={error} />
      </div>
    );
  }
);
TextField.displayName = "TextField";

export interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const TextAreaField = forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(
  ({ label, error, id, className, ...props }, ref) => {
    const fieldId = id ?? props.name;
    return (
      <div className="flex flex-col">
        <FieldLabel htmlFor={fieldId}>{label}</FieldLabel>
        <textarea
          ref={ref}
          id={fieldId}
          className={cn(boxClass, "resize-none", className)}
          {...props}
        />
        <FieldError message={error} />
      </div>
    );
  }
);
TextAreaField.displayName = "TextAreaField";

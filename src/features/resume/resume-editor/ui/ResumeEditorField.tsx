import {
  useId,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";
import { cn } from "@/shared/lib/cn";
import { ChevronDownIcon } from "@/shared/ui/icons";

const inputClass =
  "w-full min-w-0 rounded-lg border border-border bg-surface px-4 text-sm text-text transition-colors placeholder:text-text-soft/65 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15 disabled:bg-bg disabled:text-text-soft/60";

type FieldShellProps = {
  id: string;
  label: string;
  hint?: string;
  optional?: boolean;
  children: ReactNode;
  className?: string;
};

function FieldShell({ id, label, hint, optional, children, className }: FieldShellProps) {
  return (
    <div className={cn("grid min-w-0 content-start gap-2", className)}>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
        {optional && <span className="font-normal text-text-soft"> · необязательно</span>}
      </label>
      {children}
      {hint && (
        <p id={`${id}-hint`} className="text-xs leading-5 text-text-soft">
          {hint}
        </p>
      )}
    </div>
  );
}

type ResumeEditorFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  optional?: boolean;
  hint?: string;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
};

export function ResumeEditorField({
  label,
  optional,
  hint,
  leadingIcon,
  trailingIcon,
  id,
  className,
  ...props
}: ResumeEditorFieldProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;

  return (
    <FieldShell id={fieldId} label={label} optional={optional} hint={hint}>
      <div className="relative min-w-0">
        {leadingIcon && (
          <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-text-soft">
            {leadingIcon}
          </span>
        )}
        <input
          {...props}
          id={fieldId}
          aria-describedby={hint ? `${fieldId}-hint` : undefined}
          className={cn(
            inputClass,
            "h-12",
            leadingIcon && "pl-11",
            trailingIcon && "pr-11",
            className
          )}
        />
        {trailingIcon && (
          <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-text-soft/60">
            {trailingIcon}
          </span>
        )}
      </div>
    </FieldShell>
  );
}

type ResumeEditorTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  hint?: string;
};

export function ResumeEditorTextarea({
  label,
  hint,
  id,
  className,
  ...props
}: ResumeEditorTextareaProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;

  return (
    <FieldShell id={fieldId} label={label} hint={hint}>
      <textarea
        {...props}
        id={fieldId}
        aria-describedby={hint ? `${fieldId}-hint` : undefined}
        className={cn(inputClass, "min-h-28 resize-y py-3 leading-6", className)}
      />
    </FieldShell>
  );
}

type ResumeEditorSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
};

export function ResumeEditorSelect({
  label,
  id,
  children,
  className,
  ...props
}: ResumeEditorSelectProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;

  return (
    <FieldShell id={fieldId} label={label}>
      <div className="relative min-w-0">
        <select
          {...props}
          id={fieldId}
          className={cn(inputClass, "h-12 appearance-none pr-10", className)}
        >
          {children}
        </select>
        <ChevronDownIcon className="pointer-events-none absolute right-4 top-4 h-4 w-4 text-text-soft" />
      </div>
    </FieldShell>
  );
}

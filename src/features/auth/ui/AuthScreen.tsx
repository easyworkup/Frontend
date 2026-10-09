"use client";

import { useId, type FormEvent } from "react";
import Link from "next/link";
import { Button } from "@/shared/ui/Button";
import { cn } from "@/shared/lib/cn";
import type { AuthScreenConfig, AuthSubmitHandler } from "../model/types";
import { AuthIntro } from "./AuthIntro";

const inputClassName =
  "h-[52px] w-full rounded-xl border border-border bg-surface px-4 text-base text-text placeholder:text-text-soft focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/20";

const actionClassName =
  "rounded-sm text-accent transition-colors hover:text-accent-dark hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

interface AuthScreenProps {
  config: AuthScreenConfig;
  onSubmit?: AuthSubmitHandler;
}

export function AuthScreen({ config, onSubmit }: AuthScreenProps) {
  const formId = useId();
  const headingId = `${formId}-heading`;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit?.(new FormData(event.currentTarget));
  }

  return (
    <main className="grid min-h-dvh bg-bg text-text md:grid-cols-[3fr_4fr]">
      <AuthIntro />

      <section
        aria-labelledby={headingId}
        className="flex items-center justify-center px-6 py-12 sm:px-10 md:px-8 md:py-20 lg:px-16"
      >
        <div className="w-full max-w-[420px]">
          <h1 id={headingId} className="text-3xl font-bold leading-tight lg:text-[32px]">
            {config.title}
          </h1>
          <p className="mt-6 text-base leading-6 text-text-soft">{config.description}</p>

          <form className="mt-5" onSubmit={handleSubmit}>
            <div className="space-y-5">
              {config.fields.map(({ label, type = "text", ...field }) => {
                const fieldId = `${formId}-${field.name}`;

                return (
                  <div key={field.name}>
                    <label htmlFor={fieldId} className="mb-2 block text-sm font-semibold">
                      {label}
                    </label>
                    <input
                      {...field}
                      id={fieldId}
                      type={type}
                      className={cn(
                        inputClassName,
                        type === "password" && "placeholder:tracking-[0.2em]"
                      )}
                    />
                  </div>
                );
              })}
            </div>

            {!!config.actions?.length && (
              <div className="mt-5 flex items-center gap-x-3 gap-y-3 text-sm">
                {config.actions.map((action) => {
                  if (action.type === "checkbox") {
                    const actionId = `${formId}-${action.name}`;

                    return (
                      <label
                        key={action.name}
                        htmlFor={actionId}
                        className="inline-flex cursor-pointer items-center gap-1.5 text-text-soft"
                      >
                        <input
                          id={actionId}
                          name={action.name}
                          type="checkbox"
                          defaultChecked={action.defaultChecked}
                          onChange={(event) => action.onChange?.(event.currentTarget.checked)}
                          className="h-3 w-3 cursor-pointer accent-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                        />
                        {action.label}
                      </label>
                    );
                  }

                  if (action.type === "link") {
                    return (
                      <Link
                        key={action.href}
                        href={action.href}
                        className={cn(actionClassName, "font-semibold")}
                      >
                        {action.label}
                      </Link>
                    );
                  }

                  return (
                    <button
                      key={action.name}
                      type="button"
                      onClick={action.onClick}
                      className={cn(actionClassName, "font-semibold")}
                    >
                      {action.label}
                    </button>
                  );
                })}
              </div>
            )}

            <Button
              type="submit"
              className="mt-5 h-[52px] w-full text-base font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              {config.submitLabel}
            </Button>
          </form>

          {config.footerLinks?.map((link) => (
            <p key={link.href} className="mt-5 text-sm leading-5 text-accent">
              {link.text && <>{link.text} </>}
              <Link href={link.href} className={actionClassName}>
                {link.label}
              </Link>
            </p>
          ))}
        </div>
      </section>
    </main>
  );
}

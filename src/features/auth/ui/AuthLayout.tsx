import type { ReactNode } from "react";
import { AuthIntro } from "./AuthIntro";

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="grid min-h-dvh grid-rows-[auto_1fr] bg-bg text-text lg:grid-cols-[minmax(0,31fr)_minmax(0,41fr)] lg:grid-rows-1">
      <AuthIntro />
      {children}
    </main>
  );
}

/** Forms and reset results share the same width and position within the auth layout. */
export function AuthPanel({
  children,
  headingId,
  live,
}: {
  children: ReactNode;
  headingId?: string;
  live?: boolean;
}) {
  return (
    <section
      aria-labelledby={headingId}
      aria-live={live ? "polite" : undefined}
      className="flex min-w-0 items-start justify-center px-6 py-8 sm:px-10 lg:items-center lg:p-16"
    >
      <div className="w-full min-w-0 max-w-[420px]">{children}</div>
    </section>
  );
}

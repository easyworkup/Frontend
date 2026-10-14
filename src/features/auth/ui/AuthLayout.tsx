import type { ReactNode } from "react";
import localFont from "next/font/local";
import { AuthIntro } from "./AuthIntro";

const manrope = localFont({
  src: "../fonts/Manrope.ttf",
  weight: "200 800",
  display: "swap",
});

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main
      className={`${manrope.className} grid min-h-dvh items-center overflow-clip bg-bg text-text`}
    >
      <div className="relative isolate mx-auto grid min-h-dvh w-full max-w-[1440px] grid-rows-[auto_1fr] lg:min-h-[min(900px,100dvh)] lg:grid-cols-[minmax(0,31fr)_minmax(0,41fr)] lg:grid-rows-1">
        <AuthIntro />
        {children}
      </div>
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
